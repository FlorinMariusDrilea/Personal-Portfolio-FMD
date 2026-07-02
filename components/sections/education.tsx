import { GraduationCap, Award } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { certifications, education } from "@/lib/data";

export function Education() {
  return (
    <section id="education" className="py-16">
      <SectionHeading
        eyebrow="05 · Education"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent/40">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-accent">
              <GraduationCap className="h-4 w-4" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Education
            </span>
          </div>
          <h3 className="text-base font-semibold tracking-tight">
            {education.degree}
          </h3>
          <p className="text-sm text-muted-foreground">
            {education.school} · {education.location}
          </p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {education.period}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {education.notes}
          </p>
        </div>

        <div className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent/40">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-accent">
              <Award className="h-4 w-4" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Certifications
            </span>
          </div>
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li key={c.name}>
                <h3 className="text-base font-semibold tracking-tight">
                  {c.name}
                </h3>
                <p className="text-sm text-muted-foreground">{c.issuer}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {c.year}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
