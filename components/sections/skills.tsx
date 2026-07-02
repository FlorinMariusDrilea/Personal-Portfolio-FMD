"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { techIcons } from "@/components/tech-icons";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Kick off the staggered chip cascade once the section scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-16">
      <SectionHeading eyebrow="04 · Skills" />

      {/* One unified block: categories are divided rows, no gaps. Label sits in
          a fixed-width left column so the chips align across every row. */}
      <div
        ref={ref}
        className="divide-y divide-border overflow-hidden rounded-lg border border-border"
      >
        {skills.map((group, gi) => (
          <div
            key={group.label}
            className="flex flex-col gap-3 px-4 py-3.5 transition-colors hover:bg-muted/40 sm:flex-row sm:items-start sm:gap-6"
          >
            <div className="flex items-center gap-2.5 sm:w-40 sm:shrink-0 sm:pt-1">
              <span className="font-mono text-xs tabular-nums text-accent">
                {String(gi + 1).padStart(2, "0")}
              </span>
              <h3 className="font-mono text-xs uppercase tracking-widest text-foreground">
                {group.label}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item, i) => {
                const Icon = techIcons[item];
                return (
                  <span
                    key={item}
                    style={{ animationDelay: `${i * 40}ms` }}
                    className={cn(
                      "group inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-foreground",
                      revealed
                        ? "motion-safe:animate-[fade-up_0.5s_ease-out_both]"
                        : "opacity-0",
                    )}
                  >
                    {Icon ? (
                      <Icon
                        aria-hidden
                        className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:scale-125 group-hover:text-accent"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50 transition-colors group-hover:bg-accent"
                      />
                    )}
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
