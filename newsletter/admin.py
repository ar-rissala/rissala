import csv

from django.contrib import admin, messages
from django.http import HttpResponse

from .models import NewsletterCampaign, NewsletterDeliveryLog, NewsletterSubscriber
from .services import NewsletterService


@admin.action(description="Exporter les abonnés actifs avec consentement RGPD (CSV)")
def export_subscribers_csv(modeladmin, request, queryset):
    eligible = queryset.filter(consent_given=True).exclude(
        status=NewsletterSubscriber.Status.UNSUBSCRIBED
    )
    response = HttpResponse(content_type="text/csv; charset=utf-8")
    response["Content-Disposition"] = 'attachment; filename="rissala_subscribers.csv"'
    writer = csv.writer(response)
    writer.writerow(["email", "first_name", "language", "status", "consent_timestamp", "confirmed_at"])
    for sub in eligible:
        writer.writerow(
            [
                sub.email,
                sub.first_name,
                sub.language,
                sub.status,
                sub.consent_timestamp.isoformat() if sub.consent_timestamp else "",
                sub.confirmed_at.isoformat() if sub.confirmed_at else "",
            ]
        )
    return response


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "language", "status", "consent_given", "consent_timestamp", "confirmed_at")
    list_filter = ("status", "language", "consent_given")
    search_fields = ("email", "first_name")
    actions = [export_subscribers_csv]


@admin.action(description="Envoyer la campagne aux abonnés actifs (idempotent)")
def dispatch_selected_campaigns(modeladmin, request, queryset):
    for campaign in queryset:
        count = NewsletterService.send_campaign(campaign)
        messages.success(request, f"Campagne « {campaign.title} » envoyée à {count} nouvel(aux) abonné(s).")


@admin.register(NewsletterCampaign)
class NewsletterCampaignAdmin(admin.ModelAdmin):
    list_display = ("title", "target_language", "status", "sent_count", "sent_at")
    list_filter = ("status", "target_language")
    actions = [dispatch_selected_campaigns]


@admin.register(NewsletterDeliveryLog)
class NewsletterDeliveryLogAdmin(admin.ModelAdmin):
    list_display = ("campaign", "subscriber", "provider", "status", "created_at")
    list_filter = ("provider", "status")
