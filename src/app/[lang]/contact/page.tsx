import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternates } from "@/lib/metadata";
import { ContactForm } from "@/components/contact-form";

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
    <section className="relative overflow-hidden">
      <div aria-hidden className="hero-grid absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{dict.contact.pageTitle}</h1>
          <p className="max-w-[46ch] text-lg text-fg-muted">{dict.contact.pageLead}</p>
          <ul className="flex flex-col gap-2 text-sm">
            {[dict.cta.terminus, dict.cta.terminusSub, dict.brand.location].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-accent-text" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ContactForm lang={lang} copy={dict.contact.form} />
      </div>
    </section>
  );
}
