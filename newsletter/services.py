import hashlib

import requests
from django.conf import settings
from django.core.mail import send_mail
from django.db import transaction
from django.utils import timezone

from .models import NewsletterCampaign, NewsletterDeliveryLog, NewsletterSubscriber


class NewsletterService:
    """
    Handles GDPR-compliant newsletter subscriptions, double opt-in confirmation,
    one-click unsubscription, Brevo API integration, and idempotent campaign sending.
    """

    @staticmethod
    def _hash_ip(ip_address: str) -> str:
        if not ip_address:
            return ""
        salted = f"{settings.SECRET_KEY}:{ip_address}"
        return hashlib.sha256(salted.encode("utf-8")).hexdigest()

    @classmethod
    def subscribe_email(
        cls,
        *,
        email: str,
        language: str = "fr",
        first_name: str = "",
        source_url: str = "/fr/",
        ip_address: str = "",
        consent_text: str = "",
        user=None,
    ) -> tuple[NewsletterSubscriber, bool]:
        clean_email = email.strip().lower()
        ip_hash = cls._hash_ip(ip_address)
        subscriber, created = NewsletterSubscriber.objects.get_or_create(
            email=clean_email,
            defaults={
                "first_name": first_name.strip(),
                "language": language or "fr",
                "user": user,
                "status": NewsletterSubscriber.Status.PENDING,
                "consent_given": True,
                "consent_text": consent_text,
                "consent_ip_hash": ip_hash,
                "source_url": source_url[:255],
                "consent_timestamp": timezone.now(),
            },
        )
        if not created:
            subscriber.language = language or subscriber.language
            subscriber.consent_given = True
            subscriber.consent_text = consent_text or subscriber.consent_text
            subscriber.consent_ip_hash = ip_hash or subscriber.consent_ip_hash
            subscriber.consent_timestamp = timezone.now()
            if subscriber.status != NewsletterSubscriber.Status.ACTIVE:
                subscriber.status = NewsletterSubscriber.Status.PENDING
            subscriber.save()

        cls._send_confirmation_email(subscriber)
        return subscriber, created

    @classmethod
    def _send_confirmation_email(cls, subscriber: NewsletterSubscriber) -> None:
        base_url = settings.SITE_URL.rstrip("/")
        confirm_url = f"{base_url}/{subscriber.language}/newsletter/confirm/{subscriber.confirmation_token}/"
        unsub_url = f"{base_url}/{subscriber.language}/newsletter/unsubscribe/{subscriber.unsubscribe_token}/"
        subject = "Rissala — Confirmez votre inscription à la newsletter"
        body = (
            f"Bonjour,\n\n"
            f"Confirmez votre inscription à la newsletter Rissala (double opt-in) :\n{confirm_url}\n\n"
            f"Désinscription en un clic :\n{unsub_url}"
        )
        cls._dispatch_email(to_email=subscriber.email, subject=subject, html_or_text=body)

    @classmethod
    def _dispatch_email(cls, *, to_email: str, subject: str, html_or_text: str) -> str:
        brevo_key = getattr(settings, "BREVO_API_KEY", "").strip()
        if brevo_key:
            try:
                requests.post(
                    "https://api.brevo.com/v3/smtp/email",
                    headers={
                        "api-key": brevo_key,
                        "accept": "application/json",
                        "content-type": "application/json",
                    },
                    json={
                        "sender": {"name": "Rissala", "email": "contact@rissala.net"},
                        "to": [{"email": to_email}],
                        "subject": subject,
                        "htmlContent": html_or_text,
                    },
                    timeout=8,
                )
                return "brevo_api"
            except Exception:
                pass

        try:
            send_mail(
                subject=subject,
                message=html_or_text,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[to_email],
                fail_silently=True,
            )
        except Exception:
            pass
        return "django_email"

    @classmethod
    def confirm_subscription(cls, token: str) -> NewsletterSubscriber | None:
        sub = NewsletterSubscriber.objects.filter(confirmation_token=token).first()
        if not sub:
            return None
        sub.status = NewsletterSubscriber.Status.ACTIVE
        sub.confirmed_at = timezone.now()
        sub.save(update_fields=["status", "confirmed_at", "updated_at"])
        return sub

    @classmethod
    def unsubscribe_by_token(cls, token: str) -> NewsletterSubscriber | None:
        sub = NewsletterSubscriber.objects.filter(unsubscribe_token=token).first()
        if not sub:
            return None
        sub.status = NewsletterSubscriber.Status.UNSUBSCRIBED
        sub.unsubscribed_at = timezone.now()
        sub.save(update_fields=["status", "unsubscribed_at", "updated_at"])
        return sub

    @classmethod
    @transaction.atomic
    def send_campaign(cls, campaign: NewsletterCampaign) -> int:
        qs = NewsletterSubscriber.objects.filter(
            status=NewsletterSubscriber.Status.ACTIVE,
            consent_given=True,
        )
        if campaign.target_language and campaign.target_language != "all":
            qs = qs.filter(language=campaign.target_language)

        sent_now = 0
        for sub in qs:
            if NewsletterDeliveryLog.objects.filter(campaign=campaign, subscriber=sub).exists():
                continue
            provider = cls._dispatch_email(
                to_email=sub.email,
                subject=campaign.subject_fr,
                html_or_text=campaign.content_html_fr,
            )
            NewsletterDeliveryLog.objects.create(
                campaign=campaign,
                subscriber=sub,
                provider=provider,
                status="SENT",
            )
            sent_now += 1

        if sent_now > 0 or campaign.status != NewsletterCampaign.Status.SENT:
            campaign.sent_count += sent_now
            campaign.status = NewsletterCampaign.Status.SENT
            campaign.sent_at = timezone.now()
            campaign.save(update_fields=["sent_count", "status", "sent_at", "updated_at"])
        return sent_now
