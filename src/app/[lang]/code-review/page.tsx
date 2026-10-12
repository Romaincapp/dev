import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, href } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { lineById } from "@/data/lines";
import { alternates } from "@/lib/metadata";
import { LineHero, RailSection } from "@/components/line-page";
import { ContactSection } from "@/components/contact-section";
import { MethodLine } from "@/components/method-line";

export async function generateMetadata({ params }: PageProps<"/[lang]/code-review">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.audit.metaTitle,
    description: dict.audit.metaDescription,
    alternates: alternates(lang, "audit"),
  };
}

export default async function AuditPage({ params }: PageProps<"/[lang]/code-review">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const copy = dict.audit;
  const line = lineById("audit");

  return (
    <>
      <LineHero
        line={line}
        title={copy.title}
        lead={copy.lead}
        cta={copy.cta}
        ctaHref={`${href(lang, "audit")}#contact`}
        location="audit-hero"
      >
        <div className="mt-8 flex flex-col gap-3">
          <p className="font-semibold text-ink-2">{copy.toolsLabel}</p>
          <ul className="flex flex-wrap gap-2">
            {copy.tools.map((tool) => (
              <li key={tool} className="rounded-full bg-plate px-4 py-2 font-semibold shadow-[inset_0_0_0_1.5px_var(--rule)]">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </LineHero>

      <RailSection line={line} id="checks" title={copy.checksTitle} intro={copy.checksIntro} tone="plate">
        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-plate)] bg-rule md:grid-cols-2">
          {copy.checks.map((check) => (
            <li key={check.area} className="flex flex-col gap-3 bg-plate p-6 sm:p-8">
              <span className="w-fit rounded-[6px] bg-line-3 px-2.5 py-1 text-sm font-bold text-ink">
                {check.area}
              </span>
              <p className="text-xl font-semibold leading-snug">{check.q}</p>
            </li>
          ))}
        </ul>
      </RailSection>

      <RailSection line={line} id="offer" title={copy.offerTitle}>
        <MethodLine steps={copy.offer} />
      </RailSection>

      <RailSection line={line} id="promise" title={copy.promiseTitle} tone="plate">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <p className="max-w-[48ch] text-xl leading-relaxed">{copy.promise}</p>
          <div className="rounded-[var(--radius-plate)] bg-band p-6 text-band-ink sm:p-8">
            <h3 className="text-2xl font-black">{copy.proofTitle}</h3>
            <p className="mt-3 text-band-ink-2">{copy.proof}</p>
          </div>
        </div>
      </RailSection>

      <ContactSection lang={lang} dict={dict} defaultType="audit" title={copy.cta} />
    </>
  );
}
