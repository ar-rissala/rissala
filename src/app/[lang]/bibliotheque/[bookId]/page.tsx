import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { getBookById, getAllBooks, categoryLabels } from "@/lib/books";
import { PdfViewer } from "@/components/library/PdfViewer";

export function generateStaticParams() {
  const params: { lang: string; bookId: string }[] = [];
  const books = getAllBooks();
  const locales: Locale[] = ["fr", "en", "ar"];
  
  for (const lang of locales) {
    for (const book of books) {
      params.push({ lang, bookId: book.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; bookId: string }> }): Promise<Metadata> {
  const { lang, bookId } = await params;
  if (!isLocale(lang)) return {};
  
  const book = getBookById(bookId);
  if (!book) return {};

  return {
    title: `${book.title} | Rissala Bibliothèque`,
    description: book.description,
  };
}

export default async function BookReaderPage({ params, searchParams }: { params: Promise<{ lang: string; bookId: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { lang, bookId } = await params;
  const searchParamsAwaited = await searchParams;
  const page = searchParamsAwaited.page;
  
  if (!isLocale(lang)) notFound();
  
  const book = getBookById(bookId);
  if (!book) notFound();

  let initialPage = 1;
  if (typeof page === "string" && !isNaN(parseInt(page, 10))) {
    initialPage = parseInt(page, 10);
  }

  const catLabel =
    categoryLabels[book.category]?.[lang as "fr" | "en" | "ar"] ??
    categoryLabels[book.category]?.fr ??
    book.category;

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      <div className="flex-1 flex flex-col relative">
        <PdfViewer
          pdfUrl={book.pdfUrl}
          bookId={book.id}
          bookTitle={book.title}
          bookAuthor={book.author}
          lang={lang}
          initialPage={initialPage}
        />
      </div>

      <section className="bg-card py-8 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
             <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {catLabel}
             </span>
             {book.pages && (
                <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                  {book.pages} pages
                </span>
             )}
          </div>
          <h1 className="text-2xl font-bold font-heading mb-2">{book.title}</h1>
          <p className="text-muted-foreground font-medium mb-6">par {book.author}</p>
          <div className="prose prose-sm sm:prose-base dark:prose-invert">
            <p className="leading-relaxed text-muted-foreground">{book.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
