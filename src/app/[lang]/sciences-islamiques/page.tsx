import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ArrowLeft } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getSectionSlugs } from "@/lib/markdown";
import { sciencesCatalog, catalogHref } from "@/lib/section-catalog";
import { openGraphLocale, sectionIndexAlternates } from "@/lib/seo";

const pageCopy: Record<Locale, { metaTitle: string; metaDesc: string; description: string; badge: string; title: string; ctaTitle: string; ctaDesc: string; ctaBtn: string }> = {
  fr: {
    metaTitle: "Fondements | Rissala — Comprendre l'Islam Classique",
    metaDesc: "Fiqh, Sīra, hadith et écoles juridiques. Cursus sunnite structuré.",
    description: "Découvrez la construction de la tradition sunnite de manière progressive, structurée et académique. De l'histoire du Prophète à la formation des écoles juridiques.",
    badge: "Cursus Sunnite Complet • 5 Articles Fondamentaux",
    title: "Fondements",
    ctaTitle: "Une approche historique et systémique",
    ctaDesc: "Ce cursus n'est pas un recueil de dogmes déconnectés. C'est un voyage chronologique expliquant comment le message est né, a été transmis, filtré, puis interprété juridiquement au fil des siècles.",
    ctaBtn: "Commencer par le Fondement",
  },
  en: {
    metaTitle: "Islamic Foundations | Rissala",
    metaDesc: "Fiqh, sīra, hadith, and legal schools — a structured Sunni curriculum.",
    description: "Explore how the Sunni tradition was built — from the Prophet's life to the formation of legal schools.",
    badge: "Complete Sunni Course • 5 Core Articles",
    title: "Foundations",
    ctaTitle: "A historical and systematic approach",
    ctaDesc: "A chronological journey through how the message was born, transmitted, verified, and interpreted over centuries.",
    ctaBtn: "Start with the foundations",
  },
  ar: {
    metaTitle: "الأسس | رسالة",
    metaDesc: "فقه وسيرة وحديث ومذاهب — منهج سنّي منظّم.",
    description: "تعرّف على بناء التقليد السنّي من سيرة النبي إلى تشكّل المذاهب الفقهية.",
    badge: "مسار سنّي كامل • ٥ مقالات أساسية",
    title: "الأسس",
    ctaTitle: "منهج تاريخي ومنظوم",
    ctaDesc: "رحلة زمنية في ولادة الرسالة ونقلها وتحقيقها وتفسيرها عبر القرون.",
    ctaBtn: "ابدأ بالأساس",
  },
};

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = pageCopy[lang];
  const alternates = sectionIndexAlternates(lang, "sciences-islamiques");
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

export default async function SciencesIslamiquesIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const available = new Set(getSectionSlugs(lang, "sciences-islamiques"));
  const articles = sciencesCatalog.filter((a) => available.has(a.slug));
  const t = pageCopy[lang];
return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary/5 py-14 sm:py-18 lg:py-24 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">{t.title}</h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">{t.description}</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <BookOpen className="h-4 w-4" />
            <span>{t.badge}</span>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-10 sm:py-14 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="space-y-5">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={catalogHref(lang, "sciences-islamiques", article.slug)}
                className="group block p-5 sm:p-6 lg:p-8 rounded-xl border border-border/50 bg-background/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Number + Icon */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-sm font-bold">
                      {article.number}
                    </span>
                    <article.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h2 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {article.title[lang]}
                      </h2>
                      <span className="inline-flex px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {article.tag[lang]}
                      </span>
                    </div>
                    <p className="text-sm text-primary/80 font-medium mb-2">{article.subtitle[lang]}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{article.description[lang]}</p>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 hidden sm:flex items-center self-center">
                    <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology CTA */}
      <section className="py-10 sm:py-14 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <h2 className="text-xl sm:text-2xl font-bold font-heading mb-4">
            Une approche historique et <span className="text-primary">systémique</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {t.ctaDesc}
          </p>
          <Link
            href={catalogHref(lang, "sciences-islamiques", "islam-sunnite-sources")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            {t.ctaBtn}
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
