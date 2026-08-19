"""URL routing for the accounts API."""

from django.urls import path
from .views import (
    CsrfTokenView,
    RegisterView,
    LoginView,
    LogoutView,
    MeView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
)

urlpatterns = [
    # CSRF cookie (must be fetched before any state-changing request)
    path("csrf/", CsrfTokenView.as_view(), name="accounts-csrf"),

    # Auth
    path("register/", RegisterView.as_view(), name="accounts-register"),
    path("login/", LoginView.as_view(), name="accounts-login"),
    path("logout/", LogoutView.as_view(), name="accounts-logout"),
    path("me/", MeView.as_view(), name="accounts-me"),

    # Password reset
    path("password-reset/", PasswordResetRequestView.as_view(), name="password-reset-request"),
    path("password-reset/confirm/", PasswordResetConfirmView.as_view(), name="password-reset-confirm"),
]
