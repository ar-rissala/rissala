import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

interface ArticleNavItem {
  href: string;
  title: string;
}

interface ArticleLayoutProps {
  children: React.ReactNode;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  prevArticle?: ArticleNavItem;
  nextArticle?: ArticleNavItem;
  articleNumber: number;
  totalArticles: number;
}

export function ArticleLayout({
  children,
  title,
  titleAccent,
  subtitle,
  prevArticle,
  nextArticle,
  articleNumber,
  totalArticles,
}: ArticleLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary/5 py-14 sm:py-18 lg:py-24 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <BookOpen className="h-4 w-4" />
            <span>Méthode Rissala — Article {articleNumber}/{totalArticles}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">
            {title}{" "}
            {titleAccent && <span className="text-primary">{titleAccent}</span>}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="py-10 sm:py-14 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <article className="prose-article">
            {children}
          </article>
        </div>
      </section>

      {/* Article Navigation */}
      <section className="border-t border-border/50 py-8 sm:py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {prevArticle ? (
              <Link
                href={prevArticle.href}
                className="group flex items-center gap-3 p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors duration-300 flex-1"
              >
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground mb-1">Article précédent</div>
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">{prevArticle.title}</div>
                </div>
              </Link>
            ) : (
              <Link
                href="/apprendre-arabe"
                className="group flex items-center gap-3 p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors duration-300 flex-1"
              >
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground mb-1">Retour</div>
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">Hub Apprendre l&apos;Arabe</div>
                </div>
              </Link>
            )}

            {nextArticle ? (
              <Link
                href={nextArticle.href}
                className="group flex items-center gap-3 p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors duration-300 flex-1 sm:text-right"
              >
                <div className="flex-1 text-left sm:text-right">
                  <div className="text-xs text-muted-foreground mb-1">Article suivant</div>
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">{nextArticle.title}</div>
                </div>
                <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </Link>
            ) : (
              <Link
                href="/apprendre-arabe"
                className="group flex items-center gap-3 p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-colors duration-300 flex-1 sm:text-right"
              >
                <div className="flex-1 text-left sm:text-right">
                  <div className="text-xs text-muted-foreground mb-1">Terminé</div>
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">Retour au Hub</div>
                </div>
                <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
