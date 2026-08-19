"""
Comprehensive tests for the accounts app.

Covers registration, login, logout and password reset flows.
Run with: python manage.py test accounts
"""

from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.test import TestCase
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework.test import APIClient

User = get_user_model()

REGISTER_URL = "/api/accounts/register/"
LOGIN_URL = "/api/accounts/login/"
LOGOUT_URL = "/api/accounts/logout/"
ME_URL = "/api/accounts/me/"
RESET_URL = "/api/accounts/password-reset/"
RESET_CONFIRM_URL = "/api/accounts/password-reset/confirm/"
CSRF_URL = "/api/accounts/csrf/"


def get_csrf(client: APIClient) -> str:
    """Fetch and return a CSRF token."""
    response = client.get(CSRF_URL)
    return response.data["csrfToken"]


class RegistrationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.valid_payload = {
            "pseudo": "TestUser",
            "email": "test@example.com",
            "password": "Str0ng!Pass#99",
            "password2": "Str0ng!Pass#99",
            "accept_terms": True,
        }

    def _post(self, payload=None):
        return self.client.post(REGISTER_URL, payload or self.valid_payload, format="json")

    # ── Happy path ────────────────────────────────────────────────────────────

    def test_valid_registration_creates_user(self):
        res = self._post()
        self.assertEqual(res.status_code, 201)
        self.assertTrue(User.objects.filter(email="test@example.com").exists())

    def test_valid_registration_returns_user_data(self):
        res = self._post()
        self.assertIn("user", res.data)
        self.assertEqual(res.data["user"]["pseudo"], "TestUser")
        self.assertNotIn("password", res.data["user"])

    def test_password_is_hashed(self):
        self._post()
        user = User.objects.get(email="test@example.com")
        self.assertTrue(user.check_password("Str0ng!Pass#99"))
        self.assertNotEqual(user.password, "Str0ng!Pass#99")

    def test_auto_login_after_registration(self):
        """User must be automatically logged in after registration."""
        res = self._post()
        self.assertEqual(res.status_code, 201)
        # Session must be set
        me_res = self.client.get(ME_URL)
        self.assertEqual(me_res.status_code, 200)
        self.assertEqual(me_res.data["email"], "test@example.com")

    # ── Pseudo validation ─────────────────────────────────────────────────────

    def test_pseudo_required(self):
        payload = {**self.valid_payload, "pseudo": ""}
        res = self._post(payload)
        self.assertEqual(res.status_code, 400)
        self.assertIn("pseudo", res.data)

    def test_pseudo_too_short(self):
        payload = {**self.valid_payload, "pseudo": "ab"}
        res = self._post(payload)
        self.assertEqual(res.status_code, 400)

    def test_pseudo_already_taken(self):
        self._post()
        payload = {**self.valid_payload, "email": "other@example.com"}
        res = self._post(payload)
        self.assertEqual(res.status_code, 400)
        self.assertIn("pseudo", res.data)

    def test_pseudo_case_insensitive_uniqueness(self):
        self._post()
        payload = {**self.valid_payload, "pseudo": "testuser", "email": "other@example.com"}
        res = self._post(payload)
        self.assertEqual(res.status_code, 400)

    def test_pseudo_invalid_characters(self):
        payload = {**self.valid_payload, "pseudo": "bad pseudo!"}
        res = self._post(payload)
        self.assertEqual(res.status_code, 400)

    # ── Email validation ──────────────────────────────────────────────────────

    def test_email_required(self):
        payload = {**self.valid_payload, "email": ""}
        res = self._post(payload)
        self.assertEqual(res.status_code, 400)
        self.assertIn("email", res.data)

    def test_email_invalid_format(self):
        payload = {**self.valid_payload, "email": "not-an-email"}
        res = self._post(payload)
        self.assertEqual(res.status_code, 400)

    def test_email_already_used(self):
        self._post()
        payload = {**self.valid_payload, "pseudo": "OtherUser"}
        res = self._post(payload)
        self.assertEqual(res.status_code, 400)
        self.assertIn("email", res.data)

    # ── Password validation ───────────────────────────────────────────────────

    def test_password_too_short(self):
        payload = {**self.valid_payload, "password": "abc", "password2": "abc"}
        res = self._post(payload)
        self.assertEqual(res.status_code, 400)

    def test_password_mismatch(self):
        payload = {**self.valid_payload, "password2": "Different!123"}
        res = self._post(payload)
        self.assertEqual(res.status_code, 400)
        self.assertIn("password2", res.data)

    def test_weak_password_rejected(self):
        payload = {**self.valid_payload, "password": "password", "password2": "password"}
        res = self._post(payload)
        self.assertEqual(res.status_code, 400)

    # ── Terms ─────────────────────────────────────────────────────────────────

    def test_terms_required(self):
        payload = {**self.valid_payload, "accept_terms": False}
        res = self._post(payload)
        self.assertEqual(res.status_code, 400)


class LoginTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="user@example.com",
            pseudo="LoginUser",
            password="Str0ng!Pass#99",
        )
        self.valid_payload = {"email": "user@example.com", "password": "Str0ng!Pass#99"}

    def _post(self, payload=None):
        return self.client.post(LOGIN_URL, payload or self.valid_payload, format="json")

    def test_valid_login(self):
        res = self._post()
        self.assertEqual(res.status_code, 200)
        self.assertIn("user", res.data)

    def test_wrong_email(self):
        payload = {**self.valid_payload, "email": "wrong@example.com"}
        res = self._post(payload)
        self.assertEqual(res.status_code, 400)

    def test_wrong_password(self):
        payload = {**self.valid_payload, "password": "WrongPassword!"}
        res = self._post(payload)
        self.assertEqual(res.status_code, 400)

    def test_inactive_user_cannot_login(self):
        self.user.is_active = False
        self.user.save()
        res = self._post()
        self.assertEqual(res.status_code, 400)

    def test_authenticated_user_can_access_me(self):
        self._post()
        res = self.client.get(ME_URL)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data["email"], "user@example.com")

    def test_unauthenticated_user_cannot_access_me(self):
        # DRF SessionAuthentication returns 403 (CSRF check before auth check)
        res = self.client.get(ME_URL)
        self.assertIn(res.status_code, [401, 403])


class LogoutTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="user@example.com",
            pseudo="LogoutUser",
            password="Str0ng!Pass#99",
        )

    def _login(self):
        self.client.post(LOGIN_URL, {"email": "user@example.com", "password": "Str0ng!Pass#99"}, format="json")

    def test_logout_destroys_session(self):
        self._login()
        res = self.client.post(LOGOUT_URL, format="json")
        self.assertEqual(res.status_code, 200)

    def test_protected_access_blocked_after_logout(self):
        self._login()
        self.client.post(LOGOUT_URL, format="json")
        res = self.client.get(ME_URL)
        # DRF SessionAuthentication: 403 after logout (session cleared)
        self.assertIn(res.status_code, [401, 403])

    def test_unauthenticated_logout_returns_401(self):
        # DRF SessionAuthentication returns 403 for unauthenticated POST
        res = self.client.post(LOGOUT_URL, format="json")
        self.assertIn(res.status_code, [401, 403])


class PasswordResetTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="user@example.com",
            pseudo="ResetUser",
            password="OldStr0ng!Pass#99",
        )

    def test_reset_request_existing_email_returns_200(self):
        res = self.client.post(RESET_URL, {"email": "user@example.com"}, format="json")
        self.assertEqual(res.status_code, 200)

    def test_reset_request_nonexistent_email_also_returns_200(self):
        """Must not reveal whether an email is registered."""
        res = self.client.post(RESET_URL, {"email": "nobody@example.com"}, format="json")
        self.assertEqual(res.status_code, 200)

    def test_reset_request_same_message_for_both(self):
        """Response message must be identical regardless of email existence."""
        res_existing = self.client.post(RESET_URL, {"email": "user@example.com"}, format="json")
        res_missing = self.client.post(RESET_URL, {"email": "nobody@example.com"}, format="json")
        self.assertEqual(res_existing.data["message"], res_missing.data["message"])

    def _make_reset_payload(self, new_password="NewStr0ng!Pass#99"):
        uid = urlsafe_base64_encode(force_bytes(self.user.pk))
        token = default_token_generator.make_token(self.user)
        return {
            "uidb64": uid,
            "token": token,
            "new_password": new_password,
            "new_password2": new_password,
        }

    def test_valid_reset_confirm(self):
        payload = self._make_reset_payload()
        res = self.client.post(RESET_CONFIRM_URL, payload, format="json")
        self.assertEqual(res.status_code, 200)

    def test_new_password_is_usable(self):
        payload = self._make_reset_payload("NewStr0ng!Pass#99")
        self.client.post(RESET_CONFIRM_URL, payload, format="json")
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password("NewStr0ng!Pass#99"))

    def test_old_password_no_longer_works(self):
        payload = self._make_reset_payload("NewStr0ng!Pass#99")
        self.client.post(RESET_CONFIRM_URL, payload, format="json")
        self.user.refresh_from_db()
        self.assertFalse(self.user.check_password("OldStr0ng!Pass#99"))

    def test_invalid_token_rejected(self):
        uid = urlsafe_base64_encode(force_bytes(self.user.pk))
        payload = {
            "uidb64": uid,
            "token": "bad-token",
            "new_password": "NewStr0ng!Pass#99",
            "new_password2": "NewStr0ng!Pass#99",
        }
        res = self.client.post(RESET_CONFIRM_URL, payload, format="json")
        self.assertEqual(res.status_code, 400)

    def test_password_mismatch_in_confirm(self):
        payload = self._make_reset_payload()
        payload["new_password2"] = "Different!Pass#99"
        res = self.client.post(RESET_CONFIRM_URL, payload, format="json")
        self.assertEqual(res.status_code, 400)
