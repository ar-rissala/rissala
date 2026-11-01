from django.contrib import admin

from .models import RedirectRule, SiteSEOSettings


@admin.register(RedirectRule)
class RedirectRuleAdmin(admin.ModelAdmin):
    list_display = ("source_path", "target_path", "is_permanent", "is_active", "hit_count", "updated_at")
    list_filter = ("is_permanent", "is_active")
    search_fields = ("source_path", "target_path")


@admin.register(SiteSEOSettings)
class SiteSEOSettingsAdmin(admin.ModelAdmin):
    list_display = ("site_name", "organization_url", "updated_at")

