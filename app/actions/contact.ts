"use server";

import { Resend } from "resend";
import { profile } from "@/lib/data";

import type { ContactState } from "./contact-state";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function sendContactEmail(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: bots fill hidden fields, humans never see them. Pretend success
  // so the bot doesn't learn it was caught.
  if (clean(formData.get("company"))) {
    return { status: "success", message: "Thanks — your message has been sent." };
  }

  const name = clean(formData.get("name"));
  const email = clean(formData.get("email"));
  const message = clean(formData.get("message"));
  const values = { name, email, message };

  const errors: NonNullable<ContactState["errors"]> = {};
  if (!name) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "That doesn't look like a valid email.";
  if (!message) errors.message = "Please enter a message.";
  else if (message.length < 10)
    errors.message = "Message is a little short — add a few more details.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot send contact email.");
    return {
      status: "error",
      message: "The contact form isn't configured yet. Please email me directly.",
      values,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // Must be a domain you've verified in Resend. Falls back to Resend's
      // shared onboarding sender, which only delivers to your own account email.
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: profile.email,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend failed to send contact email:", error);
      return {
        status: "error",
        message: "Something went wrong sending your message. Please try again.",
        values,
      };
    }

    return {
      status: "success",
      message: "Thanks — your message has been sent. I'll be in touch soon.",
    };
  } catch (err) {
    console.error("Unexpected error sending contact email:", err);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again.",
      values,
    };
  }
}
