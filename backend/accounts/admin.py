"""Django Admin configuration for the accounts app."""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Admin for the custom User model.
    Provides full CRUD, search, filtering and organised field sections.
    """

    # ── List view ─────────────────────────────────────────────────────────────
    list_display = ("pseudo", "email", "first_name", "is_active", "is_staff", "date_joined", "last_login")
    list_display_links = ("pseudo", "email")
    list_filter = ("is_active", "is_staff", "is_superuser", "date_joined")
    search_fields = ("pseudo__icontains", "email__icontains", "first_name__icontains")
    ordering = ("-date_joined",)
    list_per_page = 50
    date_hierarchy = "date_joined"

    # ── Detail view — field sections ──────────────────────────────────────────
    fieldsets = (
        (
            "Identité",
            {
                "fields": ("pseudo", "email", "first_name"),
            },
        ),
        (
            "Mot de passe",
            {
                "fields": ("password",),
            },
        ),
        (
            "Statut du compte",
            {
                "fields": ("is_active", "is_staff", "is_superuser"),
                "description": (
                    "Désactivez le compte pour interdire la connexion. "
                    "is_staff donne accès à l'administration."
                ),
            },
        ),
        (
            "Permissions",
            {
                "fields": ("groups", "user_permissions"),
                "classes": ("collapse",),
            },
        ),
        (
            "Historique",
            {
                "fields": ("date_joined", "last_login"),
                "classes": ("collapse",),
            },
        ),
    )
    readonly_fields = ("date_joined", "last_login")

    # ── Create view ───────────────────────────────────────────────────────────
    add_fieldsets = (
        (
            "Créer un utilisateur",
            {
                "classes": ("wide",),
                "fields": ("pseudo", "email", "first_name", "password1", "password2"),
            },
        ),
        (
            "Statut",
            {
                "fields": ("is_active", "is_staff", "is_superuser"),
            },
        ),
    )

    # Override to use our email-based model (BaseUserAdmin expects username)
    filter_horizontal = ("groups", "user_permissions")

    # ── Custom actions ────────────────────────────────────────────────────────
    actions = ["activate_users", "deactivate_users"]

    @admin.action(description="Activer les comptes sélectionnés")
    def activate_users(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f"{updated} compte(s) activé(s).")

    @admin.action(description="Désactiver les comptes sélectionnés")
    def deactivate_users(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f"{updated} compte(s) désactivé(s).")
