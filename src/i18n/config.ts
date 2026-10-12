export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/**
 * Pages are built under English folder names (`src/app/[lang]/agencies`…).
 * French URLs use French slugs; `src/proxy.ts` rewrites them to the folders.
 */
export const routes = {
  home: { fr: "", en: "" },
  agencies: { fr: "agences", en: "agencies" },
  audit: { fr: "audit", en: "code-review" },
  projects: { fr: "projets", en: "projects" },
  contact: { fr: "contact", en: "contact" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

/** Folder name used inside `src/app/[lang]`. */
export const internalSegment: Record<RouteKey, string> = {
  home: "",
  agencies: "agencies",
  audit: "code-review",
  projects: "projects",
  contact: "contact",
};

export function href(lang: Locale, key: RouteKey, slug?: string) {
  const segment = routes[key][lang];
  const parts = [lang, segment, slug].filter(Boolean);
  return `/${parts.join("/")}`;
}

/** Maps a public first segment (`agences`, `code-review`…) to its route key. */
export function routeKeyFromSegment(lang: Locale, segment: string): RouteKey | undefined {
  return (Object.keys(routes) as RouteKey[]).find(
    (key) => key !== "home" && routes[key][lang] === segment,
  );
}

/** Same page in the other language, used by the language switch. */
export function alternatePath(pathname: string, target: Locale) {
  const [, lang, segment, ...rest] = pathname.split("/");
  if (!lang || !hasLocale(lang)) return `/${target}`;
  if (!segment) return `/${target}`;
  const key = routeKeyFromSegment(lang, segment);
  if (!key) return `/${target}`;
  return href(target, key, rest.join("/") || undefined);
}
