"use client";

import { useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// Hydration guard: false during SSR/hydration, true after — without the
// setState-in-effect that the old `mounted` pattern needed.
const emptySubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();
  const btnRef = useRef<HTMLButtonElement>(null);

  const isDark = hydrated && resolvedTheme === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";

    // Circular reveal via the View Transitions API: the new theme expands
    // from the toggle button. Falls back to an instant switch on browsers
    // without the API or for reduced-motion users. The matching
    // ::view-transition rules live in globals.css.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      setTheme(next);
      return;
    }

    const rect = btnRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      // Flush synchronously so the new theme is painted before the
      // transition captures its "new" snapshot.
      flushSync(() => setTheme(next));
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {
        // Transition skipped (e.g. rapid toggling) — theme still applied.
      });
  };

  return (
    <Button
      ref={btnRef}
      variant="ghost"
      size="sm"
      aria-label="Toggle theme"
      onClick={toggle}
      className="h-9 w-9 p-0"
    >
      {hydrated ? (
        isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )
      ) : (
        <span className="h-4 w-4" />
      )}
    </Button>
  );
}
