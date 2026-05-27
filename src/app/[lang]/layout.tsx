import { notFound } from "next/navigation";
import { LangSetter } from "@/components/layout/LangSetter";
import { isLocale, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }, { lang: "ar" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <LangSetter lang={lang as Locale} />
      {children}
    </>
  );
}
