import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { type ContentSection, type Locale, isLocale, sectionIndexPath } from "@/lib/i18n";
import { getArticleBySlug, getSectionSlugs } from "@/lib/markdown";
import { articleAlternates, openGraphLocale } from "@/lib/seo";
import { ArticleLayout } from "@/components/layout/ArticleLayout";
import { MarkdownContent } from "@/components/articles/MarkdownContent";

type ArticlePageParams = {
  lang: string;
  slug: string;
};

interface SectionPageConfig {
  siteNameSuffix: string;
  backLabel: Record<Locale, string>;
  useSimpleLayout?: boolean;
}

const sectionConfigs: Record<ContentSection, SectionPageConfig> = {
  "apprendre-arabe": {
    siteNameSuffix: "Langue Arabe",
    backLabel: {
      fr: "Retour au programme",
      en: "Back to program",
      ar: "العودة إلى البرنامج",
    },
    useSimpleLayout: true,
  },
  "sciences-islamiques": {
    siteNameSuffix: "Rissala",
    backLabel: {
      fr: "Retour aux fondements",
      en: "Back to foundations",
      ar: "العودة إلى الأسس",
    },
  },
  "finance-islamique": {
    siteNameSuffix: "Rissala",
    backLabel: {
      fr: "Retour à la finance islamique",
      en: "Back to Islamic finance",
      ar: "العودة إلى التمويل الإسلامي",
    },
  },
};

export function createArticlePage(section: ContentSection) {
  const config = sectionConfigs[section];

  async function generateStaticParams(): Promise<{ lang: string; slug: string }[]> {
    const params: { lang: string; slug: string }[] = [];
    const sectionLocales = section === "apprendre-arabe" ? (["fr", "en"] as Locale[]) : (["fr", "en", "ar"] as Locale[]);
    for (const lang of sectionLocales) {
      for (const slug of getSectionSlugs(lang, section)) {
        params.push({ lang, slug });
      }
    }
    return params;
  }

  async function generateMetadata({
    params,
  }: {
    params: Promise<ArticlePageParams>;
  }): Promise<Metadata> {
    const { lang, slug } = await params;
    if (!isLocale(lang) || (section === "apprendre-arabe" && lang === "ar")) return { title: "Article non trouvé" };

    const article = getArticleBySlug(lang, section, slug);
    if (!article) return { title: "Article non trouvé" };

    const titleParts = [article.title];
    if (article.titleAccent) titleParts.push(article.titleAccent);

    const alternates = articleAlternates(lang, section, slug);
    const og = openGraphLocale(lang);
    const pageTitle = `${titleParts.join(" : ")} | ${config.siteNameSuffix}`;

    return {
      title: pageTitle,
      description: article.description || article.subtitle,
      alternates,
      openGraph: {
        title: pageTitle,
        description: article.description || article.subtitle,
        url: alternates.canonical,
        locale: og.locale,
        alternateLocale: og.alternateLocale,
      },
    };
  }

  async function ArticlePage({ params }: { params: Promise<ArticlePageParams> }) {
    const { lang, slug } = await params;
    if (!isLocale(lang) || (section === "apprendre-arabe" && lang === "ar")) notFound();

    const article = getArticleBySlug(lang, section, slug);
    if (!article) notFound();

    if (config.useSimpleLayout) {
      return (
        <article className="container mx-auto px-4 lg:px-8 py-10 max-w-4xl">
          <SectionBackLink lang={lang} section={section} label={config.backLabel[lang]} />
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-heading text-foreground">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="text-xl text-muted-foreground">{article.subtitle}</p>
            )}
          </header>
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
            <MarkdownContent content={article.content} />
          </div>
        </article>
      );
    }

    return (
      <ArticleLayout
        title={article.title}
        titleAccent={article.titleAccent}
        subtitle={article.subtitle}
        articleNumber={article.articleNumber || 0}
        totalArticles={article.totalArticles || 0}
        prevArticle={article.prevArticle}
        nextArticle={article.nextArticle}
      >
        <MarkdownContent content={article.content} />
      </ArticleLayout>
    );
  }

  return { generateStaticParams, generateMetadata, default: ArticlePage };
}

function SectionBackLink({
  lang,
  section,
  label,
}: {
  lang: Locale;
  section: ContentSection;
  label: string;
}) {
  return (
    <div className="mb-8">
      <Link
        href={sectionIndexPath(lang, section)}
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {label}
      </Link>
    </div>
  );
}
