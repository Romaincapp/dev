import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, href } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternates } from "@/lib/metadata";
import { PageHero, SectionHeader } from "@/components/page-hero";
import { ContactSection } from "@/components/contact-section";
import { Steps } from "@/components/steps";
import { Terminal } from "@/components/terminal";

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

  return (
    <>
      <PageHero title={copy.title} lead={copy.lead} cta={copy.cta} ctaHref={`${href(lang, "audit")}#contact`} location="audit-hero">
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-fg-muted">{copy.toolsLabel}</span>
          {copy.tools.map((tool) => (
            <span key={tool} className="rounded-full border border-border bg-bg px-3 py-1 text-sm font-medium">
              {tool}
            </span>
          ))}
        </div>
      </PageHero>

      <section aria-labelledby="checks" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <SectionHeader id="checks" title={copy.checksTitle} intro={copy.checksIntro} />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start">
          <ul className="divide-y divide-border rounded-xl border border-border">
            {copy.checks.map((check) => (
              <li key={check.area} className="grid gap-2 p-5 sm:grid-cols-[7.5rem_1fr] sm:gap-5">
                <span className="h-fit w-fit rounded-md border border-border bg-bg-subtle px-2 py-0.5 text-xs font-medium text-fg-muted sm:mt-0.5">{check.area}</span>
                <p className="font-medium">{check.q}</p>
              </li>
            ))}
          </ul>
          <div className="lg:sticky lg:top-24">
            <Terminal copy={dict.home.terminal} />
          </div>
        </div>
      </section>

      <section aria-labelledby="offer" className="border-y border-border bg-bg-subtle">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <SectionHeader id="offer" title={copy.offerTitle} />
          <Steps steps={copy.offer} />
        </div>
      </section>

      <section aria-labelledby="promise" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader id="promise" title={copy.promiseTitle} />
            <p className="max-w-[52ch] text-lg text-fg-muted">{copy.promise}</p>
          </div>
          <div className="rounded-xl border border-accent/30 bg-accent-soft p-6 sm:p-8">
            <h3 className="text-xl font-semibold">{copy.proofTitle}</h3>
            <p className="mt-3">{copy.proof}</p>
          </div>
        </div>
      </section>

      <ContactSection lang={lang} dict={dict} defaultType="audit" title={copy.cta} />
    </>
  );
}
