from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import Http404, HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_POST

from core.i18n import UI_STRINGS, build_localized_url, normalize_lang
from courses.models import Course, Enrollment, Lesson, LessonProgress
from courses.services import VideoStreamingService
from seo.services import build_seo_context


def _resolve_course(identifier: str) -> Course:
    qs = Course.objects.filter(status=Course.Status.PUBLISHED).prefetch_related("modules__lessons")
    if identifier.isdigit():
        course = qs.filter(pk=int(identifier)).first()
        if course:
            return course
    course = qs.filter(
        Q(code=identifier)
        | Q(slug_fr=identifier)
        | Q(slug_en=identifier)
        | Q(slug_ar=identifier)
    ).first()
    if not course:
        raise Http404("Parcours introuvable")
    return course


def courses_catalog_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    selected_category = request.GET.get("category", "").strip()
    selected_level = request.GET.get("level", "").strip()

    courses_qs = Course.objects.filter(status=Course.Status.PUBLISHED).order_by("order", "id")
    if selected_category:
        courses_qs = courses_qs.filter(category_code=selected_category)
    if selected_level:
        courses_qs = courses_qs.filter(level=selected_level)

    enrollment_map = {}
    if request.user.is_authenticated:
        for enr in Enrollment.objects.filter(user=request.user):
            enrollment_map[enr.course_id] = enr

    courses_list = list(courses_qs)
    for c in courses_list:
        c.localized_title = c.get_title(lang)
        c.localized_short_desc = c.get_short_description(lang)
        c.localized_url = c.get_absolute_url(lang)
        c.user_enrollment = enrollment_map.get(c.id)

    PARCOURS_SEO = {
        "fr": {
            "title": "Parcours Investissement Halal | Rissala",
            "desc": "Découvrez comment faire fructifier votre patrimoine en respectant les principes de la finance islamique.",
            "benefits": [
                "Les fondements juridiques (Fiqh) du commerce et de la bourse en Islam.",
                "Comment utiliser les screeners pour vérifier la conformité d'une action.",
                "Comprendre et éviter le Riba, le Gharar et le Maysir dans vos placements.",
                "Stratégie de dividendes et purification des revenus (Purification ratio).",
                "Investir dans l'immobilier fractionné et les Sukuks (obligations islamiques).",
                "Calcul précis de la Zakat sur vos différents portefeuilles d'actifs.",
            ],
        },
        "en": {
            "title": "Halal Investment Course | Rissala",
            "desc": "Discover how to grow your wealth while respecting the principles of Islamic finance.",
            "benefits": [
                "The legal foundations (Fiqh) of commerce and the stock market in Islam.",
                "How to use screeners to verify stock compliance with Shariah criteria.",
                "Understanding and avoiding Riba, Gharar, and Maysir in your investments.",
                "Dividend strategies and income purification (Purification ratio).",
                "Investing in fractional real estate and Sukuks (Islamic bonds).",
                "Accurate calculation of Zakat across your various asset portfolios.",
            ],
        },
        "ar": {
            "title": "مسار الاستثمار الحلال | رسالة",
            "desc": "اكتشف كيفية تنمية ثروتك وفقاً لضوابط وأصول الشريعة الإسلامية.",
            "benefits": [
                "الأصول الفقهية والقواعد الشرعية للتجارة وأسواق المال في الإسلام.",
                "كيفية استخدام أدوات الفحص المالي (Screeners) للتحقق من شرعية الأسهم.",
                "فهم الربا والغرر والميسر وتجنبها تماماً في معاملاتك واستثماراتك.",
                "استراتيجيات توزيعات الأرباح ونسب تطهير الدخل غير المتوافق بدقة.",
                "الاستثمار في العقارات المجزأة والصكوك الإسلامية كبديل شرعي للسندات.",
                "حساب زكاة المال بدقة متناهية على مختلف محافظك وأصولك المالية.",
            ],
        },
    }

    p_data = PARCOURS_SEO.get(lang, PARCOURS_SEO["fr"])

    seo = build_seo_context(
        lang=lang,
        title=p_data["title"],
        description=p_data["desc"],
        canonical_path=build_localized_url(lang, "courses"),
        route_key="courses",
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["nav_courses"], "url": build_localized_url(lang, "courses")},
        ],
    )
    context = {
        "current_lang": lang,
        "lang": lang,
        "courses": courses_list,
        "selected_category": selected_category,
        "selected_level": selected_level,
        "benefits": p_data["benefits"],
        "page_alternate_urls": {
            l_code: build_localized_url(l_code, "courses")
            for l_code in ("fr", "en", "ar")
        },
        **seo,
    }
    return render(request, "courses/courses_index.html", context)


def course_detail_view(request: HttpRequest, identifier: str, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    course = _resolve_course(identifier)
    modules = list(course.modules.all().order_by("order"))
    first_lesson = None
    for mod in modules:
        mod.localized_title = (
            getattr(mod, f"title_{lang}", "") or mod.title_fr
        )
        mod.lessons_list = list(mod.lessons.all().order_by("order"))
        for les in mod.lessons_list:
            les.localized_title = les.get_title(lang)
            if first_lesson is None:
                first_lesson = les

    enrollment = None
    completed_lesson_ids = set()
    if request.user.is_authenticated:
        enrollment = Enrollment.objects.filter(user=request.user, course=course).first()
        completed_lesson_ids = set(
            LessonProgress.objects.filter(
                user=request.user, lesson__module__course=course, is_completed=True
            ).values_list("lesson_id", flat=True)
        )

    course_schema = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": course.get_title(lang),
        "description": course.get_short_description(lang),
        "provider": {"@type": "Organization", "name": "Rissala"},
    }

    seo = build_seo_context(
        lang=lang,
        title=course.get_title(lang),
        description=course.get_short_description(lang),
        canonical_path=course.get_absolute_url(lang),
        alternate_paths={
            l_code: course.get_absolute_url(l_code) for l_code in ("fr", "en", "ar")
        },
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["nav_courses"], "url": build_localized_url(lang, "courses")},
            {"label": course.get_title(lang), "url": course.get_absolute_url(lang)},
        ],
        json_ld_extra=[course_schema],
    )

    context = {
        "course": course,
        "localized_title": course.get_title(lang),
        "localized_short_desc": course.get_short_description(lang),
        "localized_long_desc": course.get_long_description(lang),
        "objectives": course.get_objectives(lang),
        "modules": modules,
        "first_lesson": first_lesson,
        "enrollment": enrollment,
        "completed_lesson_ids": completed_lesson_ids,
        "page_alternate_urls": {
            l_code: course.get_absolute_url(l_code) for l_code in ("fr", "en", "ar")
        },
        **seo,
    }
    return render(request, "courses/course_detail.html", context)


@login_required
@require_POST
def course_enroll_view(request: HttpRequest, identifier: str, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    course = _resolve_course(identifier)
    enrollment = VideoStreamingService.enroll_user(request.user, course)
    first_lesson = (
        Lesson.objects.filter(module__course=course)
        .order_by("module__order", "order")
        .first()
    )
    messages.success(request, f"Inscription au parcours « {course.get_title(lang)} » confirmée.")
    if first_lesson:
        return redirect(f"{course.get_absolute_url(lang)}lecon/{first_lesson.slug}/")
    return redirect(course.get_absolute_url(lang))


def lesson_detail_view(
    request: HttpRequest, identifier: str, lesson_slug: str, lang: str = "fr"
) -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    course = _resolve_course(identifier)
    lesson = get_object_or_404(
        Lesson.objects.select_related("module", "module__course"),
        module__course=course,
        slug=lesson_slug,
    )

    if request.method == "POST" and request.user.is_authenticated:
        if not VideoStreamingService.user_can_access_lesson(request.user, lesson):
            return HttpResponse("Accès réservé aux inscrits du parcours.", status=403)
        VideoStreamingService.record_lesson_progress(
            user=request.user,
            lesson=lesson,
            watched_seconds=lesson.duration_minutes * 60,
            last_position_seconds=lesson.duration_minutes * 60,
            mark_completed=True,
        )
        messages.success(request, "Leçon marquée comme terminée.")
        return redirect(f"{course.get_absolute_url(lang)}lecon/{lesson.slug}/")

    playback = VideoStreamingService.get_playback_metadata(request.user, lesson)
    modules = list(course.modules.all().order_by("order"))
    all_lessons = []
    for mod in modules:
        mod.localized_title = getattr(mod, f"title_{lang}", "") or mod.title_fr
        mod.lessons_list = list(mod.lessons.all().order_by("order"))
        for les in mod.lessons_list:
            les.localized_title = les.get_title(lang)
            all_lessons.append(les)

    prev_lesson = None
    next_lesson = None
    for idx, item in enumerate(all_lessons):
        if item.id == lesson.id:
            if idx > 0:
                prev_lesson = all_lessons[idx - 1]
            if idx < len(all_lessons) - 1:
                next_lesson = all_lessons[idx + 1]
            break

    lesson_progress = None
    if request.user.is_authenticated:
        lesson_progress = LessonProgress.objects.filter(
            user=request.user, lesson=lesson
        ).first()

    seo = build_seo_context(
        lang=lang,
        title=f"{lesson.get_title(lang)} — {course.get_title(lang)}",
        description=lesson.summary_fr or course.get_short_description(lang),
        canonical_path=f"{course.get_absolute_url(lang)}lecon/{lesson.slug}/",
        noindex=True,
        breadcrumbs=[
            {"label": ui["nav_home"], "url": f"/{lang}/"},
            {"label": ui["nav_courses"], "url": build_localized_url(lang, "courses")},
            {"label": course.get_title(lang), "url": course.get_absolute_url(lang)},
            {"label": lesson.get_title(lang), "url": f"{course.get_absolute_url(lang)}lecon/{lesson.slug}/"},
        ],
    )

    context = {
        "course": course,
        "lesson": lesson,
        "localized_lesson_title": lesson.get_title(lang),
        "modules": modules,
        "playback": playback,
        "prev_lesson": prev_lesson,
        "next_lesson": next_lesson,
        "lesson_progress": lesson_progress,
        **seo,
    }
    return render(request, "courses/lesson_detail.html", context)

