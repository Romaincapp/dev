import Link from "next/link";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { audiences } from "@/data/audiences";
import { audienceHref } from "@/lib/links";
import { Brand } from "./brand";
import { GithubIcon } from "./icons";

export function SiteFooter({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="border-t border-border bg-bg-subtle">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Brand by={dict.brand.by} />
          <p className="max-w-[40ch] text-sm text-fg-muted">{dict.footer.tagline}</p>
          <p className="text-sm text-fg-muted">{dict.brand.location}</p>
        </div>
        <nav aria-label={dict.footer.sitemap} className="flex flex-col gap-1 text-sm">
          <p className="mb-2 font-medium">{dict.footer.sitemap}</p>
          {audiences.map((audience) => (
            <Link key={audience.id} href={audienceHref(lang, audience.route)} className="py-1 text-fg-muted hover:text-fg">
              {audience.name[lang]}
            </Link>
          ))}
          <Link href={href(lang, "contact")} className="py-1 text-fg-muted hover:text-fg">
            {dict.nav.contact}
          </Link>
        </nav>
        <div className="flex flex-col gap-1 text-sm">
          <p className="mb-2 font-medium">{dict.footer.elsewhere}</p>
          <a href="https://github.com/Romaincapp" className="inline-flex items-center gap-2 py-1 text-fg-muted hover:text-fg">
            <GithubIcon className="size-4" />
            {dict.footer.github}
          </a>
          <a href="https://github.com/Romaincapp/dev" className="py-1 text-fg-muted hover:text-fg">
            {dict.footer.source}
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-border px-4 py-6 text-xs text-fg-muted sm:px-6">
        © Romain Dumoulin. {dict.footer.rights}
      </div>
    </footer>
  );
}
