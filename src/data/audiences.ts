import type { Locale, RouteKey } from "@/i18n/config";

export type AudienceId = "clients" | "agencies" | "audit";

export type Audience = {
  id: AudienceId;
  route: RouteKey;
  /** Contact form request type preselected for this audience. */
  requestType: "client" | "agency" | "audit";
  name: Record<Locale, string>;
};

export const audiences: Audience[] = [
  { id: "clients", route: "home", requestType: "client", name: { fr: "Clients", en: "Clients" } },
  { id: "agencies", route: "agencies", requestType: "agency", name: { fr: "Agences & devs", en: "Agencies & devs" } },
  { id: "audit", route: "audit", requestType: "audit", name: { fr: "Audit d'app", en: "Code review" } },
];
