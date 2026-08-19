import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getArticlesInSection } from "@/lib/markdown";
import { openGraphLocale, sectionIndexAlternates } from "@/lib/seo";
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
    apprentissageTitle: string;
    grammaireTitle: string;
    grammaireDesc: string;
    grammaireBadge: string;
  }
> = {
  fr: {
    metaTitle: "Langue Arabe | Rissala",
    metaDesc: "Découvrez notre méthode pour apprendre la langue arabe.",
    description: "Découvrez notre méthode d'apprentissage de la langue arabe, clé essentielle pour comprendre les fondements de la religion.",
    heading: "Langue",
    accent: "Arabe",
    apprentissageTitle: "Apprentissage",
    grammaireTitle: "Grammaire",
    grammaireDesc: "Une section dédiée à l'étude progressive de la grammaire arabe.",
    grammaireBadge: "Contenu à venir",
  },
  en: {
    metaTitle: "Arabic Language | Rissala",
    metaDesc: "Learn Arabic with the Rissala structured method.",
    description: "Discover our method for learning Arabic — the essential key to understanding the Islamic foundations.",
    heading: "Arabic",
    accent: "Language",
    apprentissageTitle: "Learning",
    grammaireTitle: "Grammar",
    grammaireDesc: "A section dedicated to the progressive study of Arabic grammar.",
    grammaireBadge: "Coming soon",
  },
  ar: {
    metaTitle: "اللغة العربية | رسالة",
    metaDesc: "تعلّم العربية بمنهج رسالة.",
    description: "تعرّف على منهجنا لتعلّم العربية — المفتاح لفهم أصول الدين.",
    heading: "اللغة",
    accent: "العربية",
    apprentissageTitle: "تعلّم",
    grammaireTitle: "نحو",
    grammaireDesc: "قسم مخصص لدراسة النحو العربي بشكل تدريجي.",
    grammaireBadge: "قريباً",
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
  const alternates = sectionIndexAlternates(lang, "apprendre-arabe");
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

export default async function ApprendreArabeIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = pageCopy[lang];
  // On récupère les véritables articles existants dans content/[lang]/apprendre-arabe
  const articles = getArticlesInSection(lang, "apprendre-arabe");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <PageHero 
        bgImage="/arabe-bg.jpg" 
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
        
        {/* APPRENTISSAGE */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-heading border-b-2 border-primary pb-2 pr-8 inline-block">
              {t.apprentissageTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleNoImage key={article.slug} article={article} lang={lang} />
            ))}
          </div>
        </section>

        {/* GRAMMAIRE (Placeholder pour la suite) */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-heading border-b-2 border-primary pb-2 pr-8 inline-block">
              {t.grammaireTitle}
            </h2>
          </div>
          
          <div className="bg-muted/30 border border-border/50 rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-6" />
            <h3 className="text-xl font-bold font-heading mb-3">{t.grammaireTitle}</h3>
            <p className="text-muted-foreground mb-6">
              {t.grammaireDesc}
            </p>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              {t.grammaireBadge}
            </span>
          </div>
        </section>
        
      </div>
    </div>
  );
}
