import { MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { Typewriter } from "@/components/typewriter";
import { ButtonLink } from "@/components/ui/button";
import { profile } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24">
      {/* Decorative backdrop: faded dot grid + soft accent glow. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
        <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl motion-safe:animate-[drift_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 -left-24 h-56 w-56 rounded-full bg-accent/5 blur-3xl motion-safe:animate-[drift_26s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/3 left-1/2 h-40 w-40 rounded-full bg-accent/[0.07] blur-3xl motion-safe:animate-[drift_32s_ease-in-out_-9s_infinite]" />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Available for new opportunities
          </span>
        </div>

        <h1 className="bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl">
          {profile.name}
        </h1>

        <p className="font-mono text-sm text-muted-foreground">
          <span aria-hidden className="mr-2 select-none text-accent">
            {"//"}
          </span>
          <Typewriter phrases={profile.roles} />
          <span
            aria-hidden
            className="ml-1.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-accent motion-safe:animate-pulse"
          />
        </p>

        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.tagline}
        </p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" aria-hidden />
          {profile.location}
          {profile.openToRelocation && (
            <span className="text-muted-foreground/70">
              · open to relocation
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-3">
          <ButtonLink
            href={profile.cvPath}
            download
            variant="accent"
            size="md"
            aria-label="Download CV"
            className="font-mono"
          >
            <span aria-hidden className="select-none text-accent-foreground/70">
              $
            </span>
            ./download-cv.sh
          </ButtonLink>
          <ButtonLink
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="md"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </ButtonLink>
          <ButtonLink
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="md"
          >
            <LinkedinIcon className="h-4 w-4" />
            LinkedIn
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
