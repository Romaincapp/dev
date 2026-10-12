import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { lines } from "@/data/lines";
import { ContactForm } from "./contact-form";

/** The terminus every page ends on: the working contact form. */
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
    <section id="contact" aria-labelledby="contact-title" className="on-band relative overflow-hidden bg-band text-band-ink">
      {/* The three lines arrive at the terminus. */}
      <div aria-hidden className="absolute inset-x-0 top-0 flex flex-col gap-1">
        {lines.map((line) => (
          <span key={line.id} className="h-2.5" style={{ background: line.color }} />
        ))}
      </div>
      <div className="mx-auto grid max-w-[90rem] gap-10 px-4 pt-24 pb-20 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-10 lg:pt-32 lg:pb-28">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <h2 id="contact-title" className="text-[clamp(2.2rem,4.6vw,4rem)] font-black">
            {title ?? dict.contact.title}
          </h2>
          <p className="max-w-[46ch] text-lg text-band-ink-2">{dict.contact.lead}</p>
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-[0.95rem] font-semibold">
            <span className="size-2.5 rounded-full bg-line-3" aria-hidden />
            {dict.cta.terminus} — {dict.cta.terminusSub}
          </p>
        </div>
        <div className="text-ink">
          <ContactForm lang={lang} copy={dict.contact.form} defaultType={defaultType} />
        </div>
      </div>
    </section>
  );
}
