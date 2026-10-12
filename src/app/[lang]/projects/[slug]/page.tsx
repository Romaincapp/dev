import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { hasLocale, href, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projectBySlug, projects } from "@/data/projects";
import { lineById } from "@/data/lines";
import { alternates } from "@/lib/metadata";
import { LineBadge } from "@/components/line-badge";
import { ProjectVisual } from "@/components/project-station";
import { ContactSection } from "@/components/contact-section";

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((project) => ({ lang, slug: project.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = projectBySlug(slug);
  if (!hasLocale(lang) || !project) return {};
  return {
    title: project.name,
    description: project.tagline[lang],
    alternates: alternates(lang, "projects", slug),
    openGraph: project.image ? { images: [{ url: project.image.src }] } : undefined,
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  const project = projectBySlug(slug);
  if (!hasLocale(lang) || !project) notFound();
  const dict = getDictionary(lang);
  const copy = dict.project;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const githubLink = project.links.find((link) => link.url.includes("github.com"));
  const primaryLine = lineById(project.lines[0]);

  return (
    <>
      <article>
        <header className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-x-0 top-[8.25rem] flex -translate-y-1/2 flex-col gap-1">
            {project.lines.map((id) => (
              <span key={id} className="h-2.5" style={{ background: lineById(id).color }} />
            ))}
          </div>
          <div className="relative mx-auto max-w-[90rem] px-4 pt-8 pb-14 sm:px-6 lg:px-10">
            <Link
              href={`${href(lang, "home")}#projects`}
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-ink-2 hover:text-ink"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {copy.backToProjects}
            </Link>
            <div className="mt-6 flex w-fit items-center gap-3 rounded-full bg-paper py-1 pr-4">
              <span
                className="flex h-16 items-center rounded-full border-[6px] border-ink bg-plate px-5 font-mono text-xl font-bold"
                aria-hidden
              >
                {project.code}
              </span>
              <span className="sr-only">{copy.lines} :</span>
              {project.lines.map((id) => (
                <LineBadge key={id} line={lineById(id)} size="lg" />
              ))}
            </div>
            <h1 className="mt-10 text-[clamp(2.6rem,7vw,6rem)] font-black leading-[0.95] tracking-[-0.035em]">
              {project.name}
            </h1>
            <p className="mt-6 max-w-[48ch] text-xl text-ink-2 sm:text-2xl">{project.tagline[lang]}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.figure ? (
                <p className="rounded-[8px] bg-line-3 px-3 py-1.5 text-lg font-black tabular">{project.figure[lang]}</p>
              ) : null}
              {project.links
                .filter((link) => !link.url.includes("github.com"))
                .map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    className="inline-flex h-11 items-center gap-1.5 rounded-full bg-plate px-4 font-semibold shadow-[inset_0_0_0_1.5px_var(--rule)] hover:shadow-[inset_0_0_0_2px_var(--ink)]"
                  >
                    {link.label[lang]}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                ))}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
          <div className="plate overflow-hidden">
            <ProjectVisual project={project} lang={lang} className="min-h-80 lg:min-h-[32rem]" />
          </div>
        </div>

        <div className="mx-auto grid max-w-[90rem] gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20 lg:px-10 lg:py-28">
          <div className="flex flex-col gap-14">
            <section aria-labelledby="context">
              <h2 id="context" className="text-3xl font-black">{copy.context}</h2>
              <p className="mt-4 max-w-[62ch] text-lg leading-relaxed">{project.context[lang]}</p>
            </section>
            <section aria-labelledby="challenge">
              <h2 id="challenge" className="text-3xl font-black">{copy.challenge}</h2>
              <p className="mt-4 max-w-[62ch] text-lg leading-relaxed">{project.challenge[lang]}</p>
            </section>
            <section aria-labelledby="solution">
              <h2 id="solution" className="text-3xl font-black">{copy.solution}</h2>
              <ol className="relative mt-6 grid gap-6 pl-10">
                <span aria-hidden className="absolute top-2 bottom-2 left-[9px] w-2 rounded-full" style={{ background: primaryLine.color }} />
                {project.solution.map((step) => (
                  <li key={step.fr} className="relative max-w-[62ch] text-lg leading-relaxed">
                    <span aria-hidden className="absolute top-[0.35em] -left-10 size-[26px] rounded-full border-[5px] border-ink bg-plate" />
                    {step[lang]}
                  </li>
                ))}
              </ol>
            </section>
            <section aria-labelledby="result" className="rounded-[var(--radius-plate)] bg-band p-6 text-band-ink sm:p-10">
              <h2 id="result" className="text-3xl font-black">{copy.result}</h2>
              <p className="mt-4 max-w-[56ch] text-xl leading-relaxed">{project.result[lang]}</p>
            </section>
          </div>

          <aside className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
            <div>
              <h2 className="text-xl font-black">{copy.stack}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="rounded-full bg-plate px-3 py-1.5 text-[0.95rem] font-semibold shadow-[inset_0_0_0_1.5px_var(--rule)]">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-black">{copy.links}</h2>
              <ul className="mt-4 grid gap-2">
                {project.links.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} className="inline-flex min-h-10 items-center gap-1.5 font-semibold underline decoration-rule decoration-2 hover:decoration-ink">
                      {link.label[lang]}
                      <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
              {!githubLink ? <p className="mt-3 text-ink-2">{copy.privateCode}</p> : null}
            </div>
            {project.secondaryImage ? (
              <Image
                src={project.secondaryImage.src}
                alt={project.secondaryImage.alt[lang]}
                width={project.secondaryImage.width}
                height={project.secondaryImage.height}
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="plate h-auto w-full max-w-sm"
              />
            ) : null}
          </aside>
        </div>

        <nav aria-label={copy.next} className="mx-auto max-w-[90rem] px-4 pb-20 sm:px-6 lg:px-10">
          <Link
            href={href(lang, "projects", next.slug)}
            className="plate group flex items-center gap-5 p-6 transition-transform duration-300 ease-(--ease-signal) hover:-translate-y-0.5 sm:p-8"
          >
            <span className="text-[clamp(1.6rem,3vw,2.5rem)] font-black leading-tight">
              <span className="font-semibold text-ink-2">{copy.next} : </span>
              <span className="group-hover:underline">{next.name}</span>
            </span>
            <ArrowRight className="ml-auto size-8 shrink-0 transition-transform duration-300 ease-(--ease-signal) group-hover:translate-x-1" aria-hidden />
          </Link>
        </nav>
      </article>

      <ContactSection lang={lang} dict={dict} title={dict.cta.similar} />
    </>
  );
}
