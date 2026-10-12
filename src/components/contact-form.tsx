"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { track } from "@vercel/analytics";
import { ArrowRight, CircleCheck } from "lucide-react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import type { Locale } from "@/i18n/config";
import { lines } from "@/data/lines";
import { cn } from "@/lib/utils";
import { LineBadge } from "./line-badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type RequestType = "client" | "agency" | "audit";

export type ContactFormCopy = {
  name: string;
  email: string;
  type: string;
  types: Record<RequestType, string>;
  mode: string;
  modes: { visio: string; onsite: string; any: string };
  message: string;
  messageHint: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  privacy: string;
  errors: { name: string; email: string; message: string; generic: string; unavailable: string };
};

const initialState: ContactState = { status: "idle" };

export function ContactForm({
  lang,
  copy,
  defaultType = "client",
}: {
  lang: Locale;
  copy: ContactFormCopy;
  defaultType?: RequestType;
}) {
  const [state, action, pending] = useActionState(sendContact, initialState);
  const id = useId();
  const statusRef = useRef<HTMLDivElement>(null);
  const invalid = state.status === "invalid" ? state.fields : [];
  const values = state.status === "invalid" || state.status === "error" ? state.values : undefined;
  const checkedType = values?.type || defaultType;
  const checkedMode = values?.mode || "visio";

  useEffect(() => {
    if (state.status === "success") {
      track("contact_submit");
      statusRef.current?.focus();
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="plate flex flex-col gap-3 p-8 outline-none">
        <CircleCheck className="size-10 text-line-2" aria-hidden />
        <p className="text-2xl font-black tracking-[-0.02em]">{copy.successTitle}</p>
        <p className="text-ink-2">{copy.successBody}</p>
      </div>
    );
  }

  const fieldError = (field: "name" | "email" | "message") =>
    invalid.includes(field) ? (
      <p id={`${id}-${field}-error`} className="text-sm font-semibold text-[#b02e1a]">
        {copy.errors[field]}
      </p>
    ) : null;

  return (
    <form action={action} className="plate relative grid gap-6 p-6 sm:p-8">
      <input type="hidden" name="locale" value={lang} />
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="grid gap-3">
        <legend className="mb-3 text-[0.95rem] font-semibold">{copy.type}</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {lines.map((line) => (
            <label
              key={line.id}
              className="group relative flex min-h-14 cursor-pointer items-center gap-3 rounded-[10px] bg-paper px-3 py-2 text-[0.95rem] leading-tight font-semibold shadow-[inset_0_0_0_1.5px_var(--rule)] transition-shadow has-checked:bg-plate has-checked:shadow-[inset_0_0_0_2.5px_var(--ink)] has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--focus)"
            >
              <input
                type="radio"
                name="type"
                value={line.requestType}
                defaultChecked={line.requestType === checkedType}
                className="sr-only"
              />
              <LineBadge line={line} size="sm" />
              {copy.types[line.requestType]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={`${id}-name`}>{copy.name}</Label>
          <Input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            defaultValue={values?.name}
            required
            minLength={2}
            aria-invalid={invalid.includes("name") || undefined}
            aria-describedby={invalid.includes("name") ? `${id}-name-error` : undefined}
          />
          {fieldError("name")}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${id}-email`}>{copy.email}</Label>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={values?.email}
            required
            aria-invalid={invalid.includes("email") || undefined}
            aria-describedby={invalid.includes("email") ? `${id}-email-error` : undefined}
          />
          {fieldError("email")}
        </div>
      </div>

      <fieldset>
        <legend className="mb-3 text-[0.95rem] font-semibold">{copy.mode}</legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(copy.modes) as (keyof typeof copy.modes)[]).map((mode) => (
            <label
              key={mode}
              className="flex h-11 cursor-pointer items-center rounded-full bg-paper px-4 text-[0.95rem] font-semibold shadow-[inset_0_0_0_1.5px_var(--rule)] has-checked:bg-band has-checked:text-band-ink has-checked:shadow-none has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--focus)"
            >
              <input type="radio" name="mode" value={mode} defaultChecked={mode === checkedMode} className="sr-only" />
              {copy.modes[mode]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-2">
        <Label htmlFor={`${id}-message`}>{copy.message}</Label>
        <p id={`${id}-message-hint`} className="-mt-1 text-sm text-ink-2">
          {copy.messageHint}
        </p>
        <Textarea
          id={`${id}-message`}
          name="message"
          defaultValue={values?.message}
          required
          minLength={20}
          aria-invalid={invalid.includes("message") || undefined}
          aria-describedby={cn(`${id}-message-hint`, invalid.includes("message") && `${id}-message-error`)}
        />
        {fieldError("message")}
      </div>

      {state.status === "error" ? (
        <p role="alert" className="rounded-[10px] bg-line-1-soft px-4 py-3 font-semibold text-[#8f2414]">
          {copy.errors[state.reason]}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink-2">{copy.privacy}</p>
        <Button type="submit" size="lg" disabled={pending} aria-disabled={pending}>
          {pending ? copy.sending : copy.submit}
          <ArrowRight aria-hidden />
        </Button>
      </div>
    </form>
  );
}
