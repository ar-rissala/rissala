import fs from "fs";

function patchSciences() {
  const file = "c:/Users/DAD/Desktop/rissala/src/app/[lang]/sciences-islamiques/page.tsx";
  let s = fs.readFileSync(file, "utf8");
  const header = `import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ArrowLeft } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getSectionSlugs } from "@/lib/markdown";
import { sciencesCatalog, catalogHref } from "@/lib/section-catalog";

const pageCopy: Record<Locale, { metaTitle: string; metaDesc: string; description: string; badge: string; title: string; ctaTitle: string; ctaDesc: string; ctaBtn: string }> = {
  fr: {
    metaTitle: "Sciences | Rissala — Comprendre l'Islam Classique",
    metaDesc: "Fiqh, Sīra, hadith et écoles juridiques. Cursus sunnite structuré.",
    description: "Découvrez la construction de la tradition sunnite de manière progressive, structurée et académique. De l'histoire du Prophète à la formation des écoles juridiques.",
    badge: "Cursus Sunnite Complet • 5 Articles Fondamentaux",
    title: "Sciences",
    ctaTitle: "Une approche historique et systémique",
    ctaDesc: "Ce cursus n'est pas un recueil de dogmes déconnectés. C'est un voyage chronologique expliquant comment le message est né, a été transmis, filtré, puis interprété juridiquement au fil des siècles.",
    ctaBtn: "Commencer par le Fondement",
  },
  en: {
    metaTitle: "Islamic Sciences | Rissala",
    metaDesc: "Fiqh, sīra, hadith, and legal schools — a structured Sunni curriculum.",
    description: "Explore how the Sunni tradition was built — from the Prophet's life to the formation of legal schools.",
    badge: "Complete Sunni Course • 5 Core Articles",
    title: "Sciences",
    ctaTitle: "A historical and systematic approach",
    ctaDesc: "A chronological journey through how the message was born, transmitted, verified, and interpreted over centuries.",
    ctaBtn: "Start with the foundations",
  },
  ar: {
    metaTitle: "العلوم الشرعية | رسالة",
    metaDesc: "فقه وسيرة وحديث ومذاهب — منهج سنّي منظّم.",
    description: "تعرّف على بناء التقليد السنّي من سيرة النبي إلى تشكّل المذاهب الفقهية.",
    badge: "مسار سنّي كامل • ٥ مقالات أساسية",
    title: "العلوم",
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
  return { title: t.metaTitle, description: t.metaDesc };
}

export default async function SciencesIslamiquesIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const available = new Set(getSectionSlugs(lang, "sciences-islamiques"));
  const articles = sciencesCatalog.filter((a) => available.has(a.slug));
  const t = pageCopy[lang];
`;

  const idx = s.indexOf("export default function");
  const bodyStart = s.indexOf("return (", idx);
  const body = s.slice(bodyStart);
  let body2 = body
    .replace(
      /<h1[^>]*>[\s\S]*?<\/h1>/,
      `<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">{t.title}</h1>`
    )
    .replace(
      /<p className="text-base sm:text-lg text-muted-foreground[\s\S]*?<\/p>/,
      `<p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">{t.description}</p>`
    )
    .replace(
      /<span>Cursus Sunnite Complet[\s\S]*?<\/span>/,
      "<span>{t.badge}</span>"
    )
    .replace(/key={article\.number}/g, "key={article.slug}")
    .replace(/href={article\.href}/g, 'href={catalogHref(lang, "sciences-islamiques", article.slug)}')
    .replace(/\{article\.title\}/g, "{article.title[lang]}")
    .replace(/\{article\.tag\}/g, "{article.tag[lang]}")
    .replace(/\{article\.subtitle\}/g, "{article.subtitle[lang]}")
    .replace(/\{article\.description\}/g, "{article.description[lang]}")
    .replace(
      'href="/sciences/islam-sunnite-sources"',
      'href={catalogHref(lang, "sciences-islamiques", "islam-sunnite-sources")}'
    )
    .replace(
      "Du fiqh classique à <span className=\"text-primary\">l&apos;application moderne</span>",
      "{t.ctaTitle}"
    )
    .replace(
      "Ce cursus n&apos;est pas un recueil de dogmes déconnectés. C&apos;est un voyage chronologique expliquant <strong>comment</strong> le message est né, a été transmis, filtré, puis interprété juridiquement au fil des siècles.",
      "{t.ctaDesc}"
    )
    .replace("Commencer par le Fondement", "{t.ctaBtn}");

  fs.writeFileSync(file, header + body2);
}

function patchFinance() {
  const file = "c:/Users/DAD/Desktop/rissala/src/app/[lang]/finance-islamique/page.tsx";
  let s = fs.readFileSync(file, "utf8");
  const header = `import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ArrowLeft } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
import { getSectionSlugs } from "@/lib/markdown";
import { financeCatalog, catalogHref } from "@/lib/section-catalog";

const pageCopy: Record<Locale, { metaTitle: string; metaDesc: string; description: string; badge: string; titleMain: string; titleAccent: string; ctaTitle: string; ctaDesc: string; ctaBtn: string }> = {
  fr: {
    metaTitle: "Finance Islamique | Rissala — Jurisprudence des Transactions",
    metaDesc: "Fiqh al-muʿāmalāt : commerce, ribā, zakāt et finance moderne.",
    description: "Découvrez le fiqh al-muʿāmalāt : la jurisprudence des transactions. Un système économique complet visant l'équité, le partage des risques et la connexion avec l'économie réelle.",
    badge: "Cursus Économique Complet • 6 Articles Fondamentaux",
    titleMain: "Finance",
    titleAccent: "Islamique",
    ctaTitle: "Du fiqh classique à l'application moderne",
    ctaDesc: "L'économie islamique n'est pas qu'une série d'interdits. C'est une vision éthique du commerce où la rentabilité s'allie à la justice sociale.",
    ctaBtn: "Commencer par le Fondement",
  },
  en: {
    metaTitle: "Islamic Finance | Rissala",
    metaDesc: "Fiqh al-muʿāmalāt: trade, ribā, zakāt, and modern finance.",
    description: "Explore fiqh al-muʿāmalāt — transactional jurisprudence built on equity, shared risk, and real-economy ties.",
    badge: "Complete Economic Course • 6 Core Articles",
    titleMain: "Islamic",
    titleAccent: "Finance",
    ctaTitle: "From classical fiqh to modern application",
    ctaDesc: "Islamic economics is not only prohibitions — it is an ethical vision of trade where profit meets social justice.",
    ctaBtn: "Start with the foundations",
  },
  ar: {
    metaTitle: "التمويل الإسلامي | رسالة",
    metaDesc: "فقه المعاملات: البيع والربا والزكاة والتمويل الحديث.",
    description: "تعرّف على فقه المعاملات — نظام اقتصادي يهدف إلى العدالة وتقاسم المخاطر والربط بالاقتصاد الحقيقي.",
    badge: "مسار اقتصادي كامل • ٦ مقالات أساسية",
    titleMain: "التمويل",
    titleAccent: "الإسلامي",
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
  return { title: t.metaTitle, description: t.metaDesc };
}

export default async function FinanceIslamiqueIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const available = new Set(getSectionSlugs(lang, "finance-islamique"));
  const articles = financeCatalog.filter((a) => available.has(a.slug));
  const t = pageCopy[lang];
`;

  const idx = s.indexOf("export default function");
  const bodyStart = s.indexOf("return (", idx);
  const body = s.slice(bodyStart);
  let body2 = body
    .replace(
      /Finance\{" "\}[\s\S]*?<\/h1>/,
      `{t.titleMain}{" "}<span className="text-primary">{t.titleAccent}</span></h1>`
    )
    .replace(
      /<p className="text-base sm:text-lg text-muted-foreground[\s\S]*?<\/p>/,
      `<p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">{t.description}</p>`
    )
    .replace(/<span>Cursus Économique[\s\S]*?<\/span>/, "<span>{t.badge}</span>")
    .replace(/key={article\.number}/g, "key={article.slug}")
    .replace(/href={article\.href}/g, 'href={catalogHref(lang, "finance-islamique", article.slug)}')
    .replace(/\{article\.title\}/g, "{article.title[lang]}")
    .replace(/\{article\.tag\}/g, "{article.tag[lang]}")
    .replace(/\{article\.subtitle\}/g, "{article.subtitle[lang]}")
    .replace(/\{article\.description\}/g, "{article.description[lang]}")
    .replace(
      'href="/finance-islamique/fondements-commerce-islam"',
      'href={catalogHref(lang, "finance-islamique", "fondements-commerce-islam")}'
    )
    .replace(
      "Du fiqh classique à <span className=\"text-primary\">l&apos;application moderne</span>",
      "{t.ctaTitle}"
    )
    .replace(
      "L&apos;économie islamique n&apos;est pas qu&apos;une série d&apos;interdits. C&apos;est une vision éthique du commerce où la rentabilité s&apos;allie à la justice sociale. Commencez par comprendre les fondements spirituels du commerce.",
      "{t.ctaDesc}"
    )
    .replace("Commencer par le Fondement", "{t.ctaBtn}");

  fs.writeFileSync(file, header + body2);
}

patchSciences();
patchFinance();
console.log("patched");
