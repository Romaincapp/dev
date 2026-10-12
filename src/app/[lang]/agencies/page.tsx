import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { hasLocale, href } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { lineById } from "@/data/lines";
import { alternates } from "@/lib/metadata";
import { LineHero, RailSection } from "@/components/line-page";
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
  const line = lineById("agencies");

  return (
    <>
      <LineHero
        line={line}
        title={copy.title}
        lead={copy.lead}
        cta={copy.cta}
        ctaHref={`${href(lang, "agencies")}#contact`}
        location="agencies-hero"
      />

      <RailSection line={line} id="stack" title={copy.stackTitle} tone="plate">
        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {copy.stack.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <dt className="border-b-4 border-line-2 pb-2 text-xl font-black">{group.title}</dt>
              {group.items.map((item) => (
                <dd key={item} className="text-[1.05rem]">
                  {item}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      </RailSection>

      <RailSection line={line} id="work" title={copy.workTitle}>
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {copy.work.map((item) => (
            <div key={item.title} className="flex flex-col gap-2">
              <h3 className="text-2xl font-black">{item.title}</h3>
              <p className="max-w-[48ch] text-ink-2">{item.body}</p>
            </div>
          ))}
        </div>
      </RailSection>

      <RailSection line={line} id="terms" title={copy.termsTitle} tone="plate">
        <dl className="divide-y-2 divide-rule border-y-2 border-rule">
          {copy.terms.map((term) => (
            <div key={term.label} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
              <dt className="font-semibold text-ink-2 sm:pt-1">{term.label}</dt>
              <dd className="text-xl font-semibold">{term.value}</dd>
            </div>
          ))}
        </dl>
      </RailSection>

      <RailSection line={line} id="code" title={copy.codeTitle} intro={copy.codeIntro}>
        <ul className="grid gap-4">
          {copy.code.map((repo) => (
            <li key={repo.url}>
              <a
                href={repo.url}
                className="plate group flex items-center gap-4 p-5 transition-transform duration-300 ease-(--ease-signal) hover:-translate-y-0.5 sm:p-6"
              >
                <GithubIcon className="size-7 shrink-0" />
                <span className="flex flex-col">
                  <span className="text-xl font-black group-hover:underline">{repo.name}</span>
                  <span className="text-ink-2">{repo.note}</span>
                </span>
                <ArrowUpRight className="ml-auto size-6 shrink-0" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </RailSection>

      <ContactSection lang={lang} dict={dict} defaultType="agency" title={copy.cta} />
    </>
  );
}
