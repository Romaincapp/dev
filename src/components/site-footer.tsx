import Link from "next/link";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { lines } from "@/data/lines";
import { LineBadge } from "./line-badge";
import { GithubIcon } from "./icons";
import { lineHref } from "@/lib/links";

export function SiteFooter({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="on-band bg-[#0a1830] text-band-ink-2">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr] lg:px-10">
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-black tracking-[-0.03em] text-band-ink">
            Romain <span className="text-line-3">/</span> Dev
          </p>
          <p className="text-sm">{dict.brand.by}</p>
          <p className="max-w-[40ch]">{dict.footer.tagline}</p>
          <p className="font-semibold text-band-ink">{dict.brand.location}</p>
        </div>
        <nav aria-label={dict.footer.sitemap} className="flex flex-col gap-2">
          <p className="mb-1 font-bold text-band-ink">{dict.footer.sitemap}</p>
          {lines.map((line) => (
            <Link key={line.id} href={lineHref(lang, line.route)} className="flex min-h-10 items-center gap-2 hover:text-band-ink">
              <LineBadge line={line} size="sm" />
              {line.name[lang]}
            </Link>
          ))}
          <Link href={href(lang, "contact")} className="flex min-h-10 items-center hover:text-band-ink">
            {dict.nav.contact}
          </Link>
        </nav>
        <div className="flex flex-col gap-2">
          <p className="mb-1 font-bold text-band-ink">{dict.footer.elsewhere}</p>
          <a href="https://github.com/Romaincapp" className="flex min-h-10 items-center gap-2 hover:text-band-ink">
            <GithubIcon className="size-5" />
            {dict.footer.github}
          </a>
          <a href="https://github.com/Romaincapp/dev" className="flex min-h-10 items-center hover:text-band-ink">
            {dict.footer.source}
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-[90rem] px-4 pb-8 text-sm sm:px-6 lg:px-10">
        © Romain Dumoulin. {dict.footer.rights}
      </div>
    </footer>
  );
}
