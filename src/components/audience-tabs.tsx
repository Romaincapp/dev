"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeWindow } from "./window";

export type AudienceTab = {
  id: string;
  label: string;
  title: string;
  body: string;
  points: string[];
  cta: string;
  href: string;
  snippet: { title: string; lines: string[] };
};

/** Tab switcher between the three ways to work together. */
export function AudienceTabs({ tabs, label }: { tabs: AudienceTab[]; label: string }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = tabs.length - 1;
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={label} className="inline-flex max-w-full gap-1 overflow-x-auto rounded-lg border border-border bg-bg-subtle p-1">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[index] = el;
            }}
            role="tab"
            id={`${id}-tab-${tab.id}`}
            aria-selected={active === index}
            aria-controls={`${id}-panel-${tab.id}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "h-9 shrink-0 rounded-md px-4 text-sm font-medium whitespace-nowrap transition-colors",
              active === index ? "bg-bg text-fg shadow-sm ring-1 ring-border" : "text-fg-muted hover:text-fg",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${id}-panel-${tab.id}`}
          aria-labelledby={`${id}-tab-${tab.id}`}
          hidden={active !== index}
          className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
        >
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl font-semibold sm:text-3xl">{tab.title}</h3>
            <p className="max-w-[52ch] text-fg-muted">{tab.body}</p>
            <ul className="grid gap-2.5">
              {tab.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check className="mt-1 size-4 shrink-0 text-accent-text" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
            <Link href={tab.href} className="group mt-1 inline-flex w-fit items-center gap-1.5 font-medium text-accent-text hover:underline">
              {tab.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
          <CodeWindow title={tab.snippet.title} lines={tab.snippet.lines} />
        </div>
      ))}
    </div>
  );
}
