"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, User, FileText, ChevronRight } from "lucide-react";
import { type Book, categoryLabels } from "@/lib/books";

interface BookCardProps {
  book: Book;
  lang: string;
  index?: number;
}

export function BookCard({ book, lang, index = 0 }: BookCardProps) {
  const catLabel =
    categoryLabels[book.category]?.[lang as "fr" | "en" | "ar"] ??
    categoryLabels[book.category]?.fr ??
    book.category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className="group relative flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
    >
      {/* Cover image */}
      <Link
        href={`/${lang}/bibliotheque/${book.id}`}
        className="relative block aspect-[3/4] overflow-hidden bg-muted/30 shrink-0"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={book.coverUrl}
          alt={`Couverture de ${book.title}`}
          title={`Couverture de ${book.title}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => {}}
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge — visible on hover */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold backdrop-blur-sm">
            {catLabel}
          </span>
        </div>

        {/* Featured ribbon */}
        {book.featured && (
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[48px] border-l-[48px] border-t-primary border-l-transparent" />
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category visible on mobile / always */}
        <span className="inline-flex items-center gap-1 self-start px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
          <BookOpen className="h-3 w-3" />
          {catLabel}
        </span>

        {/* Title */}
        <Link href={`/${lang}/bibliotheque/${book.id}`} className="block group/title">
          <h3 className="text-base font-bold text-foreground leading-snug group-hover/title:text-primary transition-colors duration-200 line-clamp-2">
            {book.title}
          </h3>
        </Link>

        {/* Author */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <User className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{book.author}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {book.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 mt-auto border-t border-border/40">
          {book.pages ? (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <FileText className="h-3 w-3" />
              <span>{book.pages} p.</span>
            </div>
          ) : (
            <div />
          )}

          <Link
            href={`/${lang}/bibliotheque/${book.id}`}
            id={`read-btn-${book.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-150"
          >
            Lire
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
