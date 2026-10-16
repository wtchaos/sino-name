"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          action: string;
          appearance: "interaction-only";
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
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const previousResetKey = useRef(resetKey);

  useEffect(() => {
    if (!siteKey) {
      onToken("development-bypass");
      return;
    }

    let interval: number | undefined;
    const render = () => {
      if (!containerRef.current || !window.turnstile) return false;
      if (widgetIdRef.current) return true;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: "generate_name",
        appearance: "interaction-only",
        callback: onToken,
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
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
      const widgetId = widgetIdRef.current;
      widgetIdRef.current = undefined;
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [onToken, siteKey]);

  useEffect(() => {
    if (resetKey === previousResetKey.current) return;
    previousResetKey.current = resetKey;
    const widgetId = widgetIdRef.current;
    if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
  }, [resetKey]);

  return (
    <>
      {siteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
        />
      ) : null}
      <div ref={containerRef} className="turnstile-container" aria-live="polite" />
    </>
  );
}
