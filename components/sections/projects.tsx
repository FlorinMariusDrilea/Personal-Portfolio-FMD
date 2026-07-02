"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { SectionHeading } from "@/components/sections/section-heading";
import { primaryIcon } from "@/components/tech-icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile } from "@/lib/data";
import type { ProjectWithMeta } from "@/lib/github";
import { cn } from "@/lib/utils";

const PER_PAGE = 4;

export function Projects({ projects }: { projects: ProjectWithMeta[] }) {
  const pageCount = Math.ceil(projects.length / PER_PAGE);
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const touchX = useRef<number | null>(null);

  const go = (next: number) => {
    const target = (next + pageCount) % pageCount;
    setDir(target > page || (page === pageCount - 1 && target === 0) ? 1 : -1);
    setPage(target);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(page + 1);
    if (e.key === "ArrowLeft") go(page - 1);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 50) go(page + (delta < 0 ? 1 : -1));
    touchX.current = null;
  };

  const current = projects.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section id="projects" className="py-16">
      <SectionHeading eyebrow="03 · Projects" />

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
        className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/* Controls: page dots + prev/next arrows. */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === page ? "true" : undefined}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === page
                    ? "w-6 bg-accent"
                    : "w-1.5 bg-border hover:bg-muted-foreground",
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-1 font-mono text-xs text-muted-foreground">
              {page + 1} / {pageCount}
            </span>
            <button
              onClick={() => go(page - 1)}
              aria-label="Previous projects"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => go(page + 1)}
              aria-label="Next projects"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Page of cards. Remounted on page change (key) so it slides in from
            the direction of travel. min-h keeps the layout steady. */}
        <div
          key={page}
          style={{ ["--slide-from" as string]: `${dir * 32}px` }}
          className="grid min-h-[22rem] auto-rows-min gap-4 motion-safe:animate-[card-slide_0.35s_ease-out] sm:grid-cols-2"
        >
          {current.map((p) => {
            const Icon = primaryIcon(p.stack);
            return (
              <Card
                key={p.name}
                className="group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/10"
              >
                {/* Cover: real screenshot if provided, else a generated banner
                    (dot grid + faded primary-tech logo). */}
                <div className="relative h-40 overflow-hidden border-b border-border bg-gradient-to-br from-muted to-card">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`${p.title} preview`}
                      fill
                      sizes="(max-width: 640px) 100vw, 440px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
                      {Icon && (
                        <Icon
                          aria-hidden
                          className="absolute -right-3 -bottom-3 h-28 w-28 text-accent/15 transition-transform duration-500 group-hover:scale-110 group-hover:text-accent/25"
                        />
                      )}
                    </>
                  )}
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="transition-colors group-hover:text-accent">
                      {p.title}
                    </CardTitle>
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">
                    {p.name}
                  </p>
                  {/* Live GitHub meta, server-fetched with ISR; the line is
                      simply absent when the API was unreachable. */}
                  {p.github && (
                    <p className="flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted-foreground/80">
                      {p.github.stars > 0 && (
                        <>
                          <span
                            className="inline-flex items-center gap-1"
                            aria-label={`${p.github.stars} GitHub stars`}
                          >
                            <Star
                              aria-hidden
                              className="h-3 w-3 text-accent/70"
                            />
                            {p.github.stars}
                          </span>
                          <span aria-hidden>·</span>
                        </>
                      )}
                      {p.github.language && (
                        <>
                          <span>{p.github.language}</span>
                          <span aria-hidden>·</span>
                        </>
                      )}
                      <span>{p.github.updatedLabel}</span>
                    </p>
                  )}
                </CardHeader>

                <CardContent className="flex flex-1 flex-col">
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </CardContent>

                {/* Whole card links to the repo (stretched). The Live link sits
                    above it (z-10) so it stays independently clickable. */}
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title} — source on GitHub`}
                  className="absolute inset-0 z-0 rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                />
                {p.homepage && (
                  <a
                    href={p.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} — live site`}
                    className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-md border border-border bg-background/80 px-2 py-1 font-mono text-xs text-muted-foreground backdrop-blur transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Live
                  </a>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <a
          href={`${profile.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <GithubIcon className="h-4 w-4" />
          See all repositories on GitHub
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
