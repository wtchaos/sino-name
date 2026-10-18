"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { readCachedResults } from "@/lib/result-cache";

export function CreatePageGuard({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkHistory = () => {
      const latest = readCachedResults()[0];
      if (latest) {
        router.replace(`/result/${latest.id}`);
      }
    };
    checkHistory();
    window.addEventListener("pageshow", checkHistory);
    window.addEventListener("storage", checkHistory);
    return () => {
      window.removeEventListener("pageshow", checkHistory);
      window.removeEventListener("storage", checkHistory);
    };
  }, [router]);

  return children;
}
