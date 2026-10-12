import type { Metadata } from "next";
import { href, type Locale, type RouteKey } from "@/i18n/config";

/** Canonical URL and hreflang alternates for a page. */
export function alternates(lang: Locale, key: RouteKey, slug?: string): Metadata["alternates"] {
  return {
    canonical: href(lang, key, slug),
    languages: {
      fr: href("fr", key, slug),
      en: href("en", key, slug),
      "x-default": href("fr", key, slug),
    },
  };
}
