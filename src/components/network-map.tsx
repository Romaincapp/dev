"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/config";
import { lines, type LineId } from "@/data/lines";
import { projects } from "@/data/projects";
import { LineBadge } from "./line-badge";
import { TrackedLink } from "./tracked-link";
import { lineHref } from "@/lib/links";

/*
 * Desktop map geometry, in viewBox units (1280 × 400).
 * Lines leave their origin plate on the left, cross the project
 * stations and converge on the terminus plate on the right.
 */
const VB = { w: 1280, h: 400 };
const ORIGIN_RIGHT = 250;
const TERMINUS_LEFT = 1010;
const lineY: Record<LineId, number> = { clients: 80, agencies: 200, audit: 320 };

const paths: Record<LineId, string> = {
  clients: `M${ORIGIN_RIGHT} 80 H860 L964 184 H${TERMINUS_LEFT}`,
  agencies: `M${ORIGIN_RIGHT} 200 H${TERMINUS_LEFT}`,
  audit: `M${ORIGIN_RIGHT} 320 H860 L964 216 H${TERMINUS_LEFT}`,
};

/** Station x position per project; a station spans every line the project serves. */
const stationX: Record<string, number> = {
  "camping-du-wignet": 352,
  "gestionnaire-de-championnats": 520,
  dandyshoes: 660,
  welcomeapp: 800,
};

const shortName: Record<string, Record<Locale, string>> = {
  "camping-du-wignet": { fr: "Camping du Wignet", en: "Camping du Wignet" },
  "gestionnaire-de-championnats": { fr: "Championnats", en: "Championships" },
  dandyshoes: { fr: "Dandyshoes", en: "Dandyshoes" },
  welcomeapp: { fr: "WelcomeApp", en: "WelcomeApp" },
};

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

type Copy = {
  mapLabel: string;
  chooseLine: string;
  terminus: string;
  terminusSub: string;
  contact: string;
};

export function NetworkMap({ lang, copy }: { lang: Locale; copy: Copy }) {
  const [active, setActive] = useState<LineId | null>(null);
  const contactHref = href(lang, "contact");

  const lineEvents = (id: LineId) => ({
    onMouseEnter: () => setActive(id),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(id),
    onBlur: () => setActive(null),
  });

  return (
    <>
      {/* Desktop: the full network map */}
      <div
        className="network relative hidden lg:block"
        data-active={active ?? undefined}
        style={{ aspectRatio: `${VB.w} / ${VB.h}` }}
      >
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          role="group"
          aria-label={copy.mapLabel}
        >
          {lines.map((line) => (
            <g key={line.id} data-line={line.id} {...lineEvents(line.id)}>
              <path
                data-line-path
                d={paths[line.id]}
                fill="none"
                stroke={line.color}
                strokeWidth={14}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ))}

          {projects.map((project) => {
            const x = stationX[project.slug];
            const ys = project.lines.map((id) => lineY[id]);
            const top = Math.min(...ys);
            const bottom = Math.max(...ys);
            const label = shortName[project.slug][lang];
            return (
              <Link key={project.slug} href={href(lang, "projects", project.slug)} className="group">
                <title>{project.name}</title>
                {top === bottom ? (
                  <circle cx={x} cy={top} r={12} fill="var(--plate)" stroke="var(--ink)" strokeWidth={5} />
                ) : (
                  <rect
                    x={x - 13}
                    y={top - 13}
                    width={26}
                    height={bottom - top + 26}
                    rx={13}
                    fill="var(--plate)"
                    stroke="var(--ink)"
                    strokeWidth={5}
                  />
                )}
                <text
                  x={x}
                  y={top - 30}
                  textAnchor="middle"
                  className="fill-ink text-[17px] font-bold group-hover:underline"
                  style={{ textDecorationThickness: 2 }}
                >
                  {label}
                </text>
              </Link>
            );
          })}

          {/* One orchestrated moment: a train runs each line to the terminus. */}
          {lines.map((line, index) => (
            <circle key={line.id} className="train" r={7} fill="var(--plate)" stroke={line.color} strokeWidth={4} opacity={0}>
              <animateMotion
                dur="2.4s"
                begin={`${0.3 + index * 0.35}s`}
                fill="freeze"
                path={paths[line.id]}
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.16 1 0.3 1"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.06;0.9;1"
                dur="2.4s"
                begin={`${0.3 + index * 0.35}s`}
                fill="freeze"
              />
            </circle>
          ))}
        </svg>

        <p className="sr-only">{copy.chooseLine}</p>
        <ul className="contents">
          {lines.map((line) => (
            <li
              key={line.id}
              className="absolute left-0 -translate-y-1/2"
              style={{ top: pct(lineY[line.id], VB.h), width: pct(ORIGIN_RIGHT + 6, VB.w) }}
            >
              <Link
                href={lineHref(lang, line.route)}
                {...lineEvents(line.id)}
                className="plate group flex min-h-16 items-center gap-3 py-3 pr-4 pl-3 font-bold leading-tight transition-transform duration-300 ease-(--ease-signal) hover:-translate-y-0.5"
              >
                <LineBadge line={line} size="lg" />
                <span className="flex flex-col">
                  <span className="text-[1.05rem]">{line.origin[lang]}</span>
                  <span className="text-sm font-semibold text-ink-2">{line.name[lang]}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="absolute right-0 -translate-y-1/2"
          style={{ top: pct(200, VB.h), left: pct(TERMINUS_LEFT - 4, VB.w) }}
        >
          <TrackedLink
            href={contactHref}
            location="hero-terminus"
            className="group flex flex-col gap-3 rounded-[var(--radius-plate)] bg-band p-5 text-band-ink shadow-[0_18px_40px_-20px_rgb(14_33_64/0.7)] transition-transform duration-300 ease-(--ease-signal) hover:-translate-y-0.5"
          >
            <span className="flex gap-1.5" aria-hidden>
              {lines.map((line) => (
                <LineBadge key={line.id} line={line} size="sm" />
              ))}
            </span>
            <span className="text-[1.55rem] font-black leading-[1.05] tracking-[-0.02em]">{copy.terminus}</span>
            <span className="text-sm text-band-ink-2">{copy.terminusSub}</span>
            <span className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-line-3 px-5 font-bold text-ink transition-colors group-hover:bg-[#ffc824]">
              {copy.contact}
              <ArrowRight className="size-5 transition-transform duration-300 ease-(--ease-signal) group-hover:translate-x-1" aria-hidden />
            </span>
          </TrackedLink>
        </div>
      </div>

      {/* Mobile and tablet: three parallel lines descending to the terminus */}
      <div className="lg:hidden">
        <p className="mb-4 font-bold text-ink-2">{copy.chooseLine}</p>
        <div className="relative">
          <svg className="absolute top-0 left-0 h-full w-[5.5rem]" aria-hidden>
            {lines.map((line, i) => {
              const x = 18 + i * 16;
              const y = 40 + i * 96;
              return (
                <g key={line.id}>
                  <line x1={x} y1={y} x2={x} y2="100%" stroke={line.color} strokeWidth={10} strokeLinecap="round" />
                  <line x1={x} y1={y} x2={88} y2={y} stroke={line.color} strokeWidth={10} strokeLinecap="round" />
                </g>
              );
            })}
          </svg>
          <ul className="flex flex-col gap-4 pl-[5.5rem]">
            {lines.map((line) => (
              <li key={line.id}>
                <Link
                  href={lineHref(lang, line.route)}
                  className="plate flex min-h-20 items-center gap-3 px-4 py-3 font-bold leading-tight"
                >
                  <LineBadge line={line} size="lg" />
                  <span className="flex flex-col">
                    <span>{line.origin[lang]}</span>
                    <span className="text-sm font-semibold text-ink-2">{line.name[lang]}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="h-8" />
        </div>
        <TrackedLink
          href={contactHref}
          location="hero-terminus-mobile"
          className="relative z-10 flex flex-col gap-2 rounded-[var(--radius-plate)] bg-band p-5 text-band-ink"
        >
          <span className="text-2xl font-black leading-tight tracking-[-0.02em]">{copy.terminus}</span>
          <span className="text-sm text-band-ink-2">{copy.terminusSub}</span>
          <span className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-line-3 px-5 font-bold text-ink">
            {copy.contact}
            <ArrowRight className="size-5" aria-hidden />
          </span>
        </TrackedLink>
      </div>
    </>
  );
}
