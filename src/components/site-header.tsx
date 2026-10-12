"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";
import { alternatePath, href, type Locale } from "@/i18n/config";
import { lines } from "@/data/lines";
import { lineHref } from "@/lib/links";
import { LineBadge } from "./line-badge";
import { TrackedLink } from "./tracked-link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "./ui/sheet";

type HeaderCopy = {
  brand: { name: string; by: string };
  nav: {
    main: string;
    projects: string;
    contact: string;
    menu: string;
    close: string;
    language: string;
    switchTo: string;
    switchToShort: string;
  };
};

export function SiteHeader({ lang, copy }: { lang: Locale; copy: HeaderCopy }) {
  const pathname = usePathname() ?? `/${lang}`;
  const other: Locale = lang === "fr" ? "en" : "fr";
  const contactHref = href(lang, "contact");

  return (
    <header className="on-band sticky top-0 z-40 bg-band text-band-ink">
      <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center gap-3 px-4 sm:gap-6 sm:px-6 lg:px-10">
        <Link href={href(lang, "home")} className="group flex shrink-0 flex-col leading-none">
          <span className="text-[1.35rem] font-black tracking-[-0.03em]">
            Romain <span className="text-line-3">/</span> Dev
          </span>
          <span className="mt-1 text-[0.72rem] font-medium tracking-[0.02em] text-band-ink-2">{copy.brand.by}</span>
        </Link>

        <nav aria-label={copy.nav.main} className="ml-auto hidden items-center gap-1 lg:flex">
          {lines.map((line) => (
            <Link
              key={line.id}
              href={lineHref(lang, line.route)}
              className="flex h-11 items-center gap-2 rounded-full px-3 text-[0.95rem] font-semibold text-band-ink-2 transition-colors hover:bg-white/8 hover:text-band-ink"
            >
              <LineBadge line={line} size="sm" />
              {line.name[lang]}
            </Link>
          ))}
          <Link
            href={alternatePath(pathname, other)}
            hrefLang={other}
            lang={other}
            className="ml-2 flex h-11 items-center rounded-full px-3 text-sm font-bold tracking-wide text-band-ink-2 hover:bg-white/8 hover:text-band-ink"
            aria-label={copy.nav.switchTo}
          >
            {copy.nav.switchToShort}
          </Link>
        </nav>

        <Button asChild variant="signal" className="ml-auto h-10 px-4 text-sm sm:h-11 sm:px-5 sm:text-[0.98rem] lg:ml-2">
          <TrackedLink href={contactHref} location="header">
            {copy.nav.contact}
            <ArrowRight aria-hidden />
          </TrackedLink>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-mr-2 text-band-ink hover:bg-white/10 lg:hidden">
              <Menu className="size-6" aria-hidden />
              <span className="sr-only">{copy.nav.menu}</span>
            </Button>
          </SheetTrigger>
          <SheetContent closeLabel={copy.nav.close} aria-describedby={undefined}>
            <SheetTitle className="px-6 pt-6 text-xl font-black">
              Romain <span className="text-line-3">/</span> Dev
            </SheetTitle>
            <nav aria-label={copy.nav.main} className="mt-8 flex flex-col gap-1 px-4">
              {lines.map((line) => (
                <SheetClose asChild key={line.id}>
                  <Link
                    href={lineHref(lang, line.route)}
                    className="flex min-h-14 items-center gap-3 rounded-xl px-3 text-lg font-semibold hover:bg-white/8"
                  >
                    <LineBadge line={line} />
                    {line.name[lang]}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link
                  href={alternatePath(pathname, other)}
                  hrefLang={other}
                  lang={other}
                  className="mt-2 flex min-h-12 items-center rounded-xl px-3 font-semibold text-band-ink-2 hover:bg-white/8"
                >
                  {copy.nav.switchTo}
                </Link>
              </SheetClose>
            </nav>
            <div className="mt-auto p-6">
              <SheetClose asChild>
                <Button asChild variant="signal" size="lg" className="w-full">
                  <TrackedLink href={contactHref} location="mobile-menu">
                    {copy.nav.contact}
                    <ArrowRight aria-hidden />
                  </TrackedLink>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
