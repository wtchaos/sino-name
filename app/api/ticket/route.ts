import { NextRequest, NextResponse } from "next/server";
import { ticketRequestSchema } from "@/lib/schema";
import {
  createTicket,
  createVisitor,
  getClientIp,
  hashIp,
  isJsonRequestWithinLimit,
  isSameOrigin,
  readVisitor,
  visitorCookie,
} from "@/lib/security";
import { getCount, hasPersistentStore, incrementCount } from "@/lib/store";

export const runtime = "nodejs";

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

  try {
    const body = ticketRequestSchema.parse(await request.json());
    const ipKey = hashIp(getClientIp(request));
    const enforce =
      process.env.NODE_ENV === "production" ||
      process.env.ENFORCE_RATE_LIMITS === "true";

    if (enforce && (await getCount(`ticket:${ipKey}:10m`)) >= 10) {
      return NextResponse.json(
        { error: "Too many attempts. Please wait a few minutes." },
        { status: 429 },
      );
    }
    if (enforce) await incrementCount(`ticket:${ipKey}:10m`, 10 * 60);

    const existingVisitor = readVisitor(request);
    const visitor = existingVisitor
      ? { id: existingVisitor, cookieValue: null }
      : createVisitor();
    const ticket = createTicket(visitor.id, body.profile);
    const response = NextResponse.json({ ticket });
    if (visitor.cookieValue) {
      response.cookies.set(visitorCookie(visitor.cookieValue));
    }
    return response;
  } catch {
    return NextResponse.json(
      { error: "Check the form and try again." },
      { status: 400 },
    );
  }
}
