from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render

from core.i18n import UI_STRINGS, normalize_lang
from newsletter.forms import NewsletterSubscribeForm
from newsletter.services import NewsletterService
from seo.services import build_seo_context


def _get_client_ip(request: HttpRequest) -> str:
    x_forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded:
        return x_forwarded.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "")


def newsletter_subscribe_view(request: HttpRequest, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    ui = UI_STRINGS[lang]

    status_type = "form"
    message_text = ""

    if request.method == "POST":
        form = NewsletterSubscribeForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            first_name = form.cleaned_data.get("first_name", "")
            pref_lang = form.cleaned_data.get("language") or lang
            subscriber, created = NewsletterService.subscribe_email(
                email=email,
                language=pref_lang,
                first_name=first_name,
                source_url=request.META.get("HTTP_REFERER", f"/{lang}/"),
                ip_address=_get_client_ip(request),
                consent_text=ui["newsletter_consent"],
                user=request.user if request.user.is_authenticated else None,
            )
            status_type = "pending_confirmation"
            if lang == "en":
                message_text = "Thank you! Please check your inbox to confirm your newsletter subscription (double opt-in)."
            elif lang == "ar":
                message_text = "شكراً لك! يرجى التحقق من بريدك الإلكتروني لتأكيد اشتراكك في النشرة البريدية."
            else:
                message_text = "Merci ! Un email de confirmation (double opt-in) vient de vous être envoyé pour valider votre inscription."

            if request.headers.get("X-Requested-With") == "XMLHttpRequest":
                return JsonResponse({"status": "ok", "message": message_text})
        else:
            status_type = "error"
            message_text = "Veuillez saisir une adresse email valide et accepter le consentement RGPD."
            if request.headers.get("X-Requested-With") == "XMLHttpRequest":
                return JsonResponse({"status": "error", "message": message_text}, status=400)
    else:
        form = NewsletterSubscribeForm(initial={"language": lang, "consent": True})

    seo = build_seo_context(
        lang=lang,
        title=ui["newsletter_title"],
        description=ui["newsletter_desc"],
        canonical_path=f"/{lang}/newsletter/",
        noindex=True,
    )
    return render(
        request,
        "newsletter/status.html",
        {
            "status_type": status_type,
            "message_text": message_text,
            "form": form,
            **seo,
        },
    )


def newsletter_confirm_view(request: HttpRequest, token: str, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    subscriber = NewsletterService.confirm_subscription(token)
    if subscriber:
        status_type = "confirmed"
        message_text = (
            "Votre inscription à la newsletter Rissala est désormais confirmée."
            if lang == "fr"
            else (
                "Your subscription to the Rissala newsletter is now confirmed."
                if lang == "en"
                else "تم تأكيد اشتراكك في نشرة رسالة البريدية بنجاح."
            )
        )
    else:
        status_type = "invalid"
        message_text = "Lien de confirmation invalide ou expiré."

    seo = build_seo_context(
        lang=lang,
        title="Confirmation Newsletter",
        description=message_text,
        canonical_path=request.path,
        noindex=True,
    )
    return render(
        request,
        "newsletter/status.html",
        {"status_type": status_type, "message_text": message_text, **seo},
    )


def newsletter_unsubscribe_view(request: HttpRequest, token: str, lang: str = "fr") -> HttpResponse:
    lang = normalize_lang(lang)
    request.rissala_lang = lang
    subscriber = NewsletterService.unsubscribe_by_token(token)
    if subscriber:
        status_type = "unsubscribed"
        message_text = (
            "Vous avez été désabonné(e) de la newsletter Rissala en un clic. Conformément au RGPD, vous ne recevrez plus nos campagnes."
            if lang == "fr"
            else (
                "You have been unsubscribed from the Rissala newsletter."
                if lang == "en"
                else "تم إلغاء اشتراكك في النشرة البريدية بنجاح."
            )
        )
    else:
        status_type = "invalid"
        message_text = "Lien de désabonnement invalide."

    seo = build_seo_context(
        lang=lang,
        title="Désabonnement Newsletter",
        description=message_text,
        canonical_path=request.path,
        noindex=True,
    )
    return render(
        request,
        "newsletter/status.html",
        {"status_type": status_type, "message_text": message_text, **seo},
    )

