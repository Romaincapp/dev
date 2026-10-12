import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projects } from "@/data/projects";
import { lines } from "@/data/lines";
import { alternates } from "@/lib/metadata";
import { NetworkMap } from "@/components/network-map";
import { ProjectStation } from "@/components/project-station";
import { ContactSection } from "@/components/contact-section";
import { LineBadge } from "@/components/line-badge";
import { TrackedLink } from "@/components/tracked-link";
import { lineHref } from "@/lib/links";
import { MethodLine } from "@/components/method-line";
import { href } from "@/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { alternates: alternates(lang, "home") };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <section aria-labelledby="hero-title" className="mx-auto max-w-[90rem] px-4 pt-10 pb-16 sm:px-6 lg:px-10 lg:pt-14 lg:pb-20">
        <div className="mb-10 grid gap-6 lg:mb-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-end lg:gap-12">
          <h1 id="hero-title" className="text-[clamp(2.6rem,6.4vw,5.75rem)] font-black leading-[0.98] tracking-[-0.035em]">
            {dict.home.title}
          </h1>
          <div className="flex flex-col gap-4 lg:pb-2">
            <p className="max-w-[44ch] text-lg text-ink-2">{dict.home.lead}</p>
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-plate px-4 py-2 text-[0.95rem] font-semibold shadow-[inset_0_0_0_1.5px_var(--rule)]">
              <span aria-hidden className="size-2.5 rounded-full bg-line-1" />
              {dict.brand.location}
            </p>
          </div>
        </div>
        <NetworkMap
          lang={lang}
          copy={{
            mapLabel: dict.home.mapLabel,
            chooseLine: dict.home.chooseLine,
            terminus: dict.cta.terminus,
            terminusSub: dict.cta.terminusSub,
            contact: dict.cta.contact,
          }}
        />
      </section>

      <section id="projects" aria-labelledby="projects-title" className="relative">
        <div className="mx-auto max-w-[90rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div className="mb-12 flex flex-col gap-4 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="projects-title" className="text-[clamp(2.2rem,4.6vw,4rem)] font-black">
              {dict.home.projectsTitle}
            </h2>
            <p className="max-w-[48ch] text-lg text-ink-2">{dict.home.projectsIntro}</p>
          </div>
          <div className="grid gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <ProjectStation key={project.slug} project={project} lang={lang} dict={dict} flip={index % 2 === 1} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <TrackedLink
              href={href(lang, "contact")}
              location="after-projects"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-line-3 px-7 text-lg font-bold text-ink transition-colors hover:bg-[#ffc824]"
            >
              {dict.cta.similar}
              <ArrowRight className="size-5" aria-hidden />
            </TrackedLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="lines-title" className="bg-plate">
        <div className="mx-auto max-w-[90rem] px-4 pt-20 pb-12 sm:px-6 lg:px-10 lg:pt-28">
          <h2 id="lines-title" className="text-[clamp(2.2rem,4.6vw,4rem)] font-black">
            {dict.home.linesTitle}
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg text-ink-2">{dict.home.linesIntro}</p>
        </div>
        {lines.map((line) => {
          const copy = dict.home.lines[line.id];
          const target = line.id === "clients" ? href(lang, "contact") : lineHref(lang, line.route);
          return (
            <div key={line.id} style={{ background: line.color, color: line.onColor }}>
              <div className="mx-auto grid max-w-[90rem] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[auto_minmax(0,6fr)_minmax(0,5fr)] lg:items-start lg:gap-14 lg:px-10 lg:py-20">
                <LineBadge line={line} size="xl" className="shadow-[0_0_0_6px_var(--plate)]" />
                <div className="flex flex-col gap-4">
                  <h3 className="text-[clamp(1.8rem,3.2vw,2.75rem)] font-black">{copy.title}</h3>
                  <p className="max-w-[50ch] text-lg">{copy.body}</p>
                  <Link
                    href={target}
                    className="mt-2 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-plate px-6 font-bold text-ink transition-transform duration-300 ease-(--ease-signal) hover:-translate-y-0.5"
                  >
                    {copy.cta}
                    <ArrowRight className="size-5" aria-hidden />
                  </Link>
                </div>
                <ul className="grid gap-3 text-lg font-semibold">
                  {copy.points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <span aria-hidden className="size-4 shrink-0 rounded-full border-4 bg-plate" style={{ borderColor: "currentColor" }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </section>

      <section aria-labelledby="method-title" className="mx-auto max-w-[90rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <h2 id="method-title" className="mb-12 text-[clamp(2.2rem,4.6vw,4rem)] font-black lg:mb-16">
          {dict.home.methodTitle}
        </h2>
        <MethodLine steps={dict.home.methodSteps} />
      </section>

      <ContactSection lang={lang} dict={dict} />
    </>
  );
}
