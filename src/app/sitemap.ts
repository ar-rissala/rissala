import { MetadataRoute } from "next";
import { locales, type ContentSection } from "@/lib/i18n";
import { getSectionSlugs } from "@/lib/markdown";
import { hreflangByLocale, toAbsoluteUrl } from "@/lib/seo";

const sections: ContentSection[] = [
  "apprendre-arabe",
  "sciences-islamiques",
  "finance-islamique",
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

  const staticPaths = ["", "/ressources", "/formations", "/a-propos"];

  const entries: MetadataRoute.Sitemap = staticPaths.map((route) => ({
    url: toAbsoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  for (const section of sections) {
    entries.push({
      url: toAbsoluteUrl(`/fr/${section}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: languageAlternates((lang) => `/${lang}/${section}`, section) },
    });

    const slugs = new Set<string>();
    for (const lang of locales) {
      getSectionSlugs(lang, section).forEach((s) => slugs.add(s));
    }

    for (const slug of slugs) {
      const langsWithSlug = locales.filter((lang) =>
        getSectionSlugs(lang, section).includes(slug)
      );
      if (langsWithSlug.length === 0) continue;

      entries.push({
        url: toAbsoluteUrl(`/${langsWithSlug[0]}/${section}/${slug}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            [
              ...langsWithSlug.map((lang) => [
                hreflangByLocale[lang],
                toAbsoluteUrl(`/${lang}/${section}/${slug}`),
              ]),
              ["x-default", toAbsoluteUrl(`/fr/${section}/${slug}`)],
            ] as [string, string][]
          ),
        },
      });
    }
  }

  return entries;
}
