import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n";
import ImageWithFallback from "@/components/ImageWithFallback";
import { getArticlesInSection } from "@/lib/markdown";
import { openGraphLocale, sectionIndexAlternates } from "@/lib/seo";

const pageCopy: Record<Locale, {
  metaTitle: string;
  metaDesc: string;
  title: string;
  subtitle: string;
  articlesRecents: string;
  faqJuridique: string;
  videos: string;
  noArticles: string;
  readArticle: string;
  lexiqueTitle: string;
  lexiqueDesc: string;
  lexiqueBtn: string;
}> = {
  fr: {
    metaTitle: 'Ressources | Rissala',
    metaDesc: "Articles sur la finance islamique, la Zakat et l'investissement éthique.",
    title: "Ressources & Éducation",
    subtitle: "Analyses des marchés, jurisprudences (fatawas), et guides complets pour exceller dans la finance islamique.",
    articlesRecents: "Articles Récents",
    faqJuridique: "FAQ Juridique",
    videos: "Vidéos",
    noArticles: "Aucun article n'a encore été publié dans cette section.",
    readArticle: "Lire l'article",
    lexiqueTitle: "Lexique Financier",
    lexiqueDesc: "Mourabaha, Moudaraba, Sukuk... Comprenez les termes essentiels de la Sharia.",
    lexiqueBtn: "Accéder au Lexique",
  },
  en: {
    metaTitle: 'Resources | Rissala',
    metaDesc: "Articles on Islamic finance, Zakat, and ethical investment.",
    title: "Resources & Education",
    subtitle: "Market analysis, legal rulings (fatawas), and comprehensive guides to excel in Islamic finance.",
    articlesRecents: "Recent Articles",
    faqJuridique: "Legal FAQ",
    videos: "Videos",
    noArticles: "No articles have been published in this section yet.",
    readArticle: "Read article",
    lexiqueTitle: "Financial Glossary",
    lexiqueDesc: "Murabaha, Mudaraba, Sukuk... Understand the essential terms of Sharia.",
    lexiqueBtn: "Access Glossary",
  },
  ar: {
    metaTitle: 'الموارد | رسالة',
    metaDesc: "مقالات عن التمويل الإسلامي، الزكاة والاستثمار الأخلاقي.",
    title: "الموارد والتعليم",
    subtitle: "تحليلات الأسواق، الفتاوى الشرعية، والأدلة الشاملة للتميز في التمويل الإسلامي.",
    articlesRecents: "مقالات حديثة",
    faqJuridique: "أسئلة شائعة",
    videos: "فيديوهات",
    noArticles: "لم يتم نشر أي مقال في هذا القسم بعد.",
    readArticle: "اقرأ المقال",
    lexiqueTitle: "المعجم المالي",
    lexiqueDesc: "مرابحة، مضاربة، صكوك... افهم المصطلحات الأساسية للشريعة.",
    lexiqueBtn: "الذهاب إلى المعجم",
  }
};

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = pageCopy[lang];
  const alternates = sectionIndexAlternates(lang, "ressources");
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

export default async function RessourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const articles = getArticlesInSection(lang, "ressources");
  const t = pageCopy[lang];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 sm:py-12 lg:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 border-b border-border/50 pb-6 sm:pb-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4 font-heading">{t.title}</h1>
          <p className="text-base sm:text-lg text-muted-foreground">{t.subtitle}</p>
        </div>
        <div className="mt-4 sm:mt-6 md:mt-0 flex flex-wrap gap-2">
           <Button variant="outline">{t.articlesRecents}</Button>
           <Button variant="outline">{t.faqJuridique}</Button>
           <Button variant="outline">{t.videos}</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {articles.length === 0 ? (
          <p className="text-muted-foreground">{t.noArticles}</p>
        ) : (
          articles.map((post, i) => (
            <Link key={post.slug} href={`/${lang}/ressources/${post.slug}`}>
              <Card className="overflow-hidden border-border/50 bg-card/60 hover:bg-card hover:border-primary/50 transition-all duration-300 group cursor-pointer flex flex-col h-full">
                <div className="h-36 sm:h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay"></div>
                  <ImageWithFallback src={post.image ?? "/images/ressources/default-finance.jpg"} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" fallbackSrc="/images/ressources/default-finance.jpg" />
                </div>
                <CardHeader className="flex-1">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-medium">
                    <span className="flex items-center text-primary bg-primary/10 px-2 py-1 rounded-md"><Tag className="w-3 h-3 mr-1" /> {post.tag || "Ressource"}</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> 5 min</span>
                  </div>
                  <CardTitle className="text-lg sm:text-xl leading-tight group-hover:text-primary transition-colors">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground line-clamp-3">{post.description || post.subtitle}</CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="font-semibold text-sm flex items-center text-foreground group-hover:text-primary transition-colors">
                      {t.readArticle} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))
        )}
      </div>
      
      <div className="mt-10 sm:mt-16 bg-muted/30 border border-border/50 rounded-2xl p-5 sm:p-8 lg:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8">
        <div>
           <h3 className="text-2xl font-bold font-heading mb-2 flex items-center"><BookOpen className="text-primary mr-2" /> {t.lexiqueTitle}</h3>
           <p className="text-muted-foreground">{t.lexiqueDesc}</p>
        </div>
        <Button size="lg" variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">{t.lexiqueBtn}</Button>
      </div>
    </div>
  );
}
