"use client";

import dynamic from "next/dynamic";

export const PdfViewer = dynamic(
  () => import("@/components/library/PdfViewer").then((mod) => mod.PdfViewer),
  { ssr: false }
);
