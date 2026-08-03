import { MetadataRoute } from "next";
import { locales, type ContentSection, getLocalizedSlug } from "@/lib/i18n";
import { getSectionSlugs } from "@/lib/markdown";
import { hreflangByLocale, toAbsoluteUrl } from "@/lib/seo";

const sections: ContentSection[] = [
  "apprendre-arabe",
  "sciences-islamiques",
  "fiqh-al-muamalat",
  "actualites",
];

function languageAlternates(
  pathForLocale: (lang: (typeof locales)[number]) => string,
  section?: ContentSection
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const lang of locales) {
    if (section === "apprendre-arabe" && lang === "ar") continue;
    languages[hreflangByLocale[lang]] = toAbsoluteUrl(pathForLocale(lang));
  }
  languages["x-default"] = toAbsoluteUrl(pathForLocale("fr"));
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPaths = ["", "/parcours", "/connexion"];

  const entries: MetadataRoute.Sitemap = staticPaths.map((route) => ({
    url: toAbsoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
  
  // Add About page
  entries.push({
    url: toAbsoluteUrl(`/fr/${getLocalizedSlug("about", "fr")}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: { languages: languageAlternates((lang) => `/${lang}/${getLocalizedSlug("about", lang)}`, "about") },
  });

  for (const section of sections) {
    entries.push({
      url: toAbsoluteUrl(`/fr/${getLocalizedSlug(section, "fr")}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: languageAlternates((lang) => `/${lang}/${getLocalizedSlug(section, lang)}`, section) },
    });

    const slugs = new Set<string>();
    for (const lang of locales) {
      if (section === "apprendre-arabe" && lang === "ar") continue;
      getSectionSlugs(lang, section).forEach((s) => slugs.add(s));
    }

    for (const slug of slugs) {
      const langsWithSlug = locales.filter((lang) => {
        if (section === "apprendre-arabe" && lang === "ar") return false;
        return getSectionSlugs(lang, section).includes(slug);
      });
      if (langsWithSlug.length === 0) continue;

      entries.push({
        url: toAbsoluteUrl(`/${langsWithSlug[0]}/${getLocalizedSlug(section, langsWithSlug[0])}/${slug}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            [
              ...langsWithSlug.map((lang) => [
                hreflangByLocale[lang],
                toAbsoluteUrl(`/${lang}/${getLocalizedSlug(section, lang)}/${slug}`),
              ]),
              ["x-default", toAbsoluteUrl(`/fr/${getLocalizedSlug(section, "fr")}/${slug}`)],
            ] as [string, string][]
          ),
        },
      });
    }
  }

  return entries;
}
