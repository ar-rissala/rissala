import fs from "fs";
import path from "path";

const root = "c:/Users/DAD/Desktop/rissala";

const apprendre = `import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { isLocale, type Locale } from "@/lib/i18n";
import { getSectionSlugs } from "@/lib/markdown";
import { apprendreArabeCatalog, catalogHref } from "@/lib/section-catalog";

const copy: Record<Locale, { title: React.ReactNode; description: string; badge: string; metaTitle: string; metaDesc: string }> = {
  fr: {
    title: <>Langue <span className="text-primary">Arabe</span></>,
    description: "Découvrez notre méthode d'apprentissage de la langue arabe, clé essentielle pour comprendre les sciences.",
    badge: "Cursus Arabe Complet • 5 Articles Fondamentaux",
    metaTitle: "Langue Arabe | Rissala",
    metaDesc: "Découvrez notre méthode pour apprendre la langue arabe, clé essentielle pour comprendre les sciences.",
  },
  en: {
    title: <>Arabic <span className="text-primary">Language</span></>,
    description: "Discover our method for learning Arabic — the essential key to understanding the Islamic sciences.",
    badge: "Complete Arabic Course • 5 Core Articles",
    metaTitle: "Arabic Language | Rissala",
    metaDesc: "Learn Arabic with the Rissala method — structured articles from alphabet to reading.",
  },
  ar: {
    title: <>اللغة <span className="text-primary">العربية</span></>,
    description: "تعرّف على منهجنا لتعلّم العربية — المفتاح لفهم العلوم الشرعية.",
    badge: "مسار عربي كامل • ٥ مقالات أساسية",
    metaTitle: "اللغة العربية | رسالة",
    metaDesc: "تعلّم العربية بمنهج رسالة — من الأبجدية إلى القراءة.",
  },
};

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = copy[lang];
  return { title: t.metaTitle, description: t.metaDesc };
}

export default async function ApprendreArabeIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const available = new Set(getSectionSlugs(lang, "apprendre-arabe"));
  const articles = apprendreArabeCatalog.filter((a) => available.has(a.slug));
  const t = copy[lang];
  return (
    <motionBackLink lang={lang} section="apprendre-arabe" />
  );
}
`;

// Fix: write proper JSX return - I'll build the return body separately
const gridBody = (section, catalog) => `
  const available = new Set(getSectionSlugs(lang, "${section}"));
  const articles = ${catalog}.filter((a) => available.has(a.slug));
  const t = copy[lang];
  return (
    <motionBackLink />
  );
`;

console.log("use manual write");
