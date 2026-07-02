"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, className }: Props) {
  // Eyebrows follow the "01 · Label" convention — use the label as the heading.
  const label = eyebrow.includes("·")
    ? eyebrow.split("·").slice(1).join("·").trim()
    : eyebrow.trim();
  const heading = title ?? label;

  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const letters = heading.split("");

  return (
    <div ref={ref} className={cn("mb-10", className)}>
      {/* Letters cascade up one by one; screen readers get the plain text. */}
      <h2
        aria-label={heading}
        className="text-4xl font-bold tracking-tight sm:text-5xl"
      >
        {letters.map((ch, i) => (
          <span
            key={i}
            aria-hidden
            style={{ animationDelay: `${i * 45}ms` }}
            className={cn(
              "inline-block",
              inView
                ? "motion-safe:animate-[fade-up_0.45s_ease-out_both]"
                : "opacity-0",
            )}
          >
            {/* NBSP: a plain space collapses inside an inline-block span. */}
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </h2>
      {/* Red underline draws itself in once the letters have landed.
          Reduced motion: no draw animation, the bar just appears. */}
      <span
        aria-hidden
        style={{
          transitionDelay: inView ? `${letters.length * 45 + 100}ms` : "0ms",
        }}
        className={cn(
          "mt-4 block h-1.5 rounded-full bg-gradient-to-r from-accent to-accent/30 transition-[width,opacity] duration-700 ease-out motion-reduce:transition-none",
          inView ? "w-24 opacity-100" : "w-0 opacity-0",
        )}
      />
    </div>
  );
}
