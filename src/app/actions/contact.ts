"use server";

import { Resend } from "resend";
import { z } from "zod";

export type ContactField = "name" | "email" | "message";

/** Echoed back on failure so the form keeps what the visitor typed. */
export type ContactValues = { name: string; email: string; type: string; mode: string; message: string };

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; fields: ContactField[]; values: ContactValues }
  | { status: "error"; reason: "generic" | "unavailable"; values: ContactValues };

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  type: z.enum(["client", "agency", "audit"]).catch("client"),
  mode: z.enum(["visio", "onsite", "any"]).catch("any"),
  message: z.string().trim().min(20).max(5000),
  locale: z.enum(["fr", "en"]).catch("fr"),
});

const typeLabel = { client: "Projet client", agency: "Renfort agence", audit: "Audit d'app" } as const;
const modeLabel = { visio: "Visio", onsite: "Sur place", any: "Peu importe" } as const;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("website") ?? "").length > 0) return { status: "success" };

  const raw = Object.fromEntries(formData);
  const values: ContactValues = {
    name: String(raw.name ?? ""),
    email: String(raw.email ?? ""),
    type: String(raw.type ?? ""),
    mode: String(raw.mode ?? ""),
    message: String(raw.message ?? ""),
  };
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((issue) => issue.path[0]))].filter(
      (field): field is ContactField => field === "name" || field === "email" || field === "message",
    );
    return { status: "invalid", fields, values };
  }

  const { name, email, type, mode, message, locale } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    // Local development and tests: accept the request without sending anything.
    if (process.env.CONTACT_DRY_RUN === "1" || process.env.NODE_ENV === "development") {
      console.info("[contact] dry run", { name, type, mode, locale });
      return { status: "success" };
    }
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is missing");
    return { status: "error", reason: "unavailable", values };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Romain / Dev <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `[${typeLabel[type]}] ${name}`,
    text: [
      `Nom : ${name}`,
      `E-mail : ${email}`,
      `Demande : ${typeLabel[type]}`,
      `Premier échange : ${modeLabel[mode]}`,
      `Langue du site : ${locale.toUpperCase()}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("[contact] Resend error", error.name);
    return { status: "error", reason: "generic", values };
  }
  return { status: "success" };
}
