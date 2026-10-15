export async function verifyTurnstile(
  token: string,
  remoteIp: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token || token.length > 2048) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: token,
          remoteip: remoteIp,
        }),
        signal: controller.signal,
        cache: "no-store",
      },
    );
    if (!response.ok) return false;
    const result = (await response.json()) as {
      success?: boolean;
      action?: string;
      hostname?: string;
    };
    return result.success === true && result.action === "generate_name";
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
