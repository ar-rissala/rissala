import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/lib/markdown";
import { ArticleLayout } from "@/components/layout/ArticleLayout";
import { MarkdownContent } from "@/components/articles/MarkdownContent";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || article.category !== 'sciences') return { title: "Article non trouvé" };

  return {
    title: `${article.title}${article.titleAccent ? ' : ' + article.titleAccent : ''} | Rissala`,
    description: article.description || article.subtitle,
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles
    .filter(a => a.category === 'sciences')
    .map((article) => ({
      slug: article.slug,
    }));
}

export default async function SciencesArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.category !== 'sciences') {
    notFound();
  }

  return (
    <ArticleLayout
      title={article.title}
      titleAccent={article.titleAccent}
      subtitle={article.subtitle}
      articleNumber={article.articleNumber || 0}
      totalArticles={article.totalArticles || 0}
      prevArticle={article.prevArticle}
      nextArticle={article.nextArticle}
    >
      <MarkdownContent content={article.content} />
    </ArticleLayout>
  );
}
