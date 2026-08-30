"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { saveReadingProgress } from "@/lib/books";

// ── PDF.js worker ────────────────────────────────────────────────────────────
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// ─────────────────────────────────────────────────────────────────────────────

interface PdfViewerProps {
  pdfUrl: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  lang: string;
  initialPage?: number;
}

const ZOOM_STEPS = [0.6, 0.75, 1, 1.25, 1.5, 2];
const DEFAULT_ZOOM_INDEX = 2; // 1.0

export function PdfViewer({
  pdfUrl,
  bookId,
  bookTitle,
  bookAuthor,
  lang,
  initialPage = 1,
}: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(initialPage);
  const [direction, setDirection] = useState<number>(1);
  const [zoomIndex, setZoomIndex] = useState<number>(DEFAULT_ZOOM_INDEX);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(700);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  // Responsive width
  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setPageWidth(Math.min(w - 32, 840));
      }
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Fullscreen API
  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!viewerRef.current) return;
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const goToNextPage = useCallback(() => {
    setDirection(1);
    setPageNumber((p) => Math.min(p + 1, numPages));
  }, [numPages]);

  const goToPrevPage = useCallback(() => {
    setDirection(-1);
    setPageNumber((p) => Math.max(p - 1, 1));
  }, []);

  // Save reading progress
  useEffect(() => {
    if (numPages > 0) {
      saveReadingProgress({
        bookId,
        lastPage: pageNumber,
        totalPages: numPages,
        lastReadAt: new Date().toISOString(),
      });
    }
  }, [bookId, pageNumber, numPages]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goToNextPage();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goToPrevPage();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goToNextPage, goToPrevPage]);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages: n }: { numPages: number }) => {
      setNumPages(n);
      setLoading(false);
      setError(null);
    },
    []
  );

  const onDocumentLoadError = useCallback((err: Error) => {
    setError(err.message ?? "Erreur de chargement du PDF");
    setLoading(false);
  }, []);

  const scale = ZOOM_STEPS[zoomIndex];
  const canZoomIn = zoomIndex < ZOOM_STEPS.length - 1;
  const canZoomOut = zoomIndex > 0;

  return (
    <div ref={viewerRef} className={`flex flex-col ${isFullscreen ? "bg-background h-screen overflow-y-auto" : ""}`}>
      {/* ── Top toolbar ── */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 sm:top-16 z-30 flex-wrap">
        {/* Back */}
        <Link
          href={`/${lang}/bibliotheque`}
          id="back-to-library"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Bibliothèque</span>
        </Link>

        {/* Title (mobile) */}
        <p className="text-sm font-semibold text-foreground truncate max-w-[160px] sm:max-w-xs">
          {bookTitle}
        </p>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Zoom out */}
          <button
            id="zoom-out"
            onClick={() => setZoomIndex((z) => Math.max(z - 1, 0))}
            disabled={!canZoomOut}
            aria-label="Réduire le zoom"
            className="p-2 rounded-lg hover:bg-muted/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ZoomOut className="h-4 w-4" />
          </button>

          {/* Zoom level */}
          <span className="text-xs text-muted-foreground w-10 text-center font-mono select-none">
            {Math.round(scale * 100)}%
          </span>

          {/* Zoom in */}
          <button
            id="zoom-in"
            onClick={() => setZoomIndex((z) => Math.min(z + 1, ZOOM_STEPS.length - 1))}
            disabled={!canZoomIn}
            aria-label="Agrandir le zoom"
            className="p-2 rounded-lg hover:bg-muted/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          {/* Fullscreen */}
          <button
            id="fullscreen-toggle"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
            className="p-2 rounded-lg hover:bg-muted/60 transition-colors ml-1"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* ── PDF canvas area ── */}
      <div
        ref={containerRef}
        className="flex-1 flex flex-col items-center py-8 px-4 overflow-x-auto bg-muted/10 min-h-[70vh]"
      >
        {error ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-7 w-7 text-destructive" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Impossible de charger le PDF</p>
              <p className="text-sm text-muted-foreground max-w-sm">{error}</p>
            </div>
          </div>
        ) : (
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex flex-col items-center gap-4 py-20">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground">Chargement du livre…</p>
              </div>
            }
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={pageNumber}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="shadow-2xl rounded-lg overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDoubleClick={toggleFullscreen}
                onDragEnd={(e, { offset }) => {
                  const swipe = offset.x;
                  // Lecture arabe : on tire de gauche à droite pour aller à la page suivante (swipe > 0)
                  if (swipe > 60 && pageNumber < numPages) {
                    goToNextPage();
                  } else if (swipe < -60 && pageNumber > 1) {
                    goToPrevPage();
                  }
                }}
              >
                <Page
                  pageNumber={pageNumber}
                  width={pageWidth * scale}
                  renderAnnotationLayer={false}
                  renderTextLayer={true}
                  loading={
                    <div
                      style={{ width: pageWidth * scale, height: 600 }}
                      className="bg-muted/30 animate-pulse rounded-lg flex items-center justify-center"
                    >
                      <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
                    </div>
                  }
                />
              </motion.div>
            </AnimatePresence>
          </Document>
        )}
      </div>

      {/* ── Bottom navigation bar ── */}
      {numPages > 0 && (
        <div className="sticky bottom-0 z-30 flex items-center justify-between gap-3 px-4 py-3 border-t border-border/50 bg-card/90 backdrop-blur-sm">
          {/* Prev */}
          <button
            id="prev-page"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            aria-label="Page précédente"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/60 text-sm font-medium text-foreground hover:bg-muted/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Précédent</span>
          </button>

          {/* Page indicator */}
          <div className="flex items-center gap-2">
            <input
              id="page-input"
              type="number"
              min={1}
              max={numPages}
              value={pageNumber}
              onChange={(e) => {
                const v = parseInt(e.target.value);
                if (!isNaN(v) && v >= 1 && v <= numPages) {
                  setDirection(v > pageNumber ? 1 : -1);
                  setPageNumber(v);
                }
              }}
              aria-label="Numéro de page"
              className="w-14 h-8 text-center text-sm rounded-lg border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
            <span className="text-sm text-muted-foreground">/ {numPages}</span>
          </div>

          {/* Next */}
          <button
            id="next-page"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            aria-label="Page suivante"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/60 text-sm font-medium text-foreground hover:bg-muted/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <span className="hidden sm:inline">Suivant</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
