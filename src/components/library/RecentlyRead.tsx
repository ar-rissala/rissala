"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ChevronRight } from "lucide-react";
import { getReadingHistory, mockBooks, type ReadingProgress } from "@/lib/books";
import { motion } from "framer-motion";

interface RecentlyReadProps {
  lang: string;
}

/**
 * Section "Continuer ma lecture" alimentée par localStorage.
 * Se monte uniquement côté client. Ne s'affiche pas si aucun historique.
 */
export function RecentlyRead({ lang }: RecentlyReadProps) {
  const [history, setHistory] = useState<ReadingProgress[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setHistory(getReadingHistory());
    setMounted(true);
  }, []);

  if (!mounted || history.length === 0) return null;

  const recentBooks = history
    .map((h) => {
      const book = mockBooks.find((b) => b.id === h.bookId);
      return book ? { book, progress: h } : null;
    })
    .filter(Boolean) as { book: (typeof mockBooks)[0]; progress: ReadingProgress }[];

  if (recentBooks.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-10 border-t border-border/50"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold font-heading">Continuer ma lecture</h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {recentBooks.map(({ book, progress }) => {
            const pct =
              progress.totalPages > 0
                ? Math.round((progress.lastPage / progress.totalPages) * 100)
                : 0;

            return (
              <Link
                key={book.id}
                href={`/${lang}/bibliotheque/${book.id}?page=${progress.lastPage}`}
                className="group snap-start shrink-0 w-36 sm:w-44 flex flex-col rounded-xl border border-border/50 bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Cover */}
                <div className="relative aspect-[3/4] overflow-hidden bg-muted/30">
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    title={book.title}
                    fill
                    sizes="180px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-2">
                  <p className="text-xs font-semibold text-foreground line-clamp-2 leading-snug">
                    {book.title}
                  </p>

                  {/* Progress bar */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                      <span>Page {progress.lastPage}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-border/50 overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-primary font-medium group-hover:gap-2 transition-all">
                    <span>Reprendre</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
