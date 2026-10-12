import { href, type Locale, type RouteKey } from "@/i18n/config";

/** Where a line leads: the Clients line ends on the home page projects. */
export function lineHref(lang: Locale, route: RouteKey) {
  return route === "home" ? `${href(lang, "home")}#projects` : href(lang, route);
}
