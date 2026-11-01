import secrets
import uuid

from django.conf import settings
from django.db import models
from django.utils import timezone

from core.models import TimeStampedModel


class NewsletterSubscriber(TimeStampedModel):
    class Status(models.TextChoices):
        PENDING = "PENDING", "En attente de confirmation (Double opt-in)"
        ACTIVE = "ACTIVE", "Confirmé & Actif"
        UNSUBSCRIBED = "UNSUBSCRIBED", "Désabonné"
        BOUNCED = "BOUNCED", "Rebond / Invalide"

    email = models.EmailField(unique=True, db_index=True)
    first_name = models.CharField(max_length=100, blank=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="newsletter_subscriptions",
    )
    language = models.CharField(max_length=5, default="fr", db_index=True)
    status = models.CharField(
        max_length=16, choices=Status.choices, default=Status.PENDING, db_index=True
    )

    confirmation_token = models.CharField(max_length=128, unique=True, editable=False)
    unsubscribe_token = models.CharField(max_length=128, unique=True, editable=False)

    # GDPR Explicit Consent Proof
    consent_given = models.BooleanField(default=True)
    consent_text = models.TextField(blank=True)
    consent_ip_hash = models.CharField(max_length=64, blank=True)
    source_url = models.CharField(max_length=255, blank=True)
    consent_timestamp = models.DateTimeField(default=timezone.now)

    confirmed_at = models.DateTimeField(null=True, blank=True)
    unsubscribed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "Abonné Newsletter"
        verbose_name_plural = "Abonnés Newsletter"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.email} ({self.status})"

    def save(self, *args, **kwargs):
        self.email = (self.email or "").strip().lower()
        if not self.confirmation_token:
            self.confirmation_token = secrets.token_urlsafe(32)
        if not self.unsubscribe_token:
            self.unsubscribe_token = secrets.token_urlsafe(32)
        super().save(*args, **kwargs)


class NewsletterCampaign(TimeStampedModel):
    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Brouillon"
        SCHEDULED = "SCHEDULED", "Programmée"
        SENT = "SENT", "Envoyée"

    title = models.CharField(max_length=200)
    subject_fr = models.CharField(max_length=255)
    subject_en = models.CharField(max_length=255, blank=True)
    subject_ar = models.CharField(max_length=255, blank=True)

    content_html_fr = models.TextField()
    content_html_en = models.TextField(blank=True)
    content_html_ar = models.TextField(blank=True)

    target_language = models.CharField(max_length=10, default="all")
    status = models.CharField(
        max_length=16, choices=Status.choices, default=Status.DRAFT
    )
    idempotency_key = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    sent_at = models.DateTimeField(null=True, blank=True)
    sent_count = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Campagne Newsletter"
        verbose_name_plural = "Campagnes Newsletter"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title


class NewsletterDeliveryLog(TimeStampedModel):
    campaign = models.ForeignKey(
        NewsletterCampaign,
        on_delete=models.CASCADE,
        related_name="delivery_logs",
    )
    subscriber = models.ForeignKey(
        NewsletterSubscriber,
        on_delete=models.CASCADE,
        related_name="delivery_logs",
    )
    provider = models.CharField(max_length=40, default="django_email")
    status = models.CharField(max_length=20, default="SENT")
    error_message = models.TextField(blank=True)

    class Meta:
        verbose_name = "Journal d'envoi Newsletter"
        verbose_name_plural = "Journaux d'envois Newsletter"
        constraints = [
            models.UniqueConstraint(
                fields=["campaign", "subscriber"],
                name="unique_campaign_subscriber_delivery",
            )
        ]
