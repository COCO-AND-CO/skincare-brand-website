"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function UnlockListener() {
  const router = useRouter();

  useEffect(() => {
    let sequence = "";
    const target = "UNLOCK";

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input, textarea, or select
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      sequence += e.key.toUpperCase();
      
      // Keep only the last N characters
      if (sequence.length > target.length) {
        sequence = sequence.slice(-target.length);
      }

      if (sequence === target) {
        sequence = ""; // reset
        router.push("/admin/login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
}
