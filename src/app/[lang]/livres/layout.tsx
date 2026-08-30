import { Metadata } from "next";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const titles = {
    fr: "Bibliothèque Islamique & PDF | Rissala",
    en: "Islamic Library & PDF | Rissala",
    ar: "المكتبة الإسلامية و PDF | رسالة",
  };

  const descriptions = {
    fr: "Découvrez notre collection de livres, essais et ressources au format PDF.",
    en: "Discover our collection of books, essays, and resources in PDF format.",
    ar: "اكتشف مجموعتنا من الكتب والمقالات والموارد بصيغة PDF.",
  };

  return {
    title: titles[lang as keyof typeof titles],
    description: descriptions[lang as keyof typeof descriptions],
  };
}

export default function LivresLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
