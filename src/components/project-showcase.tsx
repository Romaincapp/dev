import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Lock } from "lucide-react";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./icons";
import { CodeWindow, WindowChrome } from "./window";

const languageColor = { TypeScript: "#3178c6", JavaScript: "#f1e05a" } as const;

/** GitHub-style metadata: visibility, language. */
export function RepoMeta({ project, dict }: { project: Project; dict: Dictionary }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-fg-muted">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 font-medium">
        {project.visibility === "private" ? <Lock className="size-3" aria-hidden /> : <GithubIcon className="size-3" />}
        {project.visibility === "private" ? dict.project.private : dict.project.public}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span aria-hidden className="size-3 rounded-full" style={{ background: languageColor[project.language] }} />
        {project.language}
      </span>
    </div>
  );
}

/** A project row on the home page: copy on one side, the product on the other. */
export function ProjectShowcase({
  project,
  lang,
  dict,
  flip,
}: {
  project: Project;
  lang: Locale;
  dict: Dictionary;
  flip?: boolean;
}) {
  const live = project.links.find((link) => !link.url.includes("github.com"));
  const caseHref = href(lang, "projects", project.slug);

  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={cn("flex flex-col gap-5", flip && "lg:order-2")}>
        <RepoMeta project={project} dict={dict} />
        <h3 className="text-3xl font-semibold sm:text-4xl">
          <Link href={caseHref} className="hover:underline hover:decoration-2">
            {project.name}
          </Link>
        </h3>
        <p className="max-w-[50ch] text-lg text-fg-muted">{project.tagline[lang]}</p>
        {project.figure ? (
          <p className="w-fit rounded-md bg-accent-soft px-2.5 py-1 text-sm font-medium text-accent-text tabular">
            {project.figure[lang]}
          </p>
        ) : null}
        <ul className="grid gap-2 text-base">
          {project.facts.map((fact) => (
            <li key={fact.fr} className="flex items-start gap-2.5">
              <Check className="mt-1 size-4 shrink-0 text-accent-text" aria-hidden />
              {fact[lang]}
            </li>
          ))}
        </ul>
        <StackTags stack={project.stack} />
        <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href={caseHref}
            className="group inline-flex items-center gap-1.5 font-medium text-accent-text hover:underline"
          >
            {dict.home.caseStudy}
            <span className="sr-only">: {project.name}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          {live ? (
            <a href={live.url} className="inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg">
              {live.label[lang]}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
      <ProjectVisual project={project} lang={lang} className={cn(flip && "lg:order-1")} />
    </article>
  );
}

export function StackTags({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {stack.map((tech) => (
        <li key={tech} className="rounded-md border border-border bg-bg-subtle px-2 py-0.5 font-mono text-xs text-fg-muted">
          {tech}
        </li>
      ))}
    </ul>
  );
}

/** The product, framed as a browser window (or a phone for portrait shots). */
export function ProjectVisual({ project, lang, className }: { project: Project; lang: Locale; className?: string }) {
  const image = project.image;
  const domain = project.links.find((link) => !link.url.includes("github.com"))?.url.replace(/^https?:\/\//, "");

  if (!image) {
    return (
      <CodeWindow
        className={className}
        title="championnat.json"
        lines={[
          "{",
          '  "championshipName": "Pétanque G1 J2",',
          '  "currentDay": 2,',
          '  "config": { "numberOfDivisions": 3, "numberOfCourts": 4 },',
          '  "days": {',
          '    "1": { "dayType": "championship", "matches": […] },',
          '    "2": { "dayType": "chrono", "series": […] }',
          "  }",
          "}",
        ]}
      />
    );
  }

  if (image.height > image.width) {
    return (
      <div className={cn("flex justify-center rounded-xl border border-border bg-bg-subtle px-6 pt-10", className)}>
        <Image
          src={image.src}
          alt={image.alt[lang]}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 18rem, 70vw"
          className="h-auto max-h-[28rem] w-auto max-w-[15rem] rounded-t-[1.75rem] border-x-[6px] border-t-[6px] border-fg/90 object-cover object-top"
        />
      </div>
    );
  }

  return (
    <WindowChrome title={domain ?? project.name} className={className}>
      <Image
        src={image.src}
        alt={image.alt[lang]}
        width={image.width}
        height={image.height}
        sizes="(min-width: 1024px) 34rem, 100vw"
        className="aspect-[16/10] h-auto w-full object-cover"
      />
    </WindowChrome>
  );
}
