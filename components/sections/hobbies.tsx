import type { LucideIcon } from "lucide-react";
import { Dumbbell, Footprints, Music, Volleyball } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { hobbies } from "@/lib/data";

// Each hobby gets an icon and a distinct hover animation (motion-safe only).
const config: Record<string, { Icon: LucideIcon; anim: string }> = {
  Football: { Icon: Volleyball, anim: "motion-safe:group-hover:animate-spin" },
  Gym: { Icon: Dumbbell, anim: "motion-safe:group-hover:animate-bounce" },
  Running: {
    Icon: Footprints,
    anim: "motion-safe:group-hover:animate-[stride_0.5s_ease-in-out_infinite]",
  },
  Music: {
    Icon: Music,
    anim: "motion-safe:group-hover:animate-[wiggle_0.4s_ease-in-out_infinite]",
  },
};

export function Hobbies() {
  return (
    <section id="hobbies" className="py-16">
      <SectionHeading eyebrow="06 · Hobbies" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {hobbies.map((hobby) => {
          const { Icon, anim } = config[hobby.name] ?? {};
          return (
            <div
              key={hobby.name}
              className="group flex flex-col items-center gap-4 rounded-lg border border-border bg-card py-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-accent">
                {Icon && <Icon className={`h-6 w-6 ${anim}`} />}
              </span>
              <span className="font-mono text-sm tracking-tight">
                {hobby.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
