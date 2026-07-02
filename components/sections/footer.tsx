import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border py-10">
      <div className="mb-8 flex justify-end">
        <a
          href="#"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5" />
        </a>
      </div>
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Built with Next.js · deployed on Vercel
          </p>
          <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-muted-foreground/80">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
            />
            Glory Glory Man United
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
