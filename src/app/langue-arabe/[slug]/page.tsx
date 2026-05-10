import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticleBySlug, getAllArticles } from "@/lib/markdown";
import { MarkdownContent } from "@/components/articles/MarkdownContent";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || article.category !== 'langue-arabe') return { title: "Article non trouvé" };

  return {
    title: `${article.title} | Langue Arabe`,
    description: article.description || article.subtitle,
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(a => a.category === 'langue-arabe')
    .map((article) => ({
      slug: article.slug,
    }));
}

export default async function LangueArabeArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.category !== 'langue-arabe') {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 lg:px-8 py-10 max-w-4xl">
      <div className="mb-8">
        <Link href="/langue-arabe" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au programme
        </Link>
      </div>

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-heading text-foreground">
          {article.title}
        </h1>
        {article.subtitle && (
          <p className="text-xl text-muted-foreground">{article.subtitle}</p>
        )}
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
        <MarkdownContent content={article.content} />
      </div>
    </article>
  );
}
