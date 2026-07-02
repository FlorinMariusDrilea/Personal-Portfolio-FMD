"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);

  // Close the mobile menu when the viewport grows past the sm breakpoint,
  // so it never lingers open after rotating or resizing.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Thin accent line under the header tracking scroll progress. Width is set
  // directly on the DOM node to avoid re-rendering on every scroll event.
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? (el.scrollTop / max) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = `${p}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        <Link
          href="/"
          onClick={(e) => {
            // If already on the homepage, prevent default routing and scroll to top smoothly
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="font-mono text-sm font-medium tracking-tight hover:text-accent cursor-pointer"
        >
          fmd<span className="text-accent">.</span>
          <span className="text-muted-foreground">dev</span>
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 sm:flex">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted",
                    isActive
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:hidden"
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown: stacked section links, hidden at sm+ where the
          inline nav takes over. */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-border/60 px-6 py-3 sm:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted",
                      isActive
                        ? "text-accent"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
