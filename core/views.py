from django.db.models import Q
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import redirect, render

from books.models import Book
from content.models import Article, Category
from core.i18n import UI_STRINGS, build_localized_url, normalize_lang
from courses.models import Course
from seo.services import build_seo_context


def root_redirect_view(request: HttpRequest) -> HttpResponse:
    """Redirect '/' to the user's preferred language or '/fr/'."""
    lang = "fr"
    if getattr(request, "user", None) and request.user.is_authenticated:
        lang = normalize_lang(getattr(request.user, "preferred_language", "fr"))
    return redirect(f"/{lang}/", permanent=False)


def healthcheck_view(request: HttpRequest) -> JsonResponse:
    """Railway healthcheck endpoint."""
    return JsonResponse({"status": "ok", "service": "rissala-django"})


def home_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    featured_books = (
        Book.objects.filter(status=Book.Status.PUBLISHED)
        .select_related("category")
        .prefetch_related("authors", "languages")[:4]
    )
    latest_news = (
        Article.objects.filter(
            status=Article.Status.PUBLISHED,
            section_type=Category.SectionType.NEWS,
            language=lang,
        )
        .select_related("category")
        .order_by("-is_featured", "-published_at")[:4]
    )
    if not latest_news.exists():
        latest_news = (
            Article.objects.filter(
                status=Article.Status.PUBLISHED,
                section_type=Category.SectionType.NEWS,
                language="fr",
            )
            .select_related("category")
            .order_by("-is_featured", "-published_at")[:4]
        )

    featured_courses = Course.objects.filter(status=Course.Status.PUBLISHED)[:3]

    seo = build_seo_context(
        lang=lang,
        title=f"{ui['hero_title_1']} {ui['hero_title_2']}",
        description=ui["hero_subtitle"],
        canonical_path=f"/{lang}/",
        route_key="home",
    )

    context = {
        "featured_books": featured_books,
        "latest_news": latest_news,
        "featured_courses": featured_courses,
        "page_alternate_urls": {
            "fr": "/fr/",
            "en": "/en/",
            "ar": "/ar/",
        },
        **seo,
    }
    return render(request, "core/home.html", context)


def search_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]
    q = request.GET.get("q", "").strip()
    section_filter = request.GET.get("section", "").strip()

    books_results = Book.objects.none()
    articles_results = Article.objects.none()
    courses_results = Course.objects.none()

    if q:
        if not section_filter or section_filter == "books":
            books_results = (
                Book.objects.filter(status=Book.Status.PUBLISHED)
                .filter(
                    Q(title_fr__icontains=q)
                    | Q(title_en__icontains=q)
                    | Q(title_ar__icontains=q)
                    | Q(original_arabic_title__icontains=q)
                    | Q(short_description_fr__icontains=q)
                    | Q(short_description_en__icontains=q)
                    | Q(short_description_ar__icontains=q)
                    | Q(authors__name__icontains=q)
                )
                .select_related("category")
                .prefetch_related("authors", "languages")
                .distinct()
            )
        if not section_filter or section_filter in ("articles", "sciences", "arabic", "finance", "news"):
            art_qs = Article.objects.filter(status=Article.Status.PUBLISHED).filter(
                Q(language=lang) | Q(preserve_arabic_content=True)
            )
            if section_filter == "sciences":
                art_qs = art_qs.filter(section_type=Category.SectionType.ISLAMIC_SCIENCES)
            elif section_filter == "arabic":
                art_qs = art_qs.filter(section_type=Category.SectionType.ARABIC_LANGUAGE)
            elif section_filter == "finance":
                art_qs = art_qs.filter(section_type=Category.SectionType.ISLAMIC_FINANCE)
            elif section_filter == "news":
                art_qs = art_qs.filter(section_type=Category.SectionType.NEWS)

            articles_results = art_qs.filter(
                Q(title__icontains=q)
                | Q(summary__icontains=q)
                | Q(content_markdown__icontains=q)
            ).select_related("category")[:30]

        if not section_filter or section_filter == "courses":
            courses_results = Course.objects.filter(status=Course.Status.PUBLISHED).filter(
                Q(title_fr__icontains=q)
                | Q(title_en__icontains=q)
                | Q(title_ar__icontains=q)
                | Q(short_description_fr__icontains=q)
                | Q(short_description_en__icontains=q)
                | Q(short_description_ar__icontains=q)
            )

    total_count = (
        books_results.count() + articles_results.count() + courses_results.count()
        if q
        else 0
    )

    seo = build_seo_context(
        lang=lang,
        title=ui["nav_search"],
        description=ui["search_placeholder"],
        canonical_path=build_localized_url(lang, "search"),
        route_key="search",
        noindex=bool(q),
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["nav_search"], "url": build_localized_url(lang, "search")},
        ],
    )
    context = {
        "query": q,
        "section_filter": section_filter,
        "books_results": books_results,
        "articles_results": articles_results,
        "courses_results": courses_results,
        "total_count": total_count,
        "page_alternate_urls": {
            l_code: build_localized_url(l_code, "search")
            for l_code in ("fr", "en", "ar")
        },
        **seo,
    }
    return render(request, "core/search.html", context)


def about_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]
    seo = build_seo_context(
        lang=lang,
        title=ui["footer_about"],
        description=ui["footer_desc"],
        canonical_path=build_localized_url(lang, "about"),
        route_key="about",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["footer_about"], "url": build_localized_url(lang, "about")},
        ],
    )
    return render(
        request,
        "core/about.html",
        {
            "page_alternate_urls": {
                l_code: build_localized_url(l_code, "about")
                for l_code in ("fr", "en", "ar")
            },
            **seo,
        },
    )


def contact_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]
    sent = False
    if request.method == "POST":
        sent = True
    seo = build_seo_context(
        lang=lang,
        title=ui["footer_contact"],
        description=ui["footer_desc"],
        canonical_path=build_localized_url(lang, "contact"),
        route_key="contact",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["footer_contact"], "url": build_localized_url(lang, "contact")},
        ],
    )
    return render(
        request,
        "core/contact.html",
        {
            "message_sent": sent,
            "page_alternate_urls": {
                l_code: build_localized_url(l_code, "contact")
                for l_code in ("fr", "en", "ar")
            },
            **seo,
        },
    )


def legal_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]
    seo = build_seo_context(
        lang=lang,
        title=ui["footer_legal"],
        description=ui["footer_desc"],
        canonical_path=build_localized_url(lang, "legal"),
        route_key="legal",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["footer_legal"], "url": build_localized_url(lang, "legal")},
        ],
    )
    return render(
        request,
        "core/legal.html",
        {
            "page_alternate_urls": {
                l_code: build_localized_url(l_code, "legal")
                for l_code in ("fr", "en", "ar")
            },
            **seo,
        },
    )


def privacy_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]
    seo = build_seo_context(
        lang=lang,
        title=ui["footer_privacy"],
        description=ui["footer_desc"],
        canonical_path=build_localized_url(lang, "privacy"),
        route_key="privacy",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["footer_privacy"], "url": build_localized_url(lang, "privacy")},
        ],
    )
    return render(
        request,
        "core/privacy.html",
        {
            "page_alternate_urls": {
                l_code: build_localized_url(l_code, "privacy")
                for l_code in ("fr", "en", "ar")
            },
            **seo,
        },
    )


def services_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]
    titles = {
        "fr": "Services & Outils Pratiques",
        "en": "Services & Practical Tools",
        "ar": "الخدمات والأدوات العملية",
    }
    seo = build_seo_context(
        lang=lang,
        title=titles[lang],
        description=ui["footer_desc"],
        canonical_path=build_localized_url(lang, "services"),
        route_key="services",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": titles[lang], "url": build_localized_url(lang, "services")},
        ],
    )
    return render(
        request,
        "core/services.html",
        {
            "page_alternate_urls": {
                l_code: build_localized_url(l_code, "services")
                for l_code in ("fr", "en", "ar")
            },
            **seo,
        },
    )


def zakat_calculator_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]
    titles = {
        "fr": "Calculateur de Zakat al-Mal",
        "en": "Zakat al-Mal Calculator",
        "ar": "حاسبة زكاة المال",
    }
    seo = build_seo_context(
        lang=lang,
        title=titles[lang],
        description=ui["footer_desc"],
        canonical_path=build_localized_url(lang, "zakat"),
        route_key="zakat",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": titles[lang], "url": build_localized_url(lang, "zakat")},
        ],
    )
    return render(
        request,
        "core/zakat.html",
        {
            "page_alternate_urls": {
                l_code: build_localized_url(l_code, "zakat")
                for l_code in ("fr", "en", "ar")
            },
            **seo,
        },
    )


def marketplace_stocks_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]
    titles = {
        "fr": "Actions & Indices Islamiques",
        "en": "Islamic Stocks & Indices",
        "ar": "الأسهم والمؤشرات الإسلامية",
    }
    seo = build_seo_context(
        lang=lang,
        title=titles[lang],
        description=ui["footer_desc"],
        canonical_path=build_localized_url(lang, "marketplace_stocks"),
        route_key="marketplace_stocks",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["nav_finance"], "url": build_localized_url(lang, "islamic_finance")},
            {"label": titles[lang], "url": build_localized_url(lang, "marketplace_stocks")},
        ],
    )
    return render(
        request,
        "core/marketplace_stocks.html",
        {
            "page_alternate_urls": {
                l_code: build_localized_url(l_code, "marketplace_stocks")
                for l_code in ("fr", "en", "ar")
            },
            **seo,
        },
    )


def marketplace_crypto_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]
    titles = {
        "fr": "Crypto-actifs & Analyse de Conformité",
        "en": "Crypto Assets & Compliance Analysis",
        "ar": "الأصول الرقمية وتحليل التوافق الشرعي",
    }
    seo = build_seo_context(
        lang=lang,
        title=titles[lang],
        description=ui["footer_desc"],
        canonical_path=build_localized_url(lang, "marketplace_crypto"),
        route_key="marketplace_crypto",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["nav_finance"], "url": build_localized_url(lang, "islamic_finance")},
            {"label": titles[lang], "url": build_localized_url(lang, "marketplace_crypto")},
        ],
    )
    return render(
        request,
        "core/marketplace_crypto.html",
        {
            "page_alternate_urls": {
                l_code: build_localized_url(l_code, "marketplace_crypto")
                for l_code in ("fr", "en", "ar")
            },
            **seo,
        },
    )


def custom_404_view(request: HttpRequest, exception=None) -> HttpResponse:
    lang = getattr(request, "rissala_lang", "fr")
    ui = UI_STRINGS.get(lang, UI_STRINGS["fr"])
    seo = build_seo_context(
        lang=lang,
        title=ui["404_title"],
        description=ui["404_desc"],
        canonical_path=request.path,
        noindex=True,
    )
    return render(request, "404.html", seo, status=404)


def custom_500_view(request: HttpRequest) -> HttpResponse:
    lang = getattr(request, "rissala_lang", "fr")
    return render(request, "500.html", {"current_lang": lang}, status=500)

