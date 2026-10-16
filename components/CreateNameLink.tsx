"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { readCachedResults } from "@/lib/result-cache";

export function CreateNameLink({ children, className }: { children: ReactNode; className?: string }) {
  const router = useRouter();

  return (
    <Link
      href="/create"
      className={className}
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const latest = readCachedResults()[0];
        if (!latest) return;
        event.preventDefault();
        router.push(`/result/${latest.id}`);
      }}
    >
      {children}
    </Link>
  );
}
