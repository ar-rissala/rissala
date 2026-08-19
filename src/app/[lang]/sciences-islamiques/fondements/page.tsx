import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getArticlesInSection } from "@/lib/markdown";
import { openGraphLocale, buildHreflangAlternates } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";
import { ArticleNoImage } from "@/components/news/EditorialCards";

const pageCopy: Record<
  Locale,
  { 
    metaTitle: string; 
    metaDesc: string; 
    description: string; 
    heading: string; 
    accent: string; 
    fondementsTitle: string;
  }
> = {
  fr: {
    metaTitle: "Fondements | Sciences Islamiques | Rissala",
    metaDesc: "Découvrez les bases essentielles des sciences islamiques.",
    description: "Ce cursus retrace l'histoire et les fondements de la tradition sunnite, de la révélation à la structuration des sciences islamiques.",
    heading: "Les",
    accent: "Fondements",
    fondementsTitle: "Articles Fondamentaux",
  },
  en: {
    metaTitle: "Foundations | Islamic Sciences | Rissala",
    metaDesc: "Discover the essential foundations of Islamic sciences.",
    description: "This course traces the history and foundations of the Sunni tradition, from revelation to the structuring of Islamic sciences.",
    heading: "The",
    accent: "Foundations",
    fondementsTitle: "Core Articles",
  },
  ar: {
    metaTitle: "الأسس | العلوم الإسلامية | رسالة",
    metaDesc: "اكتشف الأسس الأساسية للعلوم الإسلامية.",
    description: "يتتبع هذا المسار تاريخ وأسس التراث السني، من الوحي إلى هيكلة العلوم الإسلامية.",
    heading: "الأسس",
    accent: "الإسلامية",
    fondementsTitle: "المقالات الأساسية",
  },
};

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = pageCopy[lang];
  const alternates = buildHreflangAlternates(lang, (l) => `/${l}/sciences-islamiques/fondements`);
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

export default async function FondementsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = pageCopy[lang];
  // On récupère les articles de "sciences-islamiques" (qui sont les fondements actuels)
  const articles = getArticlesInSection(lang, "sciences-islamiques");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <PageHero 
        bgImage="/islamic-pattern-bg.jpg" 
        overlayClassName="bg-background/[0.65] dark:bg-background/[0.70]"
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 sm:mb-6 font-heading">
            {t.heading} <span className="text-primary">{t.accent}</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
            {t.description}
          </p>
        </div>
      </PageHero>

      <div className="container mx-auto px-4 lg:px-8 py-16 sm:py-24">
        
        {/* ARTICLES */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-heading border-b-2 border-primary pb-2 pr-8 inline-block">
              {t.fondementsTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleNoImage key={article.slug} article={article} lang={lang} />
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
}
