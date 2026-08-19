import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { openGraphLocale, sectionIndexAlternates } from "@/lib/seo";
import { PageHero } from "@/components/ui/page-hero";

const pageCopy: Record<Locale, { metaTitle: string; metaDesc: string; title: string; subtitle: string; description: string }> = {
  fr: {
    metaTitle: "Sciences Islamiques | Rissala",
    metaDesc: "Hub d'orientation des sciences islamiques : Fiqh, Hadith, Tafsir, Sîra.",
    title: "SCIENCES ISLAMIQUES",
    subtitle: "Hub d'orientation",
    description: "Explorez notre cursus structuré et accédez directement aux différentes branches du savoir islamique. Sélectionnez une discipline pour commencer votre étude.",
  },
  en: {
    metaTitle: "Islamic Sciences | Rissala",
    metaDesc: "Orientation hub for Islamic Sciences: Fiqh, Hadith, Tafsir, Sira.",
    title: "ISLAMIC SCIENCES",
    subtitle: "Orientation Hub",
    description: "Explore our structured curriculum and directly access the different branches of Islamic knowledge. Select a discipline to begin your study.",
  },
  ar: {
    metaTitle: "العلوم الإسلامية | رسالة",
    metaDesc: "مركز التوجيه للعلوم الإسلامية: فقه، حديث، تفسير، سيرة.",
    title: "العلوم الإسلامية",
    subtitle: "مركز التوجيه",
    description: "استكشف منهجنا المنظم وقم بالوصول المباشر إلى مختلف فروع المعرفة الإسلامية. اختر تخصصًا لتبدأ دراستك.",
  },
};

const themes = [
  {
    title: "FONDEMENTS",
    desc: "Les bases essentielles des sciences islamiques.",
    link: "/fondements", // subpage
    isSubpage: true,
  },
  {
    title: "FIQH",
    desc: "Les règles et principes du droit islamique.",
    link: "/fiqh",
    isSubpage: true,
  },
  {
    title: "HADITH",
    desc: "Étude et compréhension des hadiths.",
    link: "/hadith",
    isSubpage: true,
  },
  {
    title: "TAFSIR",
    desc: "Approfondir la compréhension du Coran.",
    link: "/tafsir",
    isSubpage: true,
  },
  {
    title: "SÎRA",
    desc: "La vie du Prophète ﷺ et son contexte.",
    link: "/sira",
    isSubpage: true,
  },
  {
    title: "HISTOIRE ISLAMIQUE",
    desc: "Les grandes périodes et événements de l'histoire.",
    link: "/histoire",
    isSubpage: true,
  }
];

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

export default async function SciencesIslamiquesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = pageCopy[lang];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHero 
        bgImage="/islamic-pattern-bg.jpg" 
        overlayClassName="bg-background/[0.75] dark:bg-background/[0.80]"
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight font-heading mb-6">
            SCIENCES <span className="text-primary">ISLAMIQUES</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>
      </PageHero>

      <div className="container mx-auto px-4 lg:px-8 py-16 sm:py-24 max-w-4xl">
        {/* Editorial List */}
        <div className="flex flex-col border-t border-border/50">
          {themes.map((theme, index) => {
            const number = String(index + 1).padStart(2, '0');
            return (
              <Link 
                key={theme.link}
                href={theme.isSubpage ? `/${lang}/sciences-islamiques${theme.link}` : `/${lang}/sciences-islamiques#${theme.link}`}
                className="group flex flex-col sm:flex-row sm:items-start py-8 sm:py-10 border-b border-border/50 hover:bg-primary/5 transition-colors -mx-4 px-4 sm:mx-0 sm:px-6 rounded-lg sm:rounded-none"
              >
                <div className="flex items-center justify-between sm:w-full">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-12 flex-1">
                    <div className="flex items-baseline gap-6 sm:w-64 shrink-0 mb-2 sm:mb-0">
                      <span className="text-xl font-medium text-muted-foreground/50 font-mono">
                        {number}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black tracking-tight group-hover:text-primary transition-colors">
                        {theme.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground sm:text-lg pl-12 sm:pl-0 pr-4">
                      {theme.desc}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1 sm:mt-0" />
                </div>
              </Link>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
