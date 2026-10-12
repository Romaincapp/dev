import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { TrackedLink } from "./tracked-link";

/** Opening of an inner page. */
export function PageHero({
  title,
  lead,
  cta,
  ctaHref,
  location,
  children,
}: {
  title: string;
  lead: string;
  cta: string;
  ctaHref: string;
  location: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="hero-grid absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-16 sm:px-6 lg:pt-24 lg:pb-20">
        <h1 className="max-w-[20ch] text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-[60ch] text-lg text-fg-muted">{lead}</p>
        {children}
        <Button asChild size="lg" className="mt-10">
          <TrackedLink href={ctaHref} location={location}>
            {cta}
            <ArrowRight aria-hidden />
          </TrackedLink>
        </Button>
      </div>
    </section>
  );
}

/** Section title with optional intro. */
export function SectionHeader({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <div className="mb-10 flex flex-col gap-3 lg:mb-14">
      <h2 id={id} className="text-3xl font-semibold sm:text-4xl">
        {title}
      </h2>
      {intro ? <p className="max-w-[60ch] text-lg text-fg-muted">{intro}</p> : null}
    </div>
  );
}
