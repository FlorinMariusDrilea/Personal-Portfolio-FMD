"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Terminal "boot sequence" intro. A shell window types the boot command,
 * streams status lines (with an ASCII cache-warm progress bar), then the
 * whole overlay slides away to reveal the site. Shown once per session;
 * skipped entirely when the user prefers reduced motion.
 */

const SESSION_KEY = "fmd:intro-seen";
const CMD = "./boot-fmd.dev.sh";

// Timeline (ms since mount). Each constant builds on the previous so the
// whole sequence can be retimed by touching the gaps only.
const TYPE_START = 150;
const TYPE_MS = 22; // per character
const TYPE_END = TYPE_START + CMD.length * TYPE_MS;

const LOG_AT = TYPE_END + 140;
const LINES = [
  { at: LOG_AT, okAt: LOG_AT + 170, text: "runtime · java · scala · spring" },
  { at: LOG_AT + 180, okAt: LOG_AT + 350, text: "service mesh linked · 42 nodes" },
];

const CACHE_AT = LOG_AT + 360;
const CACHE_MS = 460; // progress bar duration
const BAR_BLOCKS = 10;

const DEPLOY_AT = CACHE_AT + CACHE_MS + 60;
const DEPLOY_OK = DEPLOY_AT + 160;
const READY_AT = DEPLOY_OK + 140;
const EXIT_AT = READY_AT + 520;

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function Status({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="text-emerald-500">[ ok ]</span>
  ) : (
    <span className="text-muted-foreground/50">[ .. ]</span>
  );
}

function Caret() {
  return (
    <span
      aria-hidden
      className="ml-1 inline-block h-3 w-[6px] translate-y-[2px] bg-accent animate-[caret-blink_1s_linear_infinite]"
    />
  );
}

export function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const rafRef = useRef(0);

  useIsomorphicLayoutEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY) === "1";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    sessionStorage.setItem(SESSION_KEY, "1");

    const entrance = requestAnimationFrame(() => setReady(true));

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const tick = (now: number) => {
      const t = now - start;
      setElapsed(t);
      if (t < EXIT_AT) rafRef.current = requestAnimationFrame(tick);
      else setExiting(true);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(entrance);
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted]);

  if (!mounted) return null;

  const typed = CMD.slice(
    0,
    Math.max(0, Math.min(CMD.length, Math.floor((elapsed - TYPE_START) / TYPE_MS))),
  );
  const cacheP = Math.max(0, Math.min(1, (elapsed - CACHE_AT) / CACHE_MS));
  const filled = Math.round(cacheP * BAR_BLOCKS);
  const progress = Math.min(100, (elapsed / EXIT_AT) * 100);

  return (
    <div
      aria-hidden
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && exiting) {
          document.body.style.overflow = "";
          setMounted(false);
        }
      }}
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background",
        "transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
        exiting ? "-translate-y-full" : "translate-y-0",
      )}
    >
      {/* Faint dot grid, echoing the hero backdrop. */}
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div
        className={cn(
          "relative w-[min(92vw,26rem)] overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-accent/5",
          "transition-all duration-500 ease-out",
          ready ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.98] opacity-0",
        )}
      >
        {/* Title bar with macOS traffic lights. */}
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[11px] text-muted-foreground">
            fmd@portfolio: ~
          </span>
        </div>

        <div className="flex h-48 flex-col gap-1.5 p-4 font-mono text-xs leading-5">
          <p className="text-foreground">
            <span className="select-none text-accent">$ </span>
            {typed}
            {elapsed < LOG_AT && <Caret />}
          </p>

          {LINES.map(
            (l) =>
              elapsed >= l.at && (
                <p key={l.text} className="text-muted-foreground">
                  <Status ok={elapsed >= l.okAt} /> {l.text}
                </p>
              ),
          )}

          {elapsed >= CACHE_AT && (
            <p className="text-muted-foreground">
              <Status ok={cacheP >= 1} /> warming redis cache{" "}
              <span className="text-foreground/70">
                [{"█".repeat(filled)}
                {"░".repeat(BAR_BLOCKS - filled)}]
              </span>{" "}
              {Math.round(cacheP * 100)}%
            </p>
          )}

          {elapsed >= DEPLOY_AT && (
            <p className="text-muted-foreground">
              <Status ok={elapsed >= DEPLOY_OK} /> florin marius drilea —
              deployed
            </p>
          )}

          {elapsed >= READY_AT && (
            <p className="text-foreground">
              ready in {(READY_AT / 1000).toFixed(1)}s
              <Caret />
            </p>
          )}
        </div>
      </div>

      <span
        className="absolute bottom-0 left-0 h-px bg-accent"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
