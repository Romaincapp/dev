import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { hasLocale, href, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projectBySlug, projects } from "@/data/projects";
import { audiences } from "@/data/audiences";
import { alternates } from "@/lib/metadata";
import { ProjectVisual, RepoMeta, StackTags } from "@/components/project-showcase";
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
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const hasPublicCode = project.links.some((link) => link.url.includes("github.com"));
  const audienceNames = project.audiences.map((id) => audiences.find((a) => a.id === id)!.name[lang]);

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-border">
          <div aria-hidden className="hero-grid absolute inset-0" />
          <div className="relative mx-auto max-w-6xl px-4 pt-8 pb-14 sm:px-6 lg:pb-20">
            <Link
              href={`${href(lang, "home")}#projects`}
              className="inline-flex min-h-10 items-center gap-1.5 text-sm text-fg-muted hover:text-fg"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {copy.backToProjects}
            </Link>
            <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="flex flex-col gap-5">
                <RepoMeta project={project} dict={dict} />
                <h1 className="text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">{project.name}</h1>
                <p className="max-w-[48ch] text-lg text-fg-muted sm:text-xl">{project.tagline[lang]}</p>
                {project.figure ? (
                  <p className="w-fit rounded-md bg-accent-soft px-2.5 py-1 text-sm font-medium text-accent-text tabular">
                    {project.figure[lang]}
                  </p>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-bg px-3 text-sm font-medium hover:bg-bg-muted"
                    >
                      {link.label[lang]}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  ))}
                </div>
              </div>
              <ProjectVisual project={project} lang={lang} />
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-20 lg:py-24">
          <div className="flex flex-col gap-12">
            <section aria-labelledby="context">
              <h2 id="context" className="text-2xl font-semibold">{copy.context}</h2>
              <p className="mt-3 max-w-[65ch] text-fg-muted">{project.context[lang]}</p>
            </section>
            <section aria-labelledby="challenge">
              <h2 id="challenge" className="text-2xl font-semibold">{copy.challenge}</h2>
              <p className="mt-3 max-w-[65ch] text-fg-muted">{project.challenge[lang]}</p>
            </section>
            <section aria-labelledby="solution">
              <h2 id="solution" className="text-2xl font-semibold">{copy.solution}</h2>
              <ul className="mt-5 grid gap-4">
                {project.solution.map((step) => (
                  <li key={step.fr} className="flex max-w-[65ch] gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-accent-text" aria-hidden />
                    <span>{step[lang]}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="result" className="rounded-xl border border-accent/30 bg-accent-soft p-6 sm:p-8">
              <h2 id="result" className="text-2xl font-semibold">{copy.result}</h2>
              <p className="mt-3 max-w-[60ch] text-lg">{project.result[lang]}</p>
            </section>
          </div>

          <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border p-5">
              <h2 className="text-sm font-semibold">{copy.stack}</h2>
              <div className="mt-3">
                <StackTags stack={project.stack} />
              </div>
              <h2 className="mt-6 text-sm font-semibold">{copy.audiences}</h2>
              <p className="mt-2 text-sm text-fg-muted">{audienceNames.join(" · ")}</p>
              {!hasPublicCode ? <p className="mt-6 text-sm text-fg-muted">{copy.privateCode}</p> : null}
            </div>
            {project.secondaryImage ? (
              <Image
                src={project.secondaryImage.src}
                alt={project.secondaryImage.alt[lang]}
                width={project.secondaryImage.width}
                height={project.secondaryImage.height}
                sizes="(min-width: 1024px) 22rem, 100vw"
                className="h-auto w-full rounded-xl border border-border"
              />
            ) : null}
          </aside>
        </div>

        {project.gallery?.length ? (
          <section aria-labelledby="gallery" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
            <h2 id="gallery" className="text-2xl font-semibold">{copy.gallery}</h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((image) => (
                <li key={image.src}>
                  <figure className="flex flex-col gap-3">
                    <a href={image.src} className="block aspect-[16/10] overflow-hidden rounded-xl border border-border bg-bg-subtle hover:border-border-strong">
                      <Image
                        src={image.src}
                        alt={image.alt[lang]}
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
                        className="size-full object-contain"
                      />
                    </a>
                    <figcaption className="text-sm text-fg-muted">{image.alt[lang]}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <nav aria-label={copy.next} className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <Link
            href={href(lang, "projects", next.slug)}
            className="group flex items-center gap-4 rounded-xl border border-border p-6 transition-colors hover:border-border-strong hover:bg-bg-subtle"
          >
            <span className="text-xl font-semibold sm:text-2xl">
              <span className="font-normal text-fg-muted">{copy.next}{lang === "fr" ? " : " : ": "}</span>
              <span className="group-hover:underline">{next.name}</span>
            </span>
            <ArrowRight className="ml-auto size-5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </nav>
      </article>

      <ContactSection lang={lang} dict={dict} title={dict.cta.similar} />
    </>
  );
}
