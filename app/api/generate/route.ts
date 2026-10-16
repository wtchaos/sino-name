import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { generateName } from "@/lib/deepseek";
import { generateRequestSchema } from "@/lib/schema";
import {
  cacheKey,
  getClientIp,
  hashIp,
  hashProfile,
  isJsonRequestWithinLimit,
  isSameOrigin,
  readVisitor,
  verifyTicket,
} from "@/lib/security";
import {
  acquireLock,
  consumeOnce,
  getCachedResult,
  getCount,
  hasPersistentStore,
  incrementCount,
  releaseLock,
  saveResult,
} from "@/lib/store";
import { verifyTurnstile } from "@/lib/turnstile";
import type { NameResult } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const DAY = 60 * 60 * 24;
const HOUR = 60 * 60;

function limitError(message: string) {
  return NextResponse.json({ error: message }, { status: 429 });
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request) || !isJsonRequestWithinLimit(request)) {
    return NextResponse.json({ error: "Request not accepted." }, { status: 400 });
  }
  if (process.env.NODE_ENV === "production" && !hasPersistentStore()) {
    return NextResponse.json(
      { error: "Name generation is not configured yet." },
      { status: 503 },
    );
  }

  let visitorId = "";
  try {
    const body = generateRequestSchema.parse(await request.json());
    visitorId = readVisitor(request) ?? "";
    const ticket = verifyTicket(body.ticket);

    if (
      !visitorId ||
      !ticket ||
      ticket.visitorId !== visitorId ||
      ticket.profileHash !== hashProfile(body.profile)
    ) {
      return NextResponse.json(
        { error: "This generation request has expired. Please try again." },
        { status: 403 },
      );
    }

    if (!(await consumeOnce(`ticket:${ticket.jti}`, 5 * 60))) {
      return NextResponse.json(
        { error: "This generation request has already been used." },
        { status: 409 },
      );
    }

    const ip = getClientIp(request);
    const ipKey = hashIp(ip);
    const enforce = process.env.NODE_ENV === "production";

    if (enforce) {
      const [visitorDaily, ipHourly, ipDaily] = await Promise.all([
        getCount(`visitor:${visitorId}:day`),
        getCount(`ip:${ipKey}:hour`),
        getCount(`ip:${ipKey}:day`),
      ]);
      if (visitorDaily >= 1) {
        return limitError(
          "You have created today’s name. It remains available in this browser for 30 days.",
        );
      }
      if (ipHourly >= 5 || ipDaily >= 15) {
        return limitError(
          "This network has created several names recently. Please try again later.",
        );
      }
    }

    if (!(await acquireLock(`visitor:${visitorId}`, 90))) {
      return NextResponse.json(
        { error: "A name is already being created. Please wait." },
        { status: 409 },
      );
    }

    try {
      if (!(await verifyTurnstile(body.turnstileToken, ip))) {
        return NextResponse.json(
          { error: "We could not verify this request. Please try again." },
          { status: 403 },
        );
      }

      const profileKey = cacheKey(body.profile);
      const cached = await getCachedResult(profileKey);
      if (cached) {
        if (enforce) {
          await Promise.all([
            incrementCount(`visitor:${visitorId}:day`, DAY),
            incrementCount(`ip:${ipKey}:hour`, HOUR),
            incrementCount(`ip:${ipKey}:day`, DAY),
          ]);
        }
        return NextResponse.json({
          result: {
            ...cached,
            originalFirstName: body.profile.firstName,
            originalFamilyName: body.profile.familyName,
          },
          cached: true,
        });
      }

      const generated = await generateName(body.profile, visitorId);
      const now = new Date();
      const result: NameResult = {
        id: randomUUID(),
        createdAt: now.toISOString(),
        expiresAt: new Date(now.getTime() + 30 * DAY * 1000).toISOString(),
        originalFirstName: body.profile.firstName,
        originalFamilyName: body.profile.familyName,
        ...generated,
      };

      await saveResult(result, profileKey);
      if (enforce) {
        await Promise.all([
          incrementCount(`visitor:${visitorId}:day`, DAY),
          incrementCount(`ip:${ipKey}:hour`, HOUR),
          incrementCount(`ip:${ipKey}:day`, DAY),
        ]);
      }
      return NextResponse.json({ result, cached: false });
    } finally {
      await releaseLock(`visitor:${visitorId}`);
    }
  } catch (error) {
    console.error("Name generation failed", error);
    return NextResponse.json(
      {
        error:
          "We couldn’t create a name just now. Your form is still here—please try once more.",
      },
      { status: 502 },
    );
  }
}
