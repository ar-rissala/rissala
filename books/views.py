import json
from pathlib import Path

from django.conf import settings
from django.db.models import Q
from django.http import FileResponse, Http404, HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from django.views.decorators.http import require_POST

from books.models import Book, BookCategory, BookChapter, BookFile, BookLanguage
from books.services import BookStorageService
from core.i18n import UI_STRINGS, build_localized_url, normalize_lang
from library.models import Bookmark, LibraryEntry, ReadingNote, ReadingProgress
from library.services import sync_reading_progress
from seo.services import build_seo_context


def books_catalog_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    selected_category = request.GET.get("category", "").strip()
    selected_language = request.GET.get("language", "").strip()
    selected_format = request.GET.get("format", "").strip().upper()
    query = request.GET.get("q", "").strip()

    books_qs = (
        Book.objects.filter(status=Book.Status.PUBLISHED)
        .select_related("category", "publisher")
        .prefetch_related("authors", "languages", "files", "chapters")
        .order_by("order", "id")
    )

    if selected_category:
        books_qs = books_qs.filter(category__code=selected_category)
    if selected_language:
        books_qs = books_qs.filter(languages__code=selected_language)
    if selected_format in ("EPUB", "PDF"):
        books_qs = books_qs.filter(files__file_format=selected_format)
    if query:
        books_qs = books_qs.filter(
            Q(title_fr__icontains=query)
            | Q(title_en__icontains=query)
            | Q(title_ar__icontains=query)
            | Q(original_arabic_title__icontains=query)
            | Q(short_description_fr__icontains=query)
            | Q(authors__name__icontains=query)
        )

    books_qs = books_qs.distinct()
    categories = BookCategory.objects.all().order_by("order")
    book_languages = BookLanguage.objects.all()

    user_progress_map = {}
    if request.user.is_authenticated:
        for prog in ReadingProgress.objects.filter(user=request.user).select_related("book"):
            user_progress_map[prog.book_id] = prog

    books_list = list(books_qs)
    for b in books_list:
        b.user_progress = user_progress_map.get(b.id)
        b.localized_title = b.get_title(lang)
        b.localized_subtitle = b.get_subtitle(lang)
        b.localized_short_desc = (
            b.get_short_description(lang)
            or getattr(b, f"description_{lang}", "")
            or b.description_fr
        )
        b.localized_url = b.get_absolute_url(lang)
        b.author_name = ", ".join(a.name for a in b.authors.all()) or (
            "Auteur classique" if lang == "fr" else ("Classical Author" if lang == "en" else "مؤلف كلاسيكي")
        )
        b.cat_label = (
            getattr(b.category, f"name_{lang}", "")
            or (b.category.name_fr if b.category else "")
        )
        b.cover_image = (
            b.cover_image_url
            or (b.cover_image.url if b.cover_image else "/static/images/covers/dont_be_sad_fr_cover.jpg")
        )

    for cat in categories:
        cat.localized_name = getattr(cat, f"name_{lang}", "") or cat.name_fr

    page_copy = {
        "fr": {
            "metaTitle": "Bibliothèque Islamique | Rissala",
            "metaDesc": "Découvrez notre sélection de livres islamiques pour approfondir vos connaissances.",
            "description": "Découvrez une sélection de livres pour approfondir vos connaissances.",
            "titleMain": "Bibliothèque",
            "titleAccent": "Islamique",
            "ctaTitle": "Plongez dans des ouvrages fondamentaux pour enrichir votre foi et votre compréhension.",
            "ctaDesc": "",
            "ctaBtn": "Parcourir",
            "searchPlaceholder": "Rechercher un livre, un auteur…",
            "allBooks": "Tous les livres",
            "all": "Tous",
            "noResults": "Aucun résultat",
            "noResultsDesc": "Essayez avec d'autres mots-clés ou une autre catégorie.",
            "resetFilters": "Réinitialiser les filtres",
            "read": "Lire",
            "pages": "p.",
            "continueReading": "Continuer ma lecture",
            "resume": "Reprendre",
            "page": "Page",
            "booksCount": "livres",
            "bookSingle": "livre",
            "noBooksFound": "Aucun livre trouvé.",
            "forQuery": "pour",
        },
        "en": {
            "metaTitle": "Islamic Library | Rissala",
            "metaDesc": "Discover our selection of Islamic books to deepen your knowledge.",
            "description": "Discover a selection of books to deepen your knowledge.",
            "titleMain": "Islamic",
            "titleAccent": "Library",
            "ctaTitle": "A progressive and structured method",
            "ctaDesc": "Dive into foundational works to enrich your faith and understanding.",
            "ctaBtn": "Browse",
            "searchPlaceholder": "Search for a book, an author…",
            "allBooks": "All Books",
            "all": "All",
            "noResults": "No results",
            "noResultsDesc": "Try with other keywords or another category.",
            "resetFilters": "Reset filters",
            "read": "Read",
            "pages": "p.",
            "continueReading": "Continue reading",
            "resume": "Resume",
            "page": "Page",
            "booksCount": "books",
            "bookSingle": "book",
            "noBooksFound": "No books found.",
            "forQuery": "for",
        },
        "ar": {
            "metaTitle": "المكتبة الإسلامية | رسالة",
            "metaDesc": "اكتشف مجموعتنا من الكتب الإسلامية لتعميق معرفتك.",
            "description": "اكتشف مجموعة من الكتب لتعميق معرفتك.",
            "titleMain": "المكتبة",
            "titleAccent": "الإسلامية",
            "ctaTitle": "منهج تدريجي ومنظم",
            "ctaDesc": "اغص في الأعمال الأساسية لإثراء إيمانك وفهمك.",
            "ctaBtn": "تصفح",
            "searchPlaceholder": "البحث عن كتاب أو مؤلف...",
            "allBooks": "جميع الكتب",
            "all": "الكل",
            "noResults": "لا توجد نتائج",
            "noResultsDesc": "جرب كلمات بحثية أخرى أو تصنيفاً مختلفاً.",
            "resetFilters": "إعادة ضبط عوامل التصفية",
            "read": "قراءة",
            "pages": "ص",
            "continueReading": "متابعة القراءة",
            "resume": "استئناف",
            "page": "صفحة",
            "booksCount": "كتب",
            "bookSingle": "كتاب",
            "noBooksFound": "لم يتم العثور على أي كتاب.",
            "forQuery": "عن",
        },
    }
    t = page_copy.get(lang, page_copy["fr"])

    seo = build_seo_context(
        lang=lang,
        title=t["metaTitle"],
        description=t["metaDesc"],
        canonical_path=build_localized_url(lang, "books"),
        route_key="books",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["nav_books"], "url": build_localized_url(lang, "books")},
        ],
    )
    context = {
        "current_lang": lang,
        "lang": lang,
        "books": books_list,
        "categories": categories,
        "book_languages": book_languages,
        "selected_category": selected_category,
        "selected_language": selected_language,
        "selected_format": selected_format,
        "query": query,
        "copy": t,
        "page_alternate_urls": {
            l_code: build_localized_url(l_code, "books")
            for l_code in ("fr", "en", "ar")
        },
        **seo,
    }
    return render(request, "books/library_index.html", context)


def book_detail_view(request: HttpRequest, identifier: str, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    qs = (
        Book.objects.filter(status=Book.Status.PUBLISHED)
        .select_related("category", "publisher", "collection")
        .prefetch_related("authors", "translators", "languages", "tags", "editions", "chapters", "files")
    )

    book = None
    if identifier.isdigit():
        book = qs.filter(pk=int(identifier)).first()
    if not book:
        book = qs.filter(
            Q(code=identifier)
            | Q(slug_fr=identifier)
            | Q(slug_en=identifier)
            | Q(slug_ar=identifier)
        ).first()

    if not book:
        raise Http404("Ouvrage introuvable")

    chapters = list(book.chapters.all().order_by("order"))
    for ch in chapters:
        ch.localized_title = ch.get_title(lang)
        ch.localized_content = ch.get_content(lang)

    active_chapter_order = request.GET.get("chapter")
    active_chapter = chapters[0] if chapters else None
    if active_chapter_order and active_chapter_order.isdigit():
        for ch in chapters:
            if ch.order == int(active_chapter_order):
                active_chapter = ch
                break

    pdf_file = book.files.filter(file_format=BookFile.Format.PDF).first()
    epub_file = book.files.filter(file_format=BookFile.Format.EPUB).first()

    can_access_files = BookStorageService.user_can_access_book(request.user, book)
    pdf_token = (
        BookStorageService.generate_signed_download_token(
            pdf_file.id, request.user.id if request.user.is_authenticated else None
        )
        if (pdf_file and can_access_files)
        else ""
    )
    epub_token = (
        BookStorageService.generate_signed_download_token(
            epub_file.id, request.user.id if request.user.is_authenticated else None
        )
        if (epub_file and can_access_files)
        else ""
    )

    user_progress = None
    user_bookmarks = []
    user_notes = []
    in_personal_library = False

    if request.user.is_authenticated:
        user_progress = ReadingProgress.objects.filter(user=request.user, book=book).first()
        user_bookmarks = list(Bookmark.objects.filter(user=request.user, book=book))
        user_notes = list(ReadingNote.objects.filter(user=request.user, book=book))
        in_personal_library = LibraryEntry.objects.filter(user=request.user, book=book).exists()

        # If user opened a specific chapter, record progress automatically
        if active_chapter and chapters:
            pct = round((active_chapter.order / max(len(chapters), 1)) * 100.0, 1)
            user_progress, _ = sync_reading_progress(
                user=request.user,
                book=book,
                client_updated_at=timezone.now(),
                preferred_format="WEB",
                current_chapter=active_chapter,
                chapter_locator=active_chapter.slug,
                current_page=active_chapter.start_page,
                total_pages=book.page_count or 100,
                percentage=pct,
                device_id="web-browser",
            )

    book_schema = {
        "@context": "https://schema.org",
        "@type": "Book",
        "name": book.get_title(lang),
        "description": book.get_short_description(lang),
        "isbn": book.isbn,
        "numberOfPages": book.page_count,
        "author": [{"@type": "Person", "name": a.name} for a in book.authors.all()],
    }

    seo = build_seo_context(
        lang=lang,
        title=book.get_title(lang),
        description=book.get_short_description(lang),
        canonical_path=book.get_absolute_url(lang),
        alternate_paths={
            l_code: book.get_absolute_url(l_code) for l_code in ("fr", "en", "ar")
        },
        og_type="book",
        og_image=book.cover_image_url or "/static/LogoRissala.png",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["nav_books"], "url": build_localized_url(lang, "books")},
            {"label": book.get_title(lang), "url": book.get_absolute_url(lang)},
        ],
        json_ld_extra=[book_schema],
    )

    context = {
        "book": book,
        "localized_title": book.get_title(lang),
        "localized_subtitle": book.get_subtitle(lang),
        "localized_short_desc": book.get_short_description(lang),
        "localized_long_desc": book.get_long_description(lang),
        "chapters": chapters,
        "active_chapter": active_chapter,
        "pdf_file": pdf_file,
        "epub_file": epub_file,
        "pdf_token": pdf_token,
        "epub_token": epub_token,
        "user_progress": user_progress,
        "user_bookmarks": user_bookmarks,
        "user_notes": user_notes,
        "in_personal_library": in_personal_library,
        "page_alternate_urls": {
            l_code: book.get_absolute_url(l_code) for l_code in ("fr", "en", "ar")
        },
        **seo,
    }
    return render(request, "books/book_detail.html", context)


def book_file_download_view(request: HttpRequest, file_id: int, lang: str = "fr") -> HttpResponse:
    book_file = get_object_or_404(BookFile.objects.select_related("book"), pk=file_id)
    if book_file.book.status != Book.Status.PUBLISHED and not getattr(request.user, "is_editorial_staff", False):
        raise Http404("Ouvrage non publié")

    token = request.GET.get("token", "")

    if token:
        payload = BookStorageService.verify_signed_download_token(token)
        if not payload or payload.get("file_id") != book_file.id:
            return HttpResponse("Lien de téléchargement expiré ou invalide.", status=403)
        if (
            getattr(book_file.book, "access_type", Book.AccessType.FREE) != Book.AccessType.FREE
            and not payload.get("user_id")
            and not BookStorageService.user_can_access_book(request.user, book_file.book)
        ):
            return HttpResponse("Accès réservé aux membres connectés.", status=403)
    else:
        if not BookStorageService.user_can_access_book(request.user, book_file.book):
            return HttpResponse("Accès réservé aux membres connectés.", status=403)

    if book_file.file:
        return FileResponse(book_file.file.open("rb"), content_type=book_file.mime_type)

    if book_file.external_path:
        if ".." in book_file.external_path or "\\" in book_file.external_path:
            return HttpResponse("Chemin de fichier invalide.", status=403)
        static_root = (Path(settings.BASE_DIR) / "static").resolve()
        clean_rel = book_file.external_path.lstrip("/")
        if clean_rel.startswith("static/"):
            clean_rel = clean_rel[len("static/") :]
        local_candidate = (static_root / clean_rel).resolve()
        if not local_candidate.is_relative_to(static_root):
            return HttpResponse("Accès refusé.", status=403)
        if local_candidate.exists() and local_candidate.is_file():
            return FileResponse(
                open(local_candidate, "rb"),
                content_type=book_file.mime_type,
                as_attachment=request.GET.get("download") == "1",
                filename=local_candidate.name,
            )
        return redirect(f"/static/{clean_rel}")

    raise Http404("Fichier introuvable")


@require_POST
def web_toggle_library_view(request: HttpRequest, book_id: int, lang: str = "fr") -> HttpResponse:
    if not request.user.is_authenticated:
        return redirect(build_localized_url(lang, "login"))
    book = get_object_or_404(Book, pk=book_id, status=Book.Status.PUBLISHED)
    entry, created = LibraryEntry.objects.get_or_create(
        user=request.user,
        book=book,
        defaults={"is_favorite": True, "last_opened_at": timezone.now()},
    )
    if not created:
        entry.is_favorite = not entry.is_favorite
        entry.last_opened_at = timezone.now()
        entry.save(update_fields=["is_favorite", "last_opened_at", "updated_at"])
    return redirect(book.get_absolute_url(lang))


@require_POST
def web_reading_progress_sync_view(request: HttpRequest, book_id: int, lang: str = "fr") -> JsonResponse:
    if not request.user.is_authenticated:
        return JsonResponse({"status": "unauthenticated"}, status=401)
    book = get_object_or_404(Book, pk=book_id, status=Book.Status.PUBLISHED)
    try:
        data = json.loads(request.body.decode("utf-8")) if request.body else request.POST
    except Exception:
        data = request.POST

    chapter_id = data.get("chapter_id")
    chapter = BookChapter.objects.filter(pk=chapter_id, book=book).first() if chapter_id else None
    percentage = float(data.get("percentage", 0.0))
    current_page = int(data.get("current_page", 1))

    progress, updated = sync_reading_progress(
        user=request.user,
        book=book,
        client_updated_at=timezone.now(),
        preferred_format=data.get("preferred_format", "WEB"),
        current_chapter=chapter,
        current_page=current_page,
        total_pages=book.page_count or 100,
        percentage=percentage,
        device_id="web",
    )
    return JsonResponse(
        {
            "status": "ok",
            "updated": updated,
            "percentage": progress.percentage,
            "is_completed": progress.is_completed,
        }
    )

