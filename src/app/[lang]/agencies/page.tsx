import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { hasLocale, href } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternates } from "@/lib/metadata";
import { PageHero, SectionHeader } from "@/components/page-hero";
import { ContactSection } from "@/components/contact-section";
import { GithubIcon } from "@/components/icons";

export async function generateMetadata({ params }: PageProps<"/[lang]/agencies">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.agencies.metaTitle,
    description: dict.agencies.metaDescription,
    alternates: alternates(lang, "agencies"),
  };
}

export default async function AgenciesPage({ params }: PageProps<"/[lang]/agencies">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const copy = dict.agencies;

  return (
    <>
      <PageHero
        title={copy.title}
        lead={copy.lead}
        cta={copy.cta}
        ctaHref={`${href(lang, "agencies")}#contact`}
        location="agencies-hero"
      />

      <section aria-labelledby="stack" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <SectionHeader id="stack" title={copy.stackTitle} />
        <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {copy.stack.map((group) => (
            <div key={group.title} className="flex flex-col gap-3 bg-bg p-6">
              <dt className="font-semibold">{group.title}</dt>
              {group.items.map((item) => (
                <dd key={item} className="flex items-start gap-2 text-sm text-fg-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden />
                  {item}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="work" className="border-y border-border bg-bg-subtle">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <SectionHeader id="work" title={copy.workTitle} />
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {copy.work.map((item) => (
              <div key={item.title} className="flex flex-col gap-2 border-l border-border pl-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="max-w-[48ch] text-fg-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="terms" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader id="terms" title={copy.termsTitle} />
            <dl className="divide-y divide-border rounded-xl border border-border">
              {copy.terms.map((term) => (
                <div key={term.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-sm text-fg-muted">{term.label}</dt>
                  <dd className="font-medium">{term.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <SectionHeader id="code" title={copy.codeTitle} intro={copy.codeIntro} />
            <ul className="grid gap-3">
              {copy.code.map((repo) => (
                <li key={repo.url}>
                  <a
                    href={repo.url}
                    className="group flex items-start gap-4 rounded-xl border border-border p-5 transition-colors hover:border-border-strong hover:bg-bg-subtle"
                  >
                    <GithubIcon className="mt-0.5 size-5 shrink-0" />
                    <span className="flex flex-col gap-1">
                      <span className="font-semibold text-accent-text group-hover:underline">{repo.name}</span>
                      <span className="text-sm text-fg-muted">{repo.note}</span>
                    </span>
                    <ArrowUpRight className="ml-auto size-4 shrink-0 text-fg-muted" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContactSection lang={lang} dict={dict} defaultType="agency" title={copy.cta} />
    </>
  );
}
