from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = (
        "email",
        "pseudo",
        "first_name",
        "role",
        "preferred_language",
        "email_verified",
        "newsletter_opt_in",
        "is_active",
        "date_joined",
    )
    list_filter = ("role", "preferred_language", "email_verified", "newsletter_opt_in", "is_active", "is_staff")
    search_fields = ("email", "pseudo", "first_name", "last_name")
    ordering = ("-date_joined",)
    readonly_fields = ("date_joined", "updated_at", "last_login")

    fieldsets = (
        ("Identifiants", {"fields": ("email", "pseudo", "password")}),
        ("Informations personnelles", {"fields": ("first_name", "last_name", "bio")}),
        ("Rôle & Préférences", {"fields": ("role", "preferred_language", "newsletter_opt_in", "email_verified", "terms_accepted_at")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Dates", {"fields": ("last_login", "date_joined", "updated_at")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "pseudo", "first_name", "role", "preferred_language", "password1", "password2"),
            },
        ),
    )
