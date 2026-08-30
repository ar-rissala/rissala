import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { isLocale } from "@/lib/i18n";
import { format } from "date-fns";
import { fr, enUS, ar } from "date-fns/locale";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: { lang: string, slug: string } }) {
  const { lang, slug } = params;
  if (!isLocale(lang)) return {};

  const article = await fetchQuery(api.articles.getBySlug, { slug });
  if (!article) return {};

  const title = (article.seoTitle as any)[lang] || (article.title as any)[lang] || article.title.fr;
  const description = (article.seoDescription as any)[lang] || (article.excerpt as any)[lang] || article.excerpt.fr;

  return {
    title: `${title} | Rissala`,
    description,
    openGraph: {
      title,
      description,
      images: article.coverUrl ? [article.coverUrl] : [],
    },
  };
}

export default async function ArticlePage({ params }: { params: { lang: string, slug: string } }) {
  const { lang, slug } = params;
  if (!isLocale(lang)) notFound();

  const article = await fetchQuery(api.articles.getBySlug, { slug });

  if (!article || article.status !== "published") {
    notFound();
  }

  const title = (article.title as any)[lang] || article.title.fr;
  const content = (article.content as any)[lang] || article.content.fr;
  const categoryName = article.category?.name[lang as "fr" | "en" | "ar"] || article.category?.name.fr || "";

  const dateLocale = lang === "fr" ? fr : lang === "en" ? enUS : ar;
  const dateStr = format(new Date(article.publishedAt || article.createdAt), "dd MMMM yyyy", { locale: dateLocale });

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href={`/${lang}/actualites`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Retour aux actualités
      </Link>

      <header className="mb-10 text-center">
        {categoryName && (
          <div className="mb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
              {categoryName}
            </span>
          </div>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-heading leading-tight mb-4 text-foreground">
          {title}
        </h1>
        <div className="text-sm text-muted-foreground flex items-center justify-center gap-4">
          <span>{dateStr}</span>
          <span>•</span>
          <span>Par {article.author?.name || "Rissala"}</span>
        </div>
      </header>

      {article.coverUrl && (
        <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-border/50">
          <img src={article.coverUrl} alt={title} className="w-full h-auto object-cover max-h-[500px]" />
        </div>
      )}

      {/* Rendu du contenu HTML généré par TipTap */}
      <div 
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl"
        dir={lang === "ar" ? "rtl" : "ltr"}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
