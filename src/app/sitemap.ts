import type { MetadataRoute } from "next";
import { href, locales, type RouteKey } from "@/i18n/config";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { key: RouteKey; slug?: string }[] = [
    { key: "home" },
    { key: "agencies" },
    { key: "audit" },
    { key: "contact" },
    ...projects.map((project) => ({ key: "projects" as const, slug: project.slug })),
  ];
  return pages.flatMap(({ key, slug }) =>
    locales.map((lang) => ({
      url: `${siteUrl}${href(lang, key, slug)}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}${href(l, key, slug)}`])),
      },
    })),
  );
}
