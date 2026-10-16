import { useSyncExternalStore } from "react";
import { enGB } from "react-day-picker/locale/en-GB";
import { fr } from "react-day-picker/locale/fr";
import type { Locale } from "@/i18n/config";

export const dayLocale = (lang: Locale) => (lang === "fr" ? fr : enGB);

const startOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const noop = () => () => {};

let cachedToday: Date | null = null;
const getToday = () => {
  const today = startOfToday();
  if (cachedToday?.getTime() !== today.getTime()) cachedToday = today;
  return cachedToday;
};

/**
 * Today at midnight, or null while prerendering and hydrating:
 * dates depend on the visitor's clock, so calendars only render in the browser.
 */
export const useToday = () => useSyncExternalStore(noop, getToday, () => null);
