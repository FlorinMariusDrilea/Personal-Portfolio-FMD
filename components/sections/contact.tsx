"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Send } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";
import { initialContactState } from "@/app/actions/contact-state";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:border-accent/60 focus-visible:outline-none";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="accent"
      disabled={pending}
      className="w-full sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending…
        </>
      ) : (
        <>
          <Send className="h-4 w-4" />
          Send message
        </>
      )}
    </Button>
  );
}

export function Contact() {
  const [state, formAction] = useActionState(
    sendContactEmail,
    initialContactState,
  );

  return (
    <section id="contact" className="py-16">
      <SectionHeading
        eyebrow="07 · Contact"
        className="flex flex-col items-center text-center"
      />

      <div className="mx-auto max-w-2xl">
        <p className="mb-8 text-center text-base leading-relaxed text-muted-foreground">
          Have a role, a project, or just want to talk shop? Drop me a message
          below and it&apos;ll land straight in my inbox. Prefer email? Reach me
          at{" "}
          <a
            href={`mailto:${profile.email}`}
            className="text-foreground underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent"
          >
            {profile.email}
          </a>
          .
        </p>

        <form action={formAction} className="space-y-5" noValidate>
          {/* Honeypot — hidden from users, catches naive bots. */}
          <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block font-mono text-xs uppercase tracking-widest text-muted-foreground"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                defaultValue={state.values?.name ?? ""}
                placeholder="Jane Doe"
                aria-invalid={state.errors?.name ? true : undefined}
                aria-describedby={state.errors?.name ? "name-error" : undefined}
                className={cn(
                  fieldBase,
                  state.errors?.name ? "border-accent" : "border-border",
                )}
              />
              {state.errors?.name && (
                <p id="name-error" className="text-xs text-accent">
                  {state.errors.name}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block font-mono text-xs uppercase tracking-widest text-muted-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={state.values?.email ?? ""}
                placeholder="jane@example.com"
                aria-invalid={state.errors?.email ? true : undefined}
                aria-describedby={
                  state.errors?.email ? "email-error" : undefined
                }
                className={cn(
                  fieldBase,
                  state.errors?.email ? "border-accent" : "border-border",
                )}
              />
              {state.errors?.email && (
                <p id="email-error" className="text-xs text-accent">
                  {state.errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="block font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              defaultValue={state.values?.message ?? ""}
              placeholder="Tell me a bit about what you have in mind…"
              aria-invalid={state.errors?.message ? true : undefined}
              aria-describedby={
                state.errors?.message ? "message-error" : undefined
              }
              className={cn(
                fieldBase,
                "resize-y",
                state.errors?.message ? "border-accent" : "border-border",
              )}
            />
            {state.errors?.message && (
              <p id="message-error" className="text-xs text-accent">
                {state.errors.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <SubmitButton />
            {state.status !== "idle" && (
              <p
                role="status"
                aria-live="polite"
                className={cn(
                  "text-sm",
                  state.status === "success"
                    ? "text-foreground"
                    : "text-accent",
                )}
              >
                {state.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
