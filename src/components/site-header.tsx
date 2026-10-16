"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";
import { alternatePath, href, type Locale } from "@/i18n/config";
import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";
import { TrackedLink } from "./tracked-link";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

type HeaderCopy = {
  brand: { name: string; by: string };
  nav: {
    main: string;
    projects: string;
    contact: string;
    menu: string;
    close: string;
    switchTo: string;
    switchToShort: string;
    theme: string;
  };
  links: { agencies: string; audit: string };
  available: { full: string; short: string };
};

export function SiteHeader({ lang, copy }: { lang: Locale; copy: HeaderCopy }) {
  const pathname = usePathname() ?? `/${lang}`;
  const other: Locale = lang === "fr" ? "en" : "fr";
  const contactHref = href(lang, "contact");
  const links = [
    { href: `${href(lang, "home")}#projects`, label: copy.nav.projects },
    { href: href(lang, "agencies"), label: copy.links.agencies },
    { href: href(lang, "audit"), label: copy.links.audit },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <Link href={href(lang, "home")} className="shrink-0 rounded-md">
          <Brand by={copy.brand.by} />
        </Link>

        <nav aria-label={copy.nav.main} className="ml-4 hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <TrackedLink
            href={contactHref}
            location="header-availability"
            className="inline-flex md:hidden lg:inline-flex h-9 items-center gap-2 rounded-md px-2 text-xs whitespace-nowrap text-fg-muted transition-colors hover:text-fg lg:mr-2"
          >
            <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent ring-2 ring-accent-soft" />
            <span className="leading-tight max-[359px]:w-[11ch] max-[359px]:whitespace-normal lg:hidden">{copy.available.short}</span>
            <span className="hidden lg:inline">{copy.available.full}</span>
          </TrackedLink>
          <Link
            href={alternatePath(pathname, other)}
            hrefLang={other}
            lang={other}
            aria-label={copy.nav.switchTo}
            className="hidden h-9 items-center rounded-md px-2.5 font-mono text-xs font-medium text-fg-muted hover:bg-bg-muted hover:text-fg md:inline-flex"
          >
            {copy.nav.switchToShort}
          </Link>
          <span className="hidden md:inline-flex">
            <ThemeToggle label={copy.nav.theme} />
          </span>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <TrackedLink href={contactHref} location="header">
              {copy.nav.contact}
              <ArrowRight aria-hidden />
            </TrackedLink>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" aria-hidden />
                <span className="sr-only">{copy.nav.menu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent closeLabel={copy.nav.close} aria-describedby={undefined}>
              <SheetTitle className="px-5 pt-5">
                <Brand by={copy.brand.by} />
              </SheetTitle>
              <nav aria-label={copy.nav.main} className="mt-6 flex flex-col px-3">
                {links.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link href={link.href} className="flex min-h-12 items-center rounded-md px-3 text-base font-medium hover:bg-bg-muted">
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href={alternatePath(pathname, other)}
                    hrefLang={other}
                    lang={other}
                    className="flex min-h-12 items-center rounded-md px-3 text-base font-medium text-fg-muted hover:bg-bg-muted"
                  >
                    {copy.nav.switchTo}
                  </Link>
                </SheetClose>
              </nav>
              <div className="mt-auto flex items-center gap-3 border-t border-border p-5">
                <ThemeToggle label={copy.nav.theme} />
                <SheetClose asChild>
                  <Button asChild className="flex-1">
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
      </div>
    </header>
  );
}
