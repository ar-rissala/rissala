import {
  defaultLocale,
  locales,
  type ContentSection,
  type Locale,
  articlePath,
  sectionIndexPath,
} from "@/lib/i18n";
import { getSectionSlugs } from "@/lib/markdown";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rissala.net";

/** Codes hreflang (BCP 47) reconnus par Google */
export const hreflangByLocale: Record<Locale, string> = {
  fr: "fr",
  en: "en",
  ar: "ar",
};

export function toAbsoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl.replace(/\/$/, "")}${normalized}`;
}

/** Balises alternates.languages + canonical pour Next.js Metadata */
export function buildHreflangAlternates(
  currentLang: Locale,
  pathForLocale: (lang: Locale) => string,
  options?: { onlyExisting?: (lang: Locale) => boolean }
): { canonical: string; languages: Record<string, string> } {
  const languages: Record<string, string> = {};

  for (const lang of locales) {
    if (options?.onlyExisting && !options.onlyExisting(lang)) continue;
    languages[hreflangByLocale[lang]] = toAbsoluteUrl(pathForLocale(lang));
  }

  languages["x-default"] = toAbsoluteUrl(pathForLocale(defaultLocale));

  return {
    canonical: toAbsoluteUrl(pathForLocale(currentLang)),
    languages,
  };
}

export function sectionIndexAlternates(lang: Locale, section: ContentSection) {
  return buildHreflangAlternates(
    lang,
    (l) => sectionIndexPath(l, section),
    {
      onlyExisting: (l) => !(section === "apprendre-arabe" && l === "ar"),
    }
  );
}

export function articleAlternates(
  lang: Locale,
  section: ContentSection,
  slug: string
) {
  return buildHreflangAlternates(
    lang,
    (l) => articlePath(l, section, slug),
    {
      onlyExisting: (l) =>
        !(section === "apprendre-arabe" && l === "ar") &&
        getSectionSlugs(l, section).includes(slug),
    }
  );
}

export function openGraphLocale(lang: Locale): {
  locale: string;
  alternateLocale: string[];
} {
  const map: Record<Locale, string> = {
    fr: "fr_FR",
    en: "en_US",
    ar: "ar_SA",
  };
  const locale = map[lang];
  const alternateLocale = Object.values(map).filter((l) => l !== locale);
  return { locale, alternateLocale };
}
