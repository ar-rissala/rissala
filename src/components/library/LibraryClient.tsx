"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  BOOK_CATEGORIES,
  type BookCategory,
  categoryLabels,
  type Book,
  filterBooks,
} from "@/lib/books";
import { BookCard } from "./BookCard";

interface LibraryClientProps {
  books: Book[];
  lang: string;
}

/**
 * Wrapper client combinant filtres + recherche + grille.
 * Séparé pour garder la page serveur pure (SSR-friendly).
 */
export function LibraryClient({ books, lang }: LibraryClientProps) {
  const [activeCategory, setActiveCategory] = useState<BookCategory>("tous");
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Book[]>(books);

  // Re-filter whenever category or query changes
  useEffect(() => {
    setFiltered(filterBooks(books, activeCategory, query));
  }, [books, activeCategory, query]);

  const clearSearch = useCallback(() => setQuery(""), []);

  const catLabel = (cat: BookCategory) =>
    categoryLabels[cat]?.[lang as "fr" | "en" | "ar"] ??
    categoryLabels[cat]?.fr ??
    cat;

  return (
    <div className="space-y-8">
      {/* ── Search bar ── */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          id="library-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un livre, un auteur…"
          aria-label="Rechercher un livre"
          className="w-full h-12 pl-11 pr-10 rounded-xl border border-border/60 bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
        {query && (
          <button
            onClick={clearSearch}
            aria-label="Effacer la recherche"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/60 transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* ── Category filters ── */}
      <div
        role="group"
        aria-label="Filtrer par catégorie"
        className="flex flex-wrap gap-2 justify-center"
      >
        {BOOK_CATEGORIES.map((cat) => (
          <button
            key={cat}
            id={`filter-${cat}`}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                : "bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
            }`}
          >
            {activeCategory === cat && (
              <motion.span
                layoutId="active-filter"
                className="absolute inset-0 rounded-full bg-primary"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {catLabel(cat)}
          </button>
        ))}
      </div>

      {/* ── Results count ── */}
      <p className="text-center text-sm text-muted-foreground">
        {filtered.length === 0
          ? "Aucun livre trouvé."
          : filtered.length === 1
          ? "1 livre"
          : `${filtered.length} livres`}
        {query && (
          <span>
            {" "}
            pour{" "}
            <span className="text-foreground font-medium">«&nbsp;{query}&nbsp;»</span>
          </span>
        )}
      </p>

      {/* ── Books grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filtered.map((book, i) => (
            <BookCard key={book.id} book={book} lang={lang} index={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4 py-20 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
            <Search className="h-7 w-7 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">Aucun résultat</p>
            <p className="text-sm text-muted-foreground">
              Essayez avec d'autres mots-clés ou une autre catégorie.
            </p>
          </div>
          <button
            onClick={() => {
              setQuery("");
              setActiveCategory("tous");
            }}
            className="text-sm text-primary hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </motion.div>
      )}
    </div>
  );
}
