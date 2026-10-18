"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          action: string;
          appearance: "always";
          size: "flexible";
          "refresh-expired": "auto";
          "before-interactive-callback": () => void;
          "timeout-callback": () => void;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        },
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

export function Turnstile({
  onToken,
  resetKey,
}: {
  onToken: (token: string) => void;
  resetKey: number;
}) {
  const [status, setStatus] = useState<"loading" | "interactive" | "verified" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!siteKey) {
      onToken("development-bypass");
      return;
    }

    setStatus("loading");
    let settled = false;
    const fail = () => { settled = true; setStatus("error"); onToken(""); };
    const timeout = window.setTimeout(() => { if (!settled) fail(); }, 20000);
    let interval: number | undefined;
    const render = () => {
      if (!containerRef.current || !window.turnstile) return false;
      if (widgetIdRef.current) return true;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: "generate_name",
        appearance: "always",
        size: "flexible",
        "refresh-expired": "auto",
        callback: (token) => { settled = true; setStatus("verified"); onToken(token); },
        "before-interactive-callback": () => { settled = true; setStatus("interactive"); },
        "timeout-callback": fail,
        "expired-callback": () => { setStatus("loading"); onToken(""); },
        "error-callback": fail,
      });
      return true;
    };

    if (!render()) {
      interval = window.setInterval(() => {
        if (render() && interval !== undefined) {
          window.clearInterval(interval);
          interval = undefined;
        }
      }, 100);
    }
    return () => {
      if (interval !== undefined) window.clearInterval(interval);
      window.clearTimeout(timeout);
      const widgetId = widgetIdRef.current;
      widgetIdRef.current = undefined;
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [onToken, siteKey, attempt, resetKey]);

  if (!siteKey) return null;

  return (
    <div className="verification-panel">
      <strong>Quick security check</strong>
      <p role="status">
        {status === "verified" ? "Verified. You’re ready to create your name."
          : status === "error" ? "Verification couldn’t finish. Please retry. If it still won’t load, check your connection or content blocker."
          : status === "interactive" ? "Please complete the check below to continue."
          : "Preparing your security check. If asked, confirm you’re human below before creating your name."}
      </p>
      {siteKey ? (
        <Script
          key={attempt}
          src={attempt === 0
            ? "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            : `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&retry=${attempt}`}
          strategy="afterInteractive"
          onError={() => { setStatus("error"); onToken(""); }}
        />
      ) : null}
      <div ref={containerRef} className="turnstile-container" />
      {status === "error" ? (
        <button type="button" className="button button-secondary" onClick={() => { onToken(""); setAttempt((value) => value + 1); }}>Retry verification</button>
      ) : null}
    </div>
  );
}
