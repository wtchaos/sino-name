import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import type { NameProfile } from "@/lib/types";

const VISITOR_COOKIE = "nih_visitor";
const THIRTY_DAYS = 60 * 60 * 24 * 30;

type TicketPayload = {
  jti: string;
  visitorId: string;
  profileHash: string;
  exp: number;
};

function appSecret(): string {
  const configured = process.env.APP_SECRET;
  if (configured && configured.length >= 32) return configured;
  if (process.env.NODE_ENV !== "production") {
    return "named-in-hanzi-local-development-secret";
  }
  throw new Error("APP_SECRET must contain at least 32 characters.");
}

function sign(input: string): string {
  return createHmac("sha256", appSecret()).update(input).digest("base64url");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function normalizeProfile(profile: NameProfile): string {
  return JSON.stringify({
    ...profile,
    firstName: profile.firstName.trim().toLocaleLowerCase("en"),
    familyName: profile.familyName.trim().toLocaleLowerCase("en"),
    qualities: [...profile.qualities].sort(),
  });
}

export function hashProfile(profile: NameProfile): string {
  return createHmac("sha256", appSecret())
    .update(normalizeProfile(profile))
    .digest("base64url");
}

export function getClientIp(request: NextRequest): string {
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for") ??
    "unknown";
  return forwarded.split(",")[0]?.trim() || "unknown";
}

export function hashIp(ip: string): string {
  return createHmac("sha256", appSecret()).update(`ip:${ip}`).digest("hex");
}

export function createVisitor(): { id: string; cookieValue: string } {
  const id = randomBytes(18).toString("base64url");
  return { id, cookieValue: `${id}.${sign(id)}` };
}

export function readVisitor(request: NextRequest): string | null {
  const value = request.cookies.get(VISITOR_COOKIE)?.value;
  if (!value) return null;
  const separator = value.lastIndexOf(".");
  if (separator < 1) return null;
  const id = value.slice(0, separator);
  const signature = value.slice(separator + 1);
  return safeEqual(sign(id), signature) ? id : null;
}

export function visitorCookie(value: string) {
  return {
    name: VISITOR_COOKIE,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: THIRTY_DAYS,
    path: "/",
  };
}

export function createTicket(
  visitorId: string,
  profile: NameProfile,
): string {
  const payload: TicketPayload = {
    jti: randomBytes(18).toString("base64url"),
    visitorId,
    profileHash: hashProfile(profile),
    exp: Math.floor(Date.now() / 1000) + 5 * 60,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifyTicket(ticket: string): TicketPayload | null {
  const separator = ticket.lastIndexOf(".");
  if (separator < 1) return null;
  const encoded = ticket.slice(0, separator);
  const signature = ticket.slice(separator + 1);
  if (!safeEqual(sign(encoded), signature)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as TicketPayload;
    if (
      !payload.jti ||
      !payload.visitorId ||
      !payload.profileHash ||
      payload.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function cacheKey(profile: NameProfile): string {
  return createHash("sha256").update(hashProfile(profile)).digest("hex");
}

export function isSameOrigin(request: NextRequest): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.nextUrl.host;
  } catch {
    return false;
  }
}

export function isJsonRequestWithinLimit(request: NextRequest): boolean {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return false;
  }
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  return !Number.isFinite(contentLength) || contentLength <= 24_000;
}
