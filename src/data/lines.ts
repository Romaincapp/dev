import type { Locale, RouteKey } from "@/i18n/config";

export type LineId = "clients" | "agencies" | "audit";

export type Line = {
  id: LineId;
  /** Number shown in the roundel, like a metro line. */
  number: string;
  /** CSS custom property holding the line colour. */
  color: string;
  /** Text colour that reads on the line colour. */
  onColor: string;
  route: RouteKey;
  /** Contact form request type preselected from this line. */
  requestType: "client" | "agency" | "audit";
  name: Record<Locale, string>;
  origin: Record<Locale, string>;
};

export const lines: Line[] = [
  {
    id: "clients",
    number: "1",
    color: "var(--line-1)",
    onColor: "#ffffff",
    route: "home",
    requestType: "client",
    name: { fr: "Clients", en: "Clients" },
    origin: { fr: "J'ai un projet", en: "I have a project" },
  },
  {
    id: "agencies",
    number: "2",
    color: "var(--line-2)",
    onColor: "#ffffff",
    route: "agencies",
    requestType: "agency",
    name: { fr: "Agences & devs", en: "Agencies & devs" },
    origin: { fr: "Je suis une agence", en: "I run an agency" },
  },
  {
    id: "audit",
    number: "3",
    color: "var(--line-3)",
    onColor: "var(--ink)",
    route: "audit",
    requestType: "audit",
    name: { fr: "Audit", en: "Code review" },
    origin: { fr: "J'ai vibe-codé une app", en: "I vibe-coded an app" },
  },
];

export const lineById = (id: LineId) => lines.find((line) => line.id === id)!;
