import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource-variable/overpass/wght.css";
import "@fontsource/overpass-mono/400.css";
import "../globals.css";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#0e2140",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: `%s · Romain / Dev` },
    description: dict.meta.description,
    applicationName: "Romain / Dev",
    authors: [{ name: "Romain Dumoulin" }],
    openGraph: {
      type: "website",
      siteName: "Romain / Dev",
      locale: lang === "fr" ? "fr_BE" : "en_GB",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} className="h-full">
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-line-3 px-4 py-2 font-bold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {dict.nav.skip}
        </a>
        <SiteHeader lang={lang} copy={{ brand: dict.brand, nav: dict.nav }} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter lang={lang} dict={dict} />
        <Analytics />
      </body>
    </html>
  );
}
