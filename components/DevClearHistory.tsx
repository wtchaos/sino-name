"use client";

import { useEffect, useState } from "react";
import { clearDevelopmentResultCache } from "@/lib/result-cache";

export function DevClearHistory() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (clearDevelopmentResultCache()) {
      window.location.replace("/create");
    } else {
      setFailed(true);
    }
  }, []);

  return (
    <main className="result-loading" role="status">
      {failed
        ? "Could not clear browser storage. Check your browser settings and run npm run clear again."
        : "Clearing development history…"}
    </main>
  );
}
