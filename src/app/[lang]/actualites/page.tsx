import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getArticlesInSection } from "@/lib/markdown";
import { openGraphLocale, sectionIndexAlternates } from "@/lib/seo";
import NewsFeedClient from "@/components/news/NewsFeedClient";

const pageCopy: Record<Locale, {
  metaTitle: string;
  metaDesc: string;
}> = {
  fr: {
    metaTitle: 'Actualités Économiques & Financières | Rissala',
    metaDesc: "Suivez l'actualité de la finance islamique, des banques, de la création monétaire et de l'investissement éthique.",
  },
  en: {
    metaTitle: 'Economic & Financial News | Rissala',
    metaDesc: "Follow the news on Islamic finance, banking, money creation, and ethical investment.",
  },
  ar: {
    metaTitle: 'الأخبار الاقتصادية والمالية | رسالة',
    metaDesc: "تابع أخبار التمويل الإسلامي، البنوك، خلق المال، والاستثمار الأخلاقي.",
  }
};

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = pageCopy[lang];
  const alternates = sectionIndexAlternates(lang, "actualites");
  const og = openGraphLocale(lang);
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates,
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      url: alternates.canonical,
      locale: og.locale,
      alternateLocale: og.alternateLocale,
    },
  };
}

export default async function ActualitesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  // La page Actualités est désormais indépendante et ne charge que ses propres articles
  const articles = getArticlesInSection(lang, "actualites");

  return (
    <div className="container mx-auto px-4 lg:px-8 py-1 sm:py-2 lg:py-4">
      <NewsFeedClient initialArticles={articles} lang={lang} />
    </div>
  );
}
