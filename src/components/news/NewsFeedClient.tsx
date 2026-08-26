"use client";

import { useState, useMemo, useRef } from "react";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ArticleData } from "@/lib/markdown";
import type { Locale } from "@/lib/i18n";
import {
  ArticleHero,
  ArticleSecondary,
  ArticleStandard,
  ArticleCompact,
} from "./EditorialCards";
import { Button } from "@/components/ui/button";

interface NewsFeedClientProps {
  initialArticles: ArticleData[];
  lang: Locale;
}

const CATEGORIES = [
  { id: "all", label: "Toutes les actualités" },
  { id: "banque", label: "Banques & Institutions" },
  { id: "monnaie", label: "Création monétaire" },
  { id: "crypto", label: "Crypto & Bitcoin" },
  { id: "investissement", label: "Investissement & Sukuk" },
];

export default function NewsFeedClient({ initialArticles, lang }: NewsFeedClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleArchiveCount, setVisibleArchiveCount] = useState(12);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const articleTag = (article.tag || "").toLowerCase();
      const isMatch = (catId: string) => {
        if (catId === "all") return true;
        if (catId === "banque") return articleTag.includes("banque") || articleTag.includes("institution");
        if (catId === "monnaie") return articleTag.includes("monnaie") || articleTag.includes("création");
        if (catId === "crypto") return articleTag.includes("crypto") || articleTag.includes("bitcoin") || articleTag.includes("btc");
        if (catId === "investissement") return articleTag.includes("investissement") || articleTag.includes("sukuk") || articleTag.includes("finance");
        return false;
      };

      const matchCategory = isMatch(selectedCategory);
      const matchSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.description &&
          article.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [initialArticles, selectedCategory, searchQuery]);

  const isEditorialLayout = selectedCategory === "all" && searchQuery === "";

  const latestArticles = initialArticles.slice(0, 10);
  const heroArticle = latestArticles[0];
  const secondaryArticles = latestArticles.slice(1, 3);
  const feedArticles = latestArticles.slice(3, 10);

  const archiveArticles = filteredArticles.slice(0, visibleArchiveCount);
  const hasMoreArchive = visibleArchiveCount < filteredArticles.length;

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full">
      {/* Header avec Titre et Recherche sur la même ligne */}
      <div className="mb-4 border-b border-border/50 pb-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground w-full md:w-auto">
            {isEditorialLayout ? "À la une" : (searchQuery ? `Résultats pour "${searchQuery}"` : "Archive des actualités")}
          </h2>
          <div className="relative w-full md:w-auto md:min-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-muted/30 border border-border/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {isEditorialLayout ? (
        <>
          {/* SECTION : À LA UNE */}
          {heroArticle && (
            <section className="mb-10 sm:mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                <div className="lg:col-span-8">
                  <ArticleHero article={heroArticle} lang={lang} />
                </div>
                <div className="lg:col-span-4 flex flex-col gap-8 sm:grid sm:grid-cols-2 lg:flex lg:flex-col lg:gap-6">
                  {secondaryArticles.map((article) => (
                    <ArticleSecondary key={article.slug} article={article} lang={lang} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* SECTION : DERNIÈRES ACTUALITÉS (Slider Éditorial) */}
          {feedArticles.length > 0 && (
            <section className="mb-16 sm:mb-24">
              <div className="flex items-center justify-between mb-8 border-b border-border/50 pb-2">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Dernières actualités</h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => scrollCarousel('left')}
                    className="p-1.5 rounded-full bg-muted/50 text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => scrollCarousel('right')}
                    className="p-1.5 rounded-full bg-muted/50 text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div 
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 sm:gap-6 pb-4 -mx-4 px-4 lg:mx-0 lg:px-0"
              >
                {feedArticles.map((article) => (
                  <div key={article.slug} className="w-[260px] sm:w-[300px] lg:w-[320px] snap-start shrink-0">
                    <ArticleStandard article={article} lang={lang} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        /* ARCHIVE (Recherche ou Filtre actif) */
        <section className="mb-16 sm:mb-24">
          
          {filteredArticles.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-xl text-muted-foreground">Aucun article ne correspond à votre recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {archiveArticles.map((article) => (
                <ArticleStandard key={article.slug} article={article} lang={lang} />
              ))}
            </div>
          )}
          
          {hasMoreArchive && (
            <div className="mt-16 flex justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setVisibleArchiveCount(prev => prev + 12)}
                className="px-8"
              >
                Charger plus d'articles
              </Button>
            </div>
          )}
        </section>
      )}
      
      {/* SECTION FINALE : ARCHIVE COMPLÈTE (si on est en layout éditorial) */}
      {isEditorialLayout && (
        <section className="border-t border-border/40 pt-16 mb-16 sm:mb-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black font-heading uppercase tracking-tight">Toutes les actualités</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
             {initialArticles.slice(0, visibleArchiveCount).map((article) => (
                <ArticleCompact key={article.slug} article={article} lang={lang} />
             ))}
          </div>
          
          {visibleArchiveCount < initialArticles.length && (
            <div className="mt-12 flex justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setVisibleArchiveCount(prev => prev + 12)}
                className="px-8"
              >
                Explorer plus d'archives
              </Button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
