import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="py-16">
      <SectionHeading
        eyebrow="02 · Experience"
      />

      <ol className="relative border-l border-border">
        {experience.map((role) => {
          const isCurrent = role.period.includes("Present");
          return (
          <li
            key={`${role.company}-${role.period}`}
            className="group mb-10 pl-6"
          >
            {isCurrent && (
              <span
                aria-hidden
                className="absolute -left-[5px] mt-2 h-2.5 w-2.5 animate-ping rounded-full bg-accent/60"
              />
            )}
            <span
              aria-hidden
              className={cn(
                "absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full border transition-colors",
                isCurrent
                  ? "border-accent bg-accent/40"
                  : "border-border bg-background group-hover:border-accent/60",
              )}
            />

            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-semibold tracking-tight">
                {role.role}{" "}
                <span className="font-normal text-muted-foreground transition-colors group-hover:text-accent">
                  · {role.company}
                </span>
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                {role.period}
              </span>
            </div>

            <p className="mt-0.5 font-mono text-xs text-muted-foreground">
              {role.location}
            </p>

            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-border">
              {role.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {role.stack.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </li>
          );
        })}
      </ol>
    </section>
  );
}
