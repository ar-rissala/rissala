import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, legacySectionRedirects } from "@/lib/i18n";

const localePrefix = /^\/(fr|en|ar)(\/|$)/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  if (localePrefix.test(pathname)) {
    return NextResponse.next();
  }

  // Redirect /ressources and /ressources/[slug] to localized versions
  if (pathname === "/ressources") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/ressources`;
    return NextResponse.redirect(url, 308);
  }
  if (pathname.startsWith("/ressources/")) {
    const slug = pathname.slice("/ressources/".length);
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/ressources/${slug}`;
    return NextResponse.redirect(url, 308);
  }

  const legacySections = Object.keys(legacySectionRedirects);
  for (const legacy of legacySections) {
    if (pathname === `/${legacy}`) {
      const url = request.nextUrl.clone();
      url.pathname = `/${defaultLocale}/${legacySectionRedirects[legacy]}`;
      return NextResponse.redirect(url, 308);
    }
    if (pathname.startsWith(`/${legacy}/`)) {
      const slug = pathname.slice(legacy.length + 2);
      const url = request.nextUrl.clone();
      url.pathname = `/${defaultLocale}/${legacySectionRedirects[legacy]}/${slug}`;
      return NextResponse.redirect(url, 308);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|robots.txt|sitemap.xml).*)"],
};
