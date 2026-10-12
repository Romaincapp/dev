import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { lines } from "@/data/lines";
import { alternates } from "@/lib/metadata";
import { ContactForm } from "@/components/contact-form";
import { LineBadge } from "@/components/line-badge";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.contact.pageTitle, description: dict.contact.pageLead, alternates: alternates(lang, "contact") };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <section className="on-band relative overflow-hidden bg-band text-band-ink">
      <div aria-hidden className="absolute inset-x-0 top-0 flex flex-col gap-1">
        {lines.map((line) => (
          <span key={line.id} className="h-2.5" style={{ background: line.color }} />
        ))}
      </div>
      <div className="mx-auto grid max-w-[90rem] gap-10 px-4 pt-20 pb-20 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-10 lg:pt-28 lg:pb-28">
        <div className="flex flex-col gap-6">
          <span className="flex gap-2" aria-hidden>
            {lines.map((line) => (
              <LineBadge key={line.id} line={line} size="lg" />
            ))}
          </span>
          <h1 className="text-[clamp(2.6rem,6vw,5rem)] font-black leading-[0.98] tracking-[-0.035em]">{dict.contact.pageTitle}</h1>
          <p className="max-w-[46ch] text-lg text-band-ink-2">{dict.contact.pageLead}</p>
          <p className="font-semibold">{dict.brand.location}</p>
        </div>
        <div className="text-ink">
          <ContactForm lang={lang} copy={dict.contact.form} />
        </div>
      </div>
    </section>
  );
}
