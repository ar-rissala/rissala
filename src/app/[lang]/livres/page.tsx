"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, FileText } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function LivresPublicPage() {
  const locale = useLocale() as "fr" | "en" | "ar";
  const books = useQuery(api.books.list, { published: true, language: locale });

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 sm:py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold font-heading uppercase tracking-widest text-foreground">
          Bibliothèque
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Découvrez notre collection de livres et d'essais au format PDF.
        </p>
      </div>

      {!books ? (
        <div className="flex justify-center p-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : books.length === 0 ? (
        <div className="text-center p-20 border border-dashed rounded-xl">
          <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <h2 className="text-xl font-medium mb-2">Aucun livre disponible</h2>
          <p className="text-muted-foreground">Revenez plus tard pour découvrir nos prochaines publications.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Card key={book._id} className="overflow-hidden hover:shadow-lg transition-all group">
              <Link href={`/api/pdf?id=${book.pdfStorageId}`} target="_blank">
                <div className="aspect-[2/3] w-full bg-muted relative overflow-hidden flex items-center justify-center">
                  {book.coverUrl ? (
                    <img 
                      src={book.coverUrl} 
                      alt={book.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <FileText className="w-16 h-16 text-muted-foreground/30" />
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium bg-primary/90 px-4 py-2 rounded-full backdrop-blur-sm">
                      Lire le PDF
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded">
                      {book.category?.name[locale] || book.category?.name.fr || "Livre"}
                    </span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
