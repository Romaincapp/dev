import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import type { Project } from "@/data/projects";
import { lineById } from "@/data/lines";
import { cn } from "@/lib/utils";
import { LineBadge } from "./line-badge";

/** A project shown as a station plate on the home page. */
export function ProjectStation({
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
    <article
      className={cn(
        "plate grid overflow-hidden lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]",
        flip && "lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]",
      )}
    >
      <div className={cn("flex flex-col gap-5 p-6 sm:p-10", flip && "lg:order-2")}>
        <div className="flex items-center gap-2">
          {project.lines.map((id) => (
            <LineBadge key={id} line={lineById(id)} />
          ))}
          <span className="ml-2 font-mono text-sm text-ink-2">{project.code}</span>
        </div>
        <h3 className="text-[clamp(2rem,3.6vw,3.25rem)] font-black">
          <Link href={caseHref} className="decoration-line-3 decoration-4 hover:underline">
            {project.name}
          </Link>
        </h3>
        <p className="max-w-[52ch] text-lg text-ink-2">{project.tagline[lang]}</p>
        {project.figure ? (
          <p className="w-fit rounded-[8px] bg-line-3 px-3 py-1.5 text-[1.05rem] font-black text-ink tabular">
            {project.figure[lang]}
          </p>
        ) : null}
        <ul className="grid gap-2">
          {project.facts.map((fact) => (
            <li key={fact.fr} className="flex items-baseline gap-3">
              <span aria-hidden className="relative top-[0.1em] size-3 shrink-0 rounded-full border-[3px] border-ink bg-plate" />
              {fact[lang]}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
          <Link
            href={caseHref}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-band px-5 font-semibold text-band-ink transition-colors hover:bg-band-2"
          >
            {dict.home.caseStudy}
            <span className="sr-only">: {project.name}</span>
            <ArrowRight className="size-5" aria-hidden />
          </Link>
          {live ? (
            <a href={live.url} className="inline-flex items-center gap-1 font-semibold underline decoration-rule hover:decoration-ink">
              {live.label[lang]}
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
      <ProjectVisual project={project} lang={lang} className={cn(flip && "lg:order-1")} />
    </article>
  );
}

export function ProjectVisual({ project, lang, className }: { project: Project; lang: Locale; className?: string }) {
  const image = project.image;
  if (!image) {
    return <ScoreSheet className={className} />;
  }
  const portrait = image.height > image.width;
  return (
    <div
      className={cn(
        "relative min-h-72 overflow-hidden bg-band",
        portrait && "flex items-end justify-center bg-[#25301f] px-8 pt-10",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt[lang]}
        width={image.width}
        height={image.height}
        sizes="(min-width: 1024px) 45vw, 100vw"
        className={cn(
          portrait
            ? "h-auto max-h-[30rem] w-auto max-w-[16rem] rounded-t-[28px] shadow-[0_-10px_40px_-10px_rgb(0_0_0/0.5)]"
            : "absolute inset-0 h-full w-full object-cover",
        )}
      />
    </div>
  );
}

/** Typographic stand-in for the championship manager: a score sheet. */
function ScoreSheet({ className }: { className?: string }) {
  const rows = [
    ["1", "Division 1", "12", "3"],
    ["2", "Division 2", "10", "5"],
    ["3", "Division 3", "9", "6"],
    ["4", "Poule A", "8", "7"],
  ];
  return (
    <div aria-hidden className={cn("flex items-center justify-center bg-line-2 p-8 sm:p-12", className)}>
      <div className="w-full max-w-sm rotate-[-2deg] rounded-[10px] bg-plate p-5 font-mono text-sm text-ink shadow-[0_24px_50px_-24px_rgb(0_0_0/0.6)]">
        <div className="mb-3 flex justify-between border-b-2 border-ink pb-2 font-sans text-base font-black">
          <span>Classement</span>
          <span>J2</span>
        </div>
        <table className="w-full tabular">
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-rule last:border-0">
                <td className="py-2 pr-2 font-bold">{row[0]}</td>
                <td className="py-2">{row[1]}</td>
                <td className="py-2 text-right">{row[2]}</td>
                <td className="py-2 pl-3 text-right text-ink-2">{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
