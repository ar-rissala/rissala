import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  type ContentSection,
  type Locale,
  articlePath,
  isContentSection,
} from "@/lib/i18n";

const contentRoot = path.join(process.cwd(), "content");

export interface ArticleNavItem {
  href: string;
  title: string;
}

export interface ArticleData {
  slug: string;
  lang: Locale;
  section: ContentSection;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  description?: string;
  date: string;
  tag?: string;
  image?: string;
  articleNumber?: number;
  totalArticles?: number;
  prevArticle?: ArticleNavItem;
  nextArticle?: ArticleNavItem;
  content: string;
  [key: string]: unknown;
}

function sectionDir(lang: Locale, section: ContentSection): string {
  return path.join(contentRoot, lang, section);
}

function resolveNav(
  lang: Locale,
  section: ContentSection,
  data: Record<string, unknown>,
  key: "prev" | "next"
): ArticleNavItem | undefined {
  const articleKey = key === "prev" ? "prevArticle" : "nextArticle";
  const slugKey = key === "prev" ? "prevArticleSlug" : "nextArticleSlug";
  const titleKey = key === "prev" ? "prevArticleTitle" : "nextArticleTitle";

  const embedded = data[articleKey] as
    | { href?: string; title?: string; slug?: string }
    | undefined;

  if (embedded?.title) {
    if (embedded.slug) {
      return {
        href: articlePath(lang, section, embedded.slug),
        title: embedded.title,
      };
    }
    if (embedded.href) {
      const slugFromHref = embedded.href.split("/").filter(Boolean).pop();
      if (slugFromHref) {
        return {
          href: articlePath(lang, section, slugFromHref),
          title: embedded.title,
        };
      }
    }
  }

  const slug = data[slugKey] as string | undefined;
  const title = data[titleKey] as string | undefined;
  if (slug && title) {
    return { href: articlePath(lang, section, slug), title };
  }

  return undefined;
}

export function getArticleBySlug(
  lang: Locale,
  section: ContentSection,
  slug: string
): ArticleData | null {
  try {
    const fullPath = path.join(sectionDir(lang, section), `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      lang,
      section,
      content,
      ...data,
      title: data.title as string,
      date: data.date as string,
      image: data.image as string | undefined,
    } as ArticleData;
  } catch (error) {
    console.error(`Error reading article ${lang}/${section}/${slug}:`, error);
    return null;
  }
}

export function getSectionSlugs(
  lang: Locale,
  section: ContentSection
): string[] {
  const dir = sectionDir(lang, section);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md") && name.toLowerCase() !== "readme.md")
    .map((name) => name.replace(/\.md$/, ""));
}

export function getArticlesInSection(
  lang: Locale,
  section: ContentSection
): ArticleData[] {
  return getSectionSlugs(lang, section)
    .map((slug) => getArticleBySlug(lang, section, slug))
    .filter((article): article is ArticleData => article !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllLocalizedArticles(): ArticleData[] {
  const articles: ArticleData[] = [];

  for (const lang of ["fr", "en", "ar"] as Locale[]) {
    for (const section of [
      "apprendre-arabe",
      "sciences-islamiques",
      "finance-islamique",
      "ressources",
    ] as ContentSection[]) {
      articles.push(...getArticlesInSection(lang, section));
    }
  }

  return articles;
}

export function parseSectionParam(section: string): ContentSection | null {
  return isContentSection(section) ? section : null;
}
