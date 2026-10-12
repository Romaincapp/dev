import { href, type Locale, type RouteKey } from "@/i18n/config";

/** Where an audience's entry leads: clients land on the home page projects. */
export function audienceHref(lang: Locale, route: RouteKey) {
  return route === "home" ? `${href(lang, "home")}#projects` : href(lang, route);
}
