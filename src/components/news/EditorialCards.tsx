import Link from "next/link";
import { Clock, Tag } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";
import type { ArticleData } from "@/lib/markdown";
import { Locale } from "@/lib/i18n";

interface ArticleCardProps {
  article: ArticleData;
  lang: Locale;
  className?: string;
}

export function ArticleHero({ article, lang, className = "" }: ArticleCardProps) {
  const categoryLabel = article.tag || "Économie";
  const image = article.image || `/images/${article.section}/default.jpg`;
  
  return (
    <Link href={`/${lang}/${article.section}/${article.slug}`} className={`group flex flex-col h-full cursor-pointer ${className}`}>
      <div className="relative w-full aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-xl mb-4 sm:mb-6">
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay"></div>
        <ImageWithFallback 
          src={image} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          fallbackSrc="/images/actualites/default-finance.jpg" 
        />
      </div>
      
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary mb-3">
          <span>{categoryLabel}</span>
          <span className="w-1 h-1 rounded-full bg-primary/50"></span>
          <span className="text-muted-foreground flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> 5 min</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold font-heading leading-tight mb-4 group-hover:text-primary transition-colors text-foreground">
          {article.title}
        </h2>
        
        <p className="text-base sm:text-lg text-muted-foreground line-clamp-3 leading-relaxed">
          {article.description || article.subtitle || "Découvrez cet article exclusif sur notre plateforme."}
        </p>
        
        <div className="mt-auto pt-6 flex items-center text-sm font-medium text-muted-foreground">
          <span>{new Date(article.date || "2026-08-19").toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>
    </Link>
  );
}

export function ArticleSecondary({ article, lang, className = "" }: ArticleCardProps) {
  const categoryLabel = article.tag || "Économie";
  const image = article.image || `/images/${article.section}/default.jpg`;

  return (
    <Link href={`/${lang}/${article.section}/${article.slug}`} className={`group flex flex-col h-full cursor-pointer ${className}`}>
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg mb-4">
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay"></div>
        <ImageWithFallback 
          src={image} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          fallbackSrc="/images/actualites/default-finance.jpg" 
        />
      </div>
      
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          <span>{categoryLabel}</span>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold font-heading leading-tight mb-2 group-hover:text-primary transition-colors text-foreground line-clamp-3">
          {article.title}
        </h3>
        
        <div className="mt-auto pt-3 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>{new Date(article.date || "2026-08-19").toLocaleDateString(lang, { day: 'numeric', month: 'short' })}</span>
          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> 5 min</span>
        </div>
      </div>
    </Link>
  );
}

export function ArticleStandard({ article, lang, className = "" }: ArticleCardProps) {
  const categoryLabel = article.tag || "Économie";
  const image = article.image || `/images/${article.section}/default.jpg`;

  return (
    <Link href={`/${lang}/${article.section}/${article.slug}`} className={`group flex flex-col h-full cursor-pointer ${className}`}>
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl mb-4">
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay"></div>
        <ImageWithFallback 
          src={image} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          fallbackSrc="/images/actualites/default-finance.jpg" 
        />
      </div>
      
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-2.5">
          <span>{categoryLabel}</span>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold font-heading leading-snug mb-3 group-hover:text-primary transition-colors text-foreground line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {article.description || article.subtitle || "Découvrez cet article exclusif."}
        </p>
        
        <div className="mt-auto pt-2 flex items-center justify-between text-xs font-medium text-muted-foreground border-t border-border/40">
          <span className="pt-3">{new Date(article.date || "2026-08-19").toLocaleDateString(lang, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <span className="flex items-center pt-3"><Clock className="w-3 h-3 mr-1" /> 5 min</span>
        </div>
      </div>
    </Link>
  );
}

export function ArticleCompact({ article, lang, className = "" }: ArticleCardProps) {
  const categoryLabel = article.tag || "Économie";
  const image = article.image || `/images/${article.section}/default.jpg`;

  return (
    <Link href={`/${lang}/${article.section}/${article.slug}`} className={`group flex flex-row items-center gap-4 sm:gap-6 cursor-pointer ${className}`}>
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay"></div>
        <ImageWithFallback 
          src={image} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          fallbackSrc="/images/actualites/default-finance.jpg" 
        />
      </div>
      
      <div className="flex flex-col py-1 flex-1">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
          <span>{categoryLabel}</span>
        </div>
        
        <h3 className="text-base sm:text-lg font-bold font-heading leading-tight mb-2 group-hover:text-primary transition-colors text-foreground line-clamp-2">
          {article.title}
        </h3>
        
        <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
          <span>{new Date(article.date || "2026-08-19").toLocaleDateString(lang, { day: 'numeric', month: 'short' })}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> 5 min</span>
        </div>
      </div>
    </Link>
  );
}

export function ArticleNoImage({ article, lang, className = "" }: ArticleCardProps) {
  const categoryLabel = article.tag || "Langue Arabe";

  return (
    <Link href={`/${lang}/${article.section}/${article.slug}`} className={`group flex flex-col h-full cursor-pointer p-6 rounded-xl border border-border/50 bg-background/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 ${className}`}>
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-3">
          <span>{categoryLabel}</span>
        </div>
        
        <h3 className="text-xl font-bold font-heading leading-snug mb-3 group-hover:text-primary transition-colors text-foreground line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6">
          {article.description || article.subtitle || "Découvrez cet article."}
        </p>
        
        <div className="mt-auto pt-4 flex items-center justify-between text-xs font-medium text-muted-foreground border-t border-border/40">
          <span>{new Date(article.date || "2026-08-19").toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>
    </Link>
  );
}
