import type { NextConfig } from "next";

// French public slugs → folders under src/app/[lang] (see src/i18n/config.ts).
const frenchSlugs = [
  ["agences", "agencies"],
  ["audit", "code-review"],
  ["projets", "projects"],
] as const;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return frenchSlugs.flatMap(([fr, folder]) => [
      { source: `/fr/${fr}`, destination: `/fr/${folder}` },
      { source: `/fr/${fr}/:slug*`, destination: `/fr/${folder}/:slug*` },
    ]);
  },
  async redirects() {
    return frenchSlugs.flatMap(([fr, folder]) => [
      { source: `/fr/${folder}`, destination: `/fr/${fr}`, permanent: true },
      { source: `/fr/${folder}/:slug*`, destination: `/fr/${fr}/:slug*`, permanent: true },
      { source: `/en/${fr}`, destination: `/en/${folder}`, permanent: true },
      { source: `/en/${fr}/:slug*`, destination: `/en/${folder}/:slug*`, permanent: true },
    ]);
  },
};

export default nextConfig;
