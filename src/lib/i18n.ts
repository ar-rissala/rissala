export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const contentSections = [
  "apprendre-arabe",
  "sciences-islamiques",
  "fiqh-al-muamalat",
  "actualites",
  "about",
] as const;

export type ContentSection = (typeof contentSections)[number];

export const legacySectionRedirects: Record<string, ContentSection> = {
  "langue-arabe": "apprendre-arabe",
  sciences: "sciences-islamiques",
  "fiqh-al-muamalat": "fiqh-al-muamalat",
  "apprendre-arabe": "apprendre-arabe",
  actualites: "actualites",
  "a-propos": "about",
};

export const routeDictionary: Record<ContentSection, Record<Locale, string>> = {
  "about": {
    fr: "a-propos",
    en: "about",
    ar: "about"
  },
  "sciences-islamiques": {
    fr: "sciences-islamiques",
    en: "islamic-sciences",
    ar: "العلوم-الإسلامية"
  },
  "apprendre-arabe": {
    fr: "langue-arabe",
    en: "arabic-language",
    ar: "اللغة-العربية"
  },
  "fiqh-al-muamalat": {
    fr: "finance-islamique",
    en: "islamic-finance",
    ar: "التمويل-الإسلامي"
  },
  "actualites": {
    fr: "actualites",
    en: "news",
    ar: "الأخبار"
  }
};

/** Get the localized slug for a given internal section and language */
export function getLocalizedSlug(section: ContentSection, lang: Locale): string {
  return routeDictionary[section][lang];
}

/** Get the internal section from a localized slug */
export function getInternalSection(slug: string, lang: Locale): ContentSection | undefined {
  for (const [section, localized] of Object.entries(routeDictionary)) {
    if (localized[lang] === slug) {
      return section as ContentSection;
    }
  }
  return undefined;
}

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
  // Use localized slug in the URL
  const localizedSection = getLocalizedSlug(section, lang);
  return `/${lang}/${localizedSection}/${slug}`;
}

export function sectionIndexPath(lang: Locale, section: ContentSection): string {
  const localizedSection = getLocalizedSlug(section, lang);
  return `/${lang}/${localizedSection}`;
}

export const localeLabels: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
};
