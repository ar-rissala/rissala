import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, legacySectionRedirects, locales } from '@/lib/i18n';

const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check legacy route redirects
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

  if (pathname === "/actualites") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/actualites`;
    return NextResponse.redirect(url, 308);
  }
  
  if (pathname.startsWith("/actualites/")) {
    const slug = pathname.slice("/actualites/".length);
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}/actualites/${slug}`;
    return NextResponse.redirect(url, 308);
  }

  // 2. Delegate to next-intl middleware
  return nextIntlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
