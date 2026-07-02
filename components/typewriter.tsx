"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 65;
const DELETE_MS = 35;
const HOLD_MS = 2200; // pause with the full phrase on screen
const GAP_MS = 450; // pause on the empty line before typing the next one

/**
 * Endlessly types, holds, and deletes each phrase in turn. Renders the first
 * phrase fully on the server so there's no hydration flash, and stays static
 * for reduced-motion users. Screen readers get a stable list of all phrases
 * instead of a stream of re-announcements.
 */
export function Typewriter({ phrases }: { phrases: readonly string[] }) {
  const [display, setDisplay] = useState(phrases[0]);

  useEffect(() => {
    if (phrases.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idx = 0;
    let pos = phrases[0].length;
    let mode: "type" | "delete" = "delete";
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      const current = phrases[idx];
      if (mode === "type") {
        pos++;
        setDisplay(current.slice(0, pos));
        if (pos === current.length) {
          mode = "delete";
          timer = setTimeout(step, HOLD_MS);
        } else {
          // Slight jitter so it reads as human typing, not a metronome.
          timer = setTimeout(step, TYPE_MS + Math.random() * 60);
        }
      } else {
        pos--;
        setDisplay(current.slice(0, pos));
        if (pos === 0) {
          idx = (idx + 1) % phrases.length;
          mode = "type";
          timer = setTimeout(step, GAP_MS);
        } else {
          timer = setTimeout(step, DELETE_MS);
        }
      }
    };

    timer = setTimeout(step, HOLD_MS);
    return () => clearTimeout(timer);
  }, [phrases]);

  return (
    <>
      <span className="sr-only">{phrases.join(" · ")}</span>
      <span aria-hidden>{display}</span>
    </>
  );
}
