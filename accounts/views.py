import secrets

from django.conf import settings
from django.contrib import messages
from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

from accounts.forms import (
    PasswordResetConfirmCustomForm,
    PasswordResetRequestForm,
    UserLoginForm,
    UserProfileForm,
    UserRegistrationForm,
)
from books.models import Book
from content.models import Article, Category
from core.i18n import UI_STRINGS, build_localized_url, normalize_lang
from courses.models import Enrollment
from library.models import LibraryEntry, ReadingProgress
from seo.services import build_seo_context

User = get_user_model()


def login_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    if request.user.is_authenticated:
        return redirect(build_localized_url(lang, "dashboard"))

    form = UserLoginForm(request, data=request.POST or None)
    if request.method == "POST" and form.is_valid():
        user = form.get_user()
        login(request, user)
        next_url = request.GET.get("next") or build_localized_url(lang, "dashboard")
        return redirect(next_url)

    seo = build_seo_context(
        lang=lang,
        title=ui["nav_login"],
        description=ui["footer_desc"],
        canonical_path=build_localized_url(lang, "login"),
        route_key="login",
        noindex=True,
    )
    return render(
        request,
        "accounts/login.html",
        {
            "form": form,
            "page_alternate_urls": {
                l_code: build_localized_url(l_code, "login")
                for l_code in ("fr", "en", "ar")
            },
            **seo,
        },
    )


def register_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    if request.user.is_authenticated:
        return redirect(build_localized_url(lang, "dashboard"))

    form = UserRegistrationForm(request.POST or None, initial={"preferred_language": lang})
    if request.method == "POST" and form.is_valid():
        user = form.save(commit=False)
        user.email_verification_token = secrets.token_urlsafe(32)
        user.save()
        # Send verification email gracefully
        verify_url = (
            f"{settings.SITE_URL.rstrip('/')}/{lang}/verify-email/{user.email_verification_token}/"
        )
        try:
            send_mail(
                subject="Rissala — Vérification de votre adresse email",
                message=f"Bienvenue sur Rissala, {user.display_name}.\n\nConfirmez votre adresse email : {verify_url}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=True,
            )
        except Exception:
            pass
        login(request, user, backend="accounts.backends.EmailOrPseudoModelBackend")
        messages.success(request, "Bienvenue ! Votre compte membre Rissala a été créé avec succès.")
        return redirect(build_localized_url(lang, "dashboard"))

    seo = build_seo_context(
        lang=lang,
        title=ui["nav_register"],
        description=ui["footer_desc"],
        canonical_path=build_localized_url(lang, "register"),
        route_key="register",
        noindex=True,
    )
    return render(
        request,
        "accounts/register.html",
        {
            "form": form,
            "page_alternate_urls": {
                l_code: build_localized_url(l_code, "register")
                for l_code in ("fr", "en", "ar")
            },
            **seo,
        },
    )


def verify_email_view(request: HttpRequest, token: str, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    user = get_object_or_404(User, email_verification_token=token)
    user.email_verified = True
    user.email_verification_token = ""
    user.save(update_fields=["email_verified", "email_verification_token"])
    messages.success(request, "Votre adresse email a été vérifiée avec succès.")
    return redirect(build_localized_url(lang, "dashboard"))


def logout_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    logout(request)
    return redirect(f"/{lang}/")


def forgot_password_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]
    email_sent = False

    form = PasswordResetRequestForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        email = form.cleaned_data["email"]
        user = User.objects.filter(email__iexact=email, is_active=True).first()
        if user:
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_url = f"{settings.SITE_URL.rstrip('/')}/{lang}/reset-password/{uid}/{token}/"
            try:
                send_mail(
                    subject="Rissala — Réinitialisation de votre mot de passe",
                    message=f"Bonjour {user.display_name},\n\nRéinitialisez votre mot de passe via ce lien : {reset_url}",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[user.email],
                    fail_silently=True,
                )
            except Exception:
                pass
        email_sent = True

    seo = build_seo_context(
        lang=lang,
        title="Mot de passe oublié" if lang == "fr" else ("Forgot Password" if lang == "en" else "نسيت كلمة المرور"),
        description=ui["footer_desc"],
        canonical_path=build_localized_url(lang, "forgot_password"),
        route_key="forgot_password",
        noindex=True,
    )
    return render(
        request,
        "accounts/forgot_password.html",
        {
            "form": form,
            "email_sent": email_sent,
            "page_alternate_urls": {
                l_code: build_localized_url(l_code, "forgot_password")
                for l_code in ("fr", "en", "ar")
            },
            **seo,
        },
    )


def reset_password_confirm_view(
    request: HttpRequest, uidb64: str, token: str, lang: str = "fr"
) -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    validlink = user is not None and default_token_generator.check_token(user, token)
    form = PasswordResetConfirmCustomForm(request.POST or None)
    if validlink and request.method == "POST" and form.is_valid():
        user.set_password(form.cleaned_data["new_password1"])
        user.save()
        messages.success(request, "Votre mot de passe a été modifié avec succès.")
        return redirect(build_localized_url(lang, "login"))

    return render(
        request,
        "accounts/reset_password.html",
        {"form": form, "validlink": validlink},
    )


@login_required
def dashboard_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    reading_progresses = (
        ReadingProgress.objects.filter(user=request.user)
        .select_related("book", "book__category", "current_chapter")
        .order_by("-updated_at")[:6]
    )
    library_entries = (
        LibraryEntry.objects.filter(user=request.user)
        .select_related("book", "book__category")
        .prefetch_related("book__authors")
        .order_by("-last_opened_at", "-created_at")[:6]
    )
    enrollments = (
        Enrollment.objects.filter(user=request.user)
        .select_related("course", "last_lesson")
        .order_by("-last_accessed_at", "-created_at")
    )
    recommended_books = (
        Book.objects.filter(status=Book.Status.PUBLISHED)
        .select_related("category")
        .prefetch_related("authors")[:4]
    )
    latest_news = (
        Article.objects.filter(
            status=Article.Status.PUBLISHED,
            section_type=Category.SectionType.NEWS,
            language=lang,
        )
        .select_related("category")
        .order_by("-published_at")[:4]
    )

    seo = build_seo_context(
        lang=lang,
        title=ui["nav_dashboard"],
        description=ui["footer_desc"],
        canonical_path=build_localized_url(lang, "dashboard"),
        route_key="dashboard",
        noindex=True,
    )
    context = {
        "reading_progresses": reading_progresses,
        "library_entries": library_entries,
        "enrollments": enrollments,
        "recommended_books": recommended_books,
        "latest_news": latest_news,
        "page_alternate_urls": {
            l_code: build_localized_url(l_code, "dashboard")
            for l_code in ("fr", "en", "ar")
        },
        **seo,
    }
    return render(request, "accounts/dashboard.html", context)


@login_required
def profile_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    form = UserProfileForm(request.POST or None, instance=request.user)
    if request.method == "POST" and form.is_valid():
        user = form.save()
        messages.success(request, "Vos préférences et informations de profil ont été enregistrées.")
        return redirect(build_localized_url(user.preferred_language or lang, "profile"))

    seo = build_seo_context(
        lang=lang,
        title=ui["nav_profile"],
        description=ui["footer_desc"],
        canonical_path=build_localized_url(lang, "profile"),
        route_key="profile",
        noindex=True,
    )
    return render(
        request,
        "accounts/profile.html",
        {
            "form": form,
            "page_alternate_urls": {
                l_code: build_localized_url(l_code, "profile")
                for l_code in ("fr", "en", "ar")
            },
            **seo,
        },
    )

