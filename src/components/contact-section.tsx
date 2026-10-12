import { Check } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { ContactForm } from "./contact-form";

/** Every page ends on the working contact form. */
export function ContactSection({
  lang,
  dict,
  defaultType,
  title,
}: {
  lang: Locale;
  dict: Dictionary;
  defaultType?: "client" | "agency" | "audit";
  title?: string;
}) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-border bg-bg-subtle">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-28">
        <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
          <h2 id="contact-title" className="text-3xl font-semibold sm:text-4xl">
            {title ?? dict.contact.title}
          </h2>
          <p className="max-w-[46ch] text-fg-muted">{dict.contact.lead}</p>
          <ul className="flex flex-col gap-2 text-sm">
            {[dict.cta.terminus, dict.cta.terminusSub, dict.brand.location].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-accent-text" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ContactForm lang={lang} copy={dict.contact.form} defaultType={defaultType} />
      </div>
    </section>
  );
}
