import "server-only";
import type { Locale } from "./config";
import fr from "./dictionaries/fr";
import en from "./dictionaries/en";

const dictionaries = { fr, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
