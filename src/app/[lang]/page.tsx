import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { hasLocale, href } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projects } from "@/data/projects";
import { audiences } from "@/data/audiences";
import { alternates } from "@/lib/metadata";
import { audienceHref } from "@/lib/links";
import { Terminal } from "@/components/terminal";
import { AudienceTabs } from "@/components/audience-tabs";
import { ProjectShowcase } from "@/components/project-showcase";
import { SectionHeader } from "@/components/page-hero";
import { Steps } from "@/components/steps";
import { ContactSection } from "@/components/contact-section";
import { TrackedLink } from "@/components/tracked-link";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { alternates: alternates(lang, "home") };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const contactHref = href(lang, "contact");

  const tabs = audiences.map((audience) => {
    const copy = dict.home.audiences[audience.id];
    return {
      id: audience.id,
      label: audience.name[lang],
      title: copy.title,
      body: copy.body,
      points: copy.points,
      cta: copy.cta,
      href: audience.id === "clients" ? contactHref : audienceHref(lang, audience.route),
      snippet: copy.snippet,
    };
  });

  return (
    <>
      <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="hero-grid absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:pt-24 lg:pb-28">
          <div className="flex flex-col gap-6">
            <h1 id="hero-title" className="text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[4.1rem]">
              {dict.home.title}
            </h1>
            <p className="max-w-[48ch] text-lg text-fg-muted">{dict.home.lead}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <TrackedLink href={contactHref} location="hero">
                  {dict.cta.contact}
                  <ArrowRight aria-hidden />
                </TrackedLink>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="#projects">{dict.home.seeProjects}</a>
              </Button>
            </div>
            <p className="text-sm text-fg-muted">{dict.brand.location}</p>
          </div>
          <Terminal copy={dict.home.terminal} />
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeader id="projects-title" title={dict.home.projectsTitle} intro={dict.home.projectsIntro} />
        <div className="grid gap-20 lg:gap-28">
          {projects.map((project, index) => (
            <ProjectShowcase key={project.slug} project={project} lang={lang} dict={dict} flip={index % 2 === 1} />
          ))}
        </div>
        <div className="mt-20 flex flex-col items-center gap-4 rounded-xl border border-border bg-bg-subtle px-6 py-10 text-center">
          <p className="text-xl font-semibold">{dict.cta.similar}</p>
          <p className="text-fg-muted">
            {dict.cta.terminus} · {dict.cta.terminusSub}
          </p>
          <Button asChild>
            <TrackedLink href={contactHref} location="after-projects">
              {dict.cta.contact}
              <ArrowRight aria-hidden />
            </TrackedLink>
          </Button>
        </div>
      </section>

      <section aria-labelledby="audiences-title" className="border-y border-border bg-bg-subtle">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <SectionHeader id="audiences-title" title={dict.home.audiencesTitle} intro={dict.home.audiencesIntro} />
          <AudienceTabs tabs={tabs} label={dict.home.audiencesTitle} />
        </div>
      </section>

      <section aria-labelledby="method-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeader id="method-title" title={dict.home.methodTitle} />
        <Steps steps={dict.home.methodSteps} />
      </section>

      <ContactSection lang={lang} dict={dict} />
    </>
  );
}
