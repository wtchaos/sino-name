"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { readCachedResults } from "@/lib/result-cache";

export function CreatePageGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkHistory = () => {
      const latest = readCachedResults()[0];
      if (latest) {
        setReady(false);
        router.replace(`/result/${latest.id}`);
      } else {
        setReady(true);
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

  if (!ready) {
    return <div className="create-cache-status" role="status">Checking your saved name…</div>;
  }

  return children;
}
