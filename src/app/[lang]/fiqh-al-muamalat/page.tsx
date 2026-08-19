import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ArrowLeft } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getSectionSlugs } from "@/lib/markdown";
import { financeCatalog, catalogHref } from "@/lib/section-catalog";
import { openGraphLocale, sectionIndexAlternates } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";

const pageCopy: Record<Locale, { metaTitle: string; metaDesc: string; description: string; badge: string; titleMain: string; titleAccent: string; ctaTitle: string; ctaDesc: string; ctaBtn: string }> = {
  fr: {
    metaTitle: "fiqh al-muamalat | Rissala — Jurisprudence des Transactions",
    metaDesc: "Fiqh al-muamalat : commerce, ribā, zakāt et finance moderne.",
    description: "Découvrez le fiqh al-muamalat : la jurisprudence des transactions. Un système économique complet visant l'équité, le partage des risques et la connexion avec l'économie réelle.",
    badge: "Cursus Économique Complet • 6 Articles Fondamentaux",
    titleMain: "fiqh",
    titleAccent: "al-muamalat",
    ctaTitle: "Du fiqh classique à l'application moderne",
    ctaDesc: "L'économie islamique n'est pas qu'une série d'interdits. C'est une vision éthique du commerce où la rentabilité s'allie à la justice sociale.",
    ctaBtn: "Commencer par le Fondement",
  },
  en: {
    metaTitle: "Fiqh al-Mu'amalat | Rissala",
    metaDesc: "Fiqh al-muamalat: trade, ribā, zakāt, and modern finance.",
    description: "Explore fiqh al-muamalat — transactional jurisprudence built on equity, shared risk, and real-economy ties.",
    badge: "Complete Economic Course • 6 Core Articles",
    titleMain: "Fiqh",
    titleAccent: "al-Mu'amalat",
    ctaTitle: "From classical fiqh to modern application",
    ctaDesc: "Islamic economics is not only prohibitions — it is an ethical vision of trade where profit meets social justice.",
    ctaBtn: "Start with the foundations",
  },
  ar: {
    metaTitle: "فقه المعاملات | رسالة",
    metaDesc: "فقه المعاملات: البيع والربا والزكاة والتمويل الحديث.",
    description: "تعرّف على فقه المعاملات — نظام اقتصادي يهدف إلى العدالة وتقاسم المخاطر والربط بالاقتصاد الحقيقي.",
    badge: "مسار اقتصادي كامل • ٦ مقالات أساسية",
    titleMain: "فقه",
    titleAccent: "المعاملات",
    ctaTitle: "من الفقه الكلاسيكي إلى التطبيق الحديث",
    ctaDesc: "الاقتصاد الإسلامي ليس مجرد محظورات — بل رؤية أخلاقية للتجارة تجمع الربح والعدالة.",
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
  const alternates = sectionIndexAlternates(lang, "fiqh-al-muamalat");
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

export default async function FinanceIslamiqueIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const available = new Set(getSectionSlugs(lang, "fiqh-al-muamalat"));
  const articles = financeCatalog.filter((a) => available.has(a.slug));
  const t = pageCopy[lang];
return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <PageHero>
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">
            {t.titleMain}{" "}<span className="text-primary">{t.titleAccent}</span></h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">{t.description}</p>

        </div>
      </PageHero>

      {/* Articles Grid */}
      <section className="py-10 sm:py-14 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="space-y-5">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={catalogHref(lang, "fiqh-al-muamalat", article.slug)}
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
            {t.ctaTitle}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {t.ctaDesc}
          </p>
          <Link
            href={catalogHref(lang, "fiqh-al-muamalat", "fondements-commerce-islam")}
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
