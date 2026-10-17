"use client";

import { useEffect, useState, type ReactNode } from "react";

export function StickyHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("pageshow", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("pageshow", update);
    };
  }, []);

  return <header className={`sticky-header ${className}`} data-scrolled={scrolled ? "true" : "false"}>{children}</header>;
}
