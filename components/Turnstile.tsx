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

  useEffect(() => {
    if (!siteKey) {
      onToken("development-bypass");
      return;
    }

    let widgetId: string | undefined;
    const render = () => {
      if (!containerRef.current || !window.turnstile) return false;
      containerRef.current.innerHTML = "";
      widgetId = window.turnstile.render(containerRef.current, {
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
      const interval = window.setInterval(() => {
        if (render()) window.clearInterval(interval);
      }, 100);
      return () => window.clearInterval(interval);
    }
    return () => {
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [onToken, resetKey, siteKey]);

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
