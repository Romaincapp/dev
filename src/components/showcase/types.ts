import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";

export type ShowcaseCopy = Dictionary["home"]["showcase"];

export const money = (lang: Locale, value: number) =>
  new Intl.NumberFormat(lang === "fr" ? "fr-BE" : "en-IE", { style: "currency", currency: "EUR" }).format(value);
