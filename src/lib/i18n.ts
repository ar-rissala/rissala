export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const contentSections = [
  "apprendre-arabe",
  "sciences-islamiques",
  "finance-islamique",
  "ressources",
] as const;

export type ContentSection = (typeof contentSections)[number];

/** Anciennes routes → nouvelles sections URL */
export const legacySectionRedirects: Record<string, ContentSection> = {
  "langue-arabe": "apprendre-arabe",
  sciences: "sciences-islamiques",
  "finance-islamique": "finance-islamique",
  "apprendre-arabe": "apprendre-arabe",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function isContentSection(value: string): value is ContentSection {
  return contentSections.includes(value as ContentSection);
}

export function articlePath(
  lang: Locale,
  section: ContentSection,
  slug: string
): string {
  return `/${lang}/${section}/${slug}`;
}

export function sectionIndexPath(lang: Locale, section: ContentSection): string {
  return `/${lang}/${section}`;
}

export const localeLabels: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
};
