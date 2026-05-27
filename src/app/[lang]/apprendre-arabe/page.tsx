import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { isLocale, type Locale } from "@/lib/i18n";
import { getSectionSlugs } from "@/lib/markdown";
import { apprendreArabeCatalog, catalogHref } from "@/lib/section-catalog";
import { openGraphLocale, sectionIndexAlternates } from "@/lib/seo";

const pageCopy: Record<
  Locale,
  { metaTitle: string; metaDesc: string; description: string; badge: string; heading: string; accent: string }
> = {
  fr: {
    metaTitle: "Langue Arabe | Rissala",
    metaDesc: "Découvrez notre méthode pour apprendre la langue arabe.",
    description:
      "Découvrez notre méthode d'apprentissage de la langue arabe, clé essentielle pour comprendre les fondements.",
    badge: "Cursus Arabe Complet • 5 Articles Fondamentaux",
    heading: "Langue",
    accent: "Arabe",
  },
  en: {
    metaTitle: "Arabic Language | Rissala",
    metaDesc: "Learn Arabic with the Rissala structured method.",
    description:
      "Discover our method for learning Arabic — the essential key to understanding the Islamic foundations.",
    badge: "Complete Arabic Course • 5 Core Articles",
    heading: "Arabic",
    accent: "Language",
  },
  ar: {
    metaTitle: "اللغة العربية | رسالة",
    metaDesc: "تعلّم العربية بمنهج رسالة.",
    description: "تعرّف على منهجنا لتعلّم العربية — المفتاح لفهم أصول الدين.",
    badge: "مسار عربي كامل • ٥ مقالات أساسية",
    heading: "اللغة",
    accent: "العربية",
  },
};

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
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
  if (!isLocale(lang) || lang === "ar") notFound();

  const available = new Set(getSectionSlugs(lang, "apprendre-arabe"));
  const articles = apprendreArabeCatalog.filter((a) => available.has(a.slug));
  const t = pageCopy[lang];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary/5 py-14 sm:py-18 lg:py-24 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">
            {t.heading} <span className="text-primary">{t.accent}</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
            {t.description}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <BookOpen className="h-4 w-4" />
            <span>{t.badge}</span>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-10 sm:py-14 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={catalogHref(lang, "apprendre-arabe", article.slug)}
                className="group"
              >
                <Card className="h-full border-border/50 bg-background/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-sm font-bold">
                        {article.number}
                      </div>
                      <article.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {article.title[lang]}
                      </CardTitle>
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                        {article.tag[lang]}
                      </span>
                    </div>
                    <p className="text-xs text-primary/80 font-semibold mb-3 uppercase tracking-wide">
                      {article.subtitle[lang]}
                    </p>
                    <CardDescription className="text-sm leading-relaxed">
                      {article.description[lang]}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
