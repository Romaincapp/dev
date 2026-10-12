import { ArrowRight } from "lucide-react";
import type { Line } from "@/data/lines";
import { LineBadge } from "./line-badge";
import { TrackedLink } from "./tracked-link";

/** Opening of a line page: the line enters from the left like a platform sign. */
export function LineHero({
  line,
  title,
  lead,
  cta,
  ctaHref,
  location,
  children,
}: {
  line: Line;
  title: string;
  lead: string;
  cta: string;
  ctaHref: string;
  location: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-[5.5rem] h-4" style={{ background: line.color }} />
      <div className="relative mx-auto max-w-[90rem] px-4 pt-14 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <div className="flex items-center gap-4">
          <LineBadge line={line} size="xl" className="shadow-[0_0_0_8px_var(--paper)]" />
        </div>
        <h1 className="mt-10 max-w-[18ch] text-[clamp(2.5rem,6vw,5.25rem)] font-black leading-[0.98] tracking-[-0.035em]">
          {title}
        </h1>
        <p className="mt-6 max-w-[56ch] text-xl text-ink-2">{lead}</p>
        {children}
        <TrackedLink
          href={ctaHref}
          location={location}
          className="mt-10 inline-flex h-14 items-center gap-2 rounded-full bg-band px-7 text-lg font-bold text-band-ink transition-colors hover:bg-band-2"
        >
          {cta}
          <ArrowRight className="size-5" aria-hidden />
        </TrackedLink>
      </div>
    </section>
  );
}

/** A section run along the line's rail, with a station marker on its heading. */
export function RailSection({
  line,
  id,
  title,
  intro,
  children,
  tone = "paper",
}: {
  line: Line;
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  tone?: "paper" | "plate";
}) {
  return (
    <section aria-labelledby={id} className={tone === "plate" ? "bg-plate" : undefined}>
      <div className="relative mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="relative pl-12 sm:pl-16">
          <span aria-hidden className="absolute top-0 -bottom-16 left-[11px] w-2.5 rounded-full sm:left-[15px] lg:-bottom-24" style={{ background: line.color }} />
          <span
            aria-hidden
            className="absolute top-[0.2em] left-0 size-8 rounded-full border-[6px] border-ink bg-plate sm:size-10"
          />
          <h2 id={id} className="text-[clamp(2rem,4vw,3.25rem)] font-black">
            {title}
          </h2>
          {intro ? <p className="mt-4 max-w-[56ch] text-lg text-ink-2">{intro}</p> : null}
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </section>
  );
}
