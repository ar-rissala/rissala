import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface ArticleData {
  slug: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  description?: string;
  date: string;
  category: string;
  tag?: string;
  articleNumber?: number;
  totalArticles?: number;
  prevArticle?: { href: string; title: string };
  nextArticle?: { href: string; title: string };
  content: string;
  [key: string]: any;
}

export function getArticleBySlug(slug: string): ArticleData | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title || '',
      titleAccent: data.titleAccent,
      subtitle: data.subtitle,
      description: data.description,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      category: data.category || '',
      tag: data.tag,
      articleNumber: data.articleNumber,
      totalArticles: data.totalArticles,
      prevArticle: data.prevArticle,
      nextArticle: data.nextArticle,
      ...data,
    } as ArticleData;
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

export function getAllArticles(): ArticleData[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      return getArticleBySlug(slug);
    })
    .filter((article): article is ArticleData => article !== null);

  return allArticlesData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticlesByCategory(category: string): ArticleData[] {
  return getAllArticles().filter((article) => article.category === category);
}
