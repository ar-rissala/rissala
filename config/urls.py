from pathlib import Path

from django.conf import settings
from django.contrib import admin
from django.http import FileResponse, Http404
from django.urls import include, path, re_path
from django.views.static import serve

from accounts import views as accounts_views
from books import views as books_views
from content import views as content_views
from content.models import Category
from core import views as core_views
from courses import views as courses_views
from newsletter import views as newsletter_views
from seo import views as seo_views

# Customize Django Admin branding
admin.site.site_header = "Rissala — Administration Éditoriale & Plateforme"
admin.site.site_title = "Rissala Admin"
admin.site.index_title = "Gestion des contenus, livres, parcours, membres et newsletter"


def serve_root_static_asset(request, asset_path: str):
    """Serve root-level public assets (/LogoRissala.svg, /images/..., /livres/..., /*-bg.jpg) from static/."""
    if ".." in asset_path or "\\" in asset_path:
        raise Http404("Invalid asset path")
    static_root = (Path(settings.BASE_DIR) / "static").resolve()
    candidate = (static_root / asset_path.lstrip("/")).resolve()
    if candidate.is_relative_to(static_root) and candidate.exists() and candidate.is_file():
        return FileResponse(open(candidate, "rb"))
    raise Http404("Asset not found")


urlpatterns = [
    # Healthcheck & SEO
    path("health/", core_views.healthcheck_view, name="healthcheck"),
    path("robots.txt", seo_views.robots_txt_view, name="robots_txt"),
    path("sitemap.xml", seo_views.sitemap_xml_view, name="sitemap_xml"),
    # Django Admin
    path("admin/", admin.site.urls),
    # REST API v1 for React Native mobile app
    path("api/v1/", include("api.urls", namespace="api")),
    # Root redirect -> /fr/
    path("", core_views.root_redirect_view, name="root_redirect"),
    # Book file download endpoint
    path("<str:lang>/books/file/<int:file_id>/download/", books_views.book_file_download_view, name="book_file_download"),
    path("<str:lang>/books/<int:book_id>/toggle-library/", books_views.web_toggle_library_view, name="web_toggle_library"),
    path("<str:lang>/books/<int:book_id>/sync-progress/", books_views.web_reading_progress_sync_view, name="web_reading_progress_sync"),
    # Newsletter endpoints
    path("<str:lang>/newsletter/", newsletter_views.newsletter_subscribe_view, name="newsletter_subscribe"),
    path("<str:lang>/newsletter/confirm/<str:token>/", newsletter_views.newsletter_confirm_view, name="newsletter_confirm"),
    path("<str:lang>/newsletter/unsubscribe/<str:token>/", newsletter_views.newsletter_unsubscribe_view, name="newsletter_unsubscribe"),
    # Email verification & Password reset confirmation
    path("<str:lang>/verify-email/<str:token>/", accounts_views.verify_email_view, name="verify_email"),
    path("<str:lang>/reset-password/<str:uidb64>/<str:token>/", accounts_views.reset_password_confirm_view, name="reset_password_confirm"),
    path("<str:lang>/deconnexion/", accounts_views.logout_view, name="logout_fr"),
    path("<str:lang>/logout/", accounts_views.logout_view, name="logout_en"),
    # =========================================================================
    # HOME (/fr/, /en/, /ar/)
    # =========================================================================
    re_path(r"^(?P<lang>fr|en|ar)/$", core_views.home_view, name="home"),
    # =========================================================================
    # BOOKS & EBOOKS (/fr/livres/, /en/books/, /ar/books/, /ar/كتب/)
    # =========================================================================
    re_path(r"^(?P<lang>fr|en|ar)/(?:livres|books|كتب)/$", books_views.books_catalog_view, name="books_catalog"),
    re_path(r"^(?P<lang>fr|en|ar)/(?:livres|books|كتب)/(?P<identifier>[^/]+)/$", books_views.book_detail_view, name="book_detail"),
    # =========================================================================
    # ISLAMIC SCIENCES (/fr/sciences-islamiques/, /en/islamic-sciences/, /ar/العلوم-الإسلامية/)
    # =========================================================================
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:sciences-islamiques|islamic-sciences|العلوم-الإسلامية)/(?:fondements|foundations|الأصول)/$",
        content_views.sciences_foundations_view,
        name="sciences_foundations",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:sciences-islamiques|islamic-sciences|العلوم-الإسلامية)/$",
        content_views.islamic_sciences_hub_view,
        name="islamic_sciences_hub",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:sciences-islamiques|islamic-sciences|العلوم-الإسلامية)/(?P<slug>[^/]+)/$",
        content_views.article_or_discipline_view,
        {"section_type": Category.SectionType.ISLAMIC_SCIENCES},
        name="islamic_sciences_article",
    ),
    # =========================================================================
    # ARABIC LANGUAGE (/fr/langue-arabe/, /fr/apprendre-arabe/, /en/arabic-language/, /ar/اللغة-العربية/)
    # =========================================================================
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:langue-arabe|apprendre-arabe|arabic-language|learn-arabic|اللغة-العربية|تعلم-العربية)/$",
        content_views.arabic_language_hub_view,
        name="arabic_language_hub",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:langue-arabe|apprendre-arabe|arabic-language|learn-arabic|اللغة-العربية|تعلم-العربية)/(?P<slug>[^/]+)/?$",
        content_views.article_or_discipline_view,
        {"section_type": Category.SectionType.ARABIC_LANGUAGE},
        name="arabic_language_article",
    ),
    # =========================================================================
    # ISLAMIC FINANCE (/fr/finance-islamique/, /en/islamic-finance/, /ar/التمويل-الإسلامي/)
    # =========================================================================
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:finance-islamique|fiqh-al-muamalat|islamic-finance|التمويل-الإسلامي|فقه-المعاملات)/$",
        content_views.islamic_finance_hub_view,
        name="islamic_finance_hub",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:finance-islamique|fiqh-al-muamalat|islamic-finance|التمويل-الإسلامي|فقه-المعاملات)/(?P<slug>[^/]+)/?$",
        content_views.article_or_discipline_view,
        {"section_type": Category.SectionType.ISLAMIC_FINANCE},
        name="islamic_finance_article",
    ),
    # =========================================================================
    # COURSES / PARCOURS (/fr/parcours/, /en/courses/, /ar/courses/, /ar/مسارات/)
    # =========================================================================
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:parcours|courses|مسارات)/$",
        courses_views.courses_catalog_view,
        name="courses_catalog",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:parcours|courses|مسارات)/(?P<identifier>[^/]+)/enroll/$",
        courses_views.course_enroll_view,
        name="course_enroll",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:parcours|courses|مسارات)/(?P<identifier>[^/]+)/(?:lecon|lesson)/(?P<lesson_slug>[^/]+)/$",
        courses_views.lesson_detail_view,
        name="lesson_detail",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:parcours|courses|مسارات)/(?P<identifier>[^/]+)/$",
        courses_views.course_detail_view,
        name="course_detail",
    ),
    # =========================================================================
    # NEWS / ACTUALITÉS (/fr/actualites/, /en/news/, /ar/news/, /ar/الاخبار/)
    # =========================================================================
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:actualites|news|الاخبار)/$",
        content_views.news_hub_view,
        name="news_hub",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:actualites|news|الاخبار)/(?P<slug>[^/]+)/$",
        content_views.article_or_discipline_view,
        {"section_type": Category.SectionType.NEWS},
        name="news_article",
    ),
    # =========================================================================
    # SEARCH (/fr/recherche/, /en/search/, /ar/بحث/)
    # =========================================================================
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:recherche|search|بحث)/$",
        core_views.search_view,
        name="search",
    ),
    # =========================================================================
    # AUTHENTICATION & MEMBER AREA
    # =========================================================================
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:connexion|login|تسجيل-الدخول)/$",
        accounts_views.login_view,
        name="login",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:inscription|register|إنشاء-حساب)/$",
        accounts_views.register_view,
        name="register",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:mot-de-passe-oublie|forgot-password|نسيت-كلمة-المرور)/$",
        accounts_views.forgot_password_view,
        name="forgot_password",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:espace-membre|member-area|فضاء-الأعضاء|tableau-de-bord|dashboard|لوحة-التحكم)/$",
        accounts_views.dashboard_view,
        name="dashboard",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:profil|profile|الملف-الشخصي)/$",
        accounts_views.profile_view,
        name="profile",
    ),
    # =========================================================================
    # INSTITUTIONAL, LEGAL & TOOLS PAGES
    # =========================================================================
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:a-propos|about|من-نحن)/$",
        core_views.about_view,
        name="about",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:contact|اتصل-بنا)/$",
        core_views.contact_view,
        name="contact",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:mentions-legales|legal|إشعار-قانوني)/$",
        core_views.legal_view,
        name="legal",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:confidentialite|politique-de-confidentialite|privacy|الخصوصية)/$",
        core_views.privacy_view,
        name="privacy",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:services|الخدمات)/$",
        core_views.services_view,
        name="services",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/(?:services|الخدمات)/zakat/$",
        core_views.zakat_calculator_view,
        name="zakat",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/marketplaces/stocks/$",
        core_views.marketplace_stocks_view,
        name="marketplace_stocks",
    ),
    re_path(
        r"^(?P<lang>fr|en|ar)/marketplaces/crypto/$",
        core_views.marketplace_crypto_view,
        name="marketplace_crypto",
    ),
    # =========================================================================
    # ROOT PUBLIC ASSETS FALLBACK (/LogoRissala.svg, /images/..., /livres/...)
    # =========================================================================
    re_path(
        r"^(?P<asset_path>(?:images|livres)/.+|(?:LogoRissala|iconRissala|logo-icon|hero-bg|arabe-bg|islamic-pattern-bg|library-bg)\.(?:svg|png|jpg))$",
        serve_root_static_asset,
        name="root_static_asset",
    ),
]

if settings.DEBUG:
    urlpatterns += [
        re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
    ]

handler404 = "core.views.custom_404_view"
handler500 = "core.views.custom_500_view"

