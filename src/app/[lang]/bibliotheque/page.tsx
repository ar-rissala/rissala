import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getAllBooks } from "@/lib/books";
import { PageHero } from "@/components/ui/page-hero";
import { LibraryClient } from "@/components/library/LibraryClient";
import { RecentlyRead } from "@/components/library/RecentlyRead";

const pageCopy: Record<Locale, { metaTitle: string; metaDesc: string; description: string; titleMain: string; titleAccent: string; ctaTitle: string; ctaDesc: string; ctaBtn: string }> = {
  fr: {
    metaTitle: "Bibliothèque Islamique | Rissala",
    metaDesc: "Découvrez notre sélection de livres islamiques pour approfondir vos connaissances.",
    description: "Découvrez une sélection de livres pour approfondir vos connaissances.",
    titleMain: "Bibliothèque",
    titleAccent: "Islamique",
    ctaTitle: "Plongez dans des ouvrages fondamentaux pour enrichir votre foi et votre compréhension.",
    ctaDesc: "",
    ctaBtn: "Parcourir",
  },
  en: {
    metaTitle: "Islamic Library | Rissala",
    metaDesc: "Discover our selection of Islamic books to deepen your knowledge.",
    description: "Discover a selection of books to deepen your knowledge.",
    titleMain: "Islamic",
    titleAccent: "Library",
    ctaTitle: "A progressive and structured method",
    ctaDesc: "Dive into foundational works to enrich your faith and understanding.",
    ctaBtn: "Browse",
  },
  ar: {
    metaTitle: "المكتبة الإسلامية | رسالة",
    metaDesc: "اكتشف مجموعتنا من الكتب الإسلامية لتعميق معرفتك.",
    description: "اكتشف مجموعة من الكتب لتعميق معرفتك.",
    titleMain: "المكتبة",
    titleAccent: "الإسلامية",
    ctaTitle: "منهج تدريجي ومنظم",
    ctaDesc: "اغص في الأعمال الأساسية لإثراء إيمانك وفهمك.",
    ctaBtn: "تصفح",
  },
};

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = pageCopy[lang];
  return {
    title: t.metaTitle,
    description: t.metaDesc,
  };
}

export default async function BibliothequeIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  
  const books = getAllBooks();
  const t = pageCopy[lang];

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero 
        bgImage="/library-bg.jpg" 
        overlayClassName="bg-background/[0.55] dark:bg-background/[0.60]"
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">
            {t.titleMain} <span className="text-primary">{t.titleAccent}</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
            {t.description}
          </p>

        </div>
      </PageHero>

      <RecentlyRead lang={lang} />

      <section className="py-10 sm:py-14 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <LibraryClient books={books} lang={lang} />
        </div>
      </section>

      <section className="py-10 sm:py-14 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <h2 className="text-xl sm:text-2xl font-bold font-heading mb-4">
            {t.ctaTitle}
          </h2>
          {t.ctaDesc && (
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t.ctaDesc}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
