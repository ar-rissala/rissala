from django.conf import settings
from django.http import HttpRequest, HttpResponse
from django.utils import timezone

from books.models import Book
from content.models import Article
from core.i18n import ROUTE_SLUGS
from courses.models import Course


def robots_txt_view(request: HttpRequest) -> HttpResponse:
    base_url = settings.SITE_URL.rstrip("/")
    lines = [
        "User-agent: *",
        "Allow: /",
        "Disallow: /admin/",
        "Disallow: /api/",
        "Disallow: /fr/espace-membre/",
        "Disallow: /en/member-area/",
        "Disallow: /ar/فضاء-الأعضاء/",
        "Disallow: /fr/tableau-de-bord/",
        "Disallow: /en/dashboard/",
        "Disallow: /ar/لوحة-التحكم/",
        f"Sitemap: {base_url}/sitemap.xml",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain; charset=utf-8")


def sitemap_xml_view(request: HttpRequest) -> HttpResponse:
    base_url = settings.SITE_URL.rstrip("/")
    now_iso = timezone.now().date().isoformat()

    public_route_keys = [
        "home",
        "books",
        "islamic_sciences",
        "sciences_foundations",
        "arabic_language",
        "islamic_finance",
        "courses",
        "news",
        "about",
        "contact",
        "legal",
        "privacy",
        "services",
        "zakat",
    ]

    urls_xml = []

    for key in public_route_keys:
        if key not in ROUTE_SLUGS:
            continue
        for lang in ("fr", "en", "ar"):
            seg = ROUTE_SLUGS[key].get(lang, "")
            loc = f"{base_url}/{lang}/" if not seg else f"{base_url}/{lang}/{seg}/"
            links = []
            for alt_lang in ("fr", "en", "ar"):
                alt_seg = ROUTE_SLUGS[key].get(alt_lang, "")
                alt_loc = f"{base_url}/{alt_lang}/" if not alt_seg else f"{base_url}/{alt_lang}/{alt_seg}/"
                links.append(
                    f'    <xhtml:link rel="alternate" hreflang="{alt_lang}" href="{alt_loc}" />'
                )
            fr_seg = ROUTE_SLUGS[key].get("fr", "")
            fr_loc = f"{base_url}/fr/" if not fr_seg else f"{base_url}/fr/{fr_seg}/"
            links.append(
                f'    <xhtml:link rel="alternate" hreflang="x-default" href="{fr_loc}" />'
            )
            urls_xml.append(
                "  <url>\n"
                f"    <loc>{loc}</loc>\n"
                f"    <lastmod>{now_iso}</lastmod>\n"
                "    <changefreq>weekly</changefreq>\n"
                "    <priority>0.8</priority>\n"
                + "\n".join(links)
                + "\n  </url>"
            )

    # Published indexable articles
    articles = Article.objects.filter(
        status=Article.Status.PUBLISHED, noindex=False
    ).select_related("translation_group")
    for article in articles:
        loc = f"{base_url}{article.get_absolute_url()}"
        lastmod = (article.updated_at or timezone.now()).date().isoformat()
        urls_xml.append(
            "  <url>\n"
            f"    <loc>{loc}</loc>\n"
            f"    <lastmod>{lastmod}</lastmod>\n"
            "    <changefreq>monthly</changefreq>\n"
            "    <priority>0.7</priority>\n"
            "  </url>"
        )

    # Published books
    books = Book.objects.filter(status=Book.Status.PUBLISHED)
    for book in books:
        for lang in ("fr", "en", "ar"):
            loc = f"{base_url}{book.get_absolute_url(lang)}"
            lastmod = (book.updated_at or timezone.now()).date().isoformat()
            urls_xml.append(
                "  <url>\n"
                f"    <loc>{loc}</loc>\n"
                f"    <lastmod>{lastmod}</lastmod>\n"
                "    <changefreq>monthly</changefreq>\n"
                "    <priority>0.8</priority>\n"
                "  </url>"
            )

    # Published courses
    courses = Course.objects.filter(status=Course.Status.PUBLISHED)
    for course in courses:
        for lang in ("fr", "en", "ar"):
            loc = f"{base_url}{course.get_absolute_url(lang)}"
            lastmod = (course.updated_at or timezone.now()).date().isoformat()
            urls_xml.append(
                "  <url>\n"
                f"    <loc>{loc}</loc>\n"
                f"    <lastmod>{lastmod}</lastmod>\n"
                "    <changefreq>monthly</changefreq>\n"
                "    <priority>0.7</priority>\n"
                "  </url>"
            )

    xml_content = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
        + "\n".join(urls_xml)
        + "\n</urlset>"
    )
    return HttpResponse(xml_content, content_type="application/xml; charset=utf-8")
