"""Serializers for the accounts API."""

import re

from django.contrib.auth import authenticate, get_user_model, password_validation
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers

User = get_user_model()

_PSEUDO_RE = re.compile(r"^[\w.\-À-ÿ]+$", re.UNICODE)


# ── Registration ──────────────────────────────────────────────────────────────

class RegisterSerializer(serializers.Serializer):
    pseudo = serializers.CharField(min_length=3, max_length=50)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, label="Confirmation du mot de passe")
    accept_terms = serializers.BooleanField()

    def validate_pseudo(self, value: str) -> str:
        value = value.strip()
        if not _PSEUDO_RE.match(value):
            raise serializers.ValidationError(
                "Le pseudo ne peut contenir que des lettres, chiffres, points, tirets et underscores."
            )
        if User.objects.filter(pseudo__iexact=value).exists():
            raise serializers.ValidationError("Ce pseudo est déjà utilisé.")
        return value

    def validate_email(self, value: str) -> str:
        value = value.strip().lower()
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Cette adresse email est déjà associée à un compte.")
        return value

    def validate_accept_terms(self, value: bool) -> bool:
        if not value:
            raise serializers.ValidationError(
                "Vous devez accepter les conditions d'utilisation pour créer un compte."
            )
        return value

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError({"password2": "Les mots de passe ne correspondent pas."})
        # Run Django's built-in password validators
        try:
            password_validation.validate_password(data["password"])
        except Exception as e:
            raise serializers.ValidationError({"password": list(e.messages)})
        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        validated_data.pop("accept_terms")
        password = validated_data.pop("password")
        user = User.objects.create_user(password=password, **validated_data)
        return user


# ── Login ─────────────────────────────────────────────────────────────────────

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email", "").strip().lower()
        password = data.get("password", "")
        user = authenticate(request=self.context.get("request"), email=email, password=password)
        if user is None:
            raise serializers.ValidationError(
                {"non_field_errors": ["Email ou mot de passe incorrect."]}
            )
        if not user.is_active:
            raise serializers.ValidationError(
                {"non_field_errors": ["Ce compte a été désactivé."]}
            )
        data["user"] = user
        return data


# ── Me (current user) ─────────────────────────────────────────────────────────

class UserSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "pseudo", "email", "first_name", "display_name", "date_joined", "last_login"]
        read_only_fields = ["id", "email", "date_joined", "last_login", "display_name"]


# ── Password reset ────────────────────────────────────────────────────────────

class PasswordResetRequestSerializer(serializers.Serializer):
    """
    Accepts an email address and triggers Django's built-in reset flow.

    Intentionally returns the same success message regardless of whether
    the email exists — to avoid disclosing which emails are registered.
    """
    email = serializers.EmailField()

    def validate_email(self, value: str) -> str:
        return value.strip().lower()

    def save(self, request, use_https: bool = False, domain_override: str = None):
        """Use Django's PasswordResetForm to send the secure token email."""
        form = PasswordResetForm({"email": self.validated_data["email"]})
        if form.is_valid():
            form.save(
                request=request,
                use_https=use_https,
                from_email=None,  # Uses DEFAULT_FROM_EMAIL
                email_template_name="emails/password_reset_email.txt",
                html_email_template_name="emails/password_reset_email.html",
                domain_override=domain_override,
            )
        # Even if form is invalid (email not found), we silently succeed.


class PasswordResetConfirmSerializer(serializers.Serializer):
    uidb64 = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True, min_length=8)
    new_password2 = serializers.CharField(write_only=True, label="Confirmation")

    def validate(self, data):
        # Decode uid
        try:
            uid = force_str(urlsafe_base64_decode(data["uidb64"]))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError({"uidb64": "Lien invalide ou expiré."})

        # Check token
        if not default_token_generator.check_token(user, data["token"]):
            raise serializers.ValidationError({"token": "Lien invalide ou expiré."})

        # Validate passwords
        if data["new_password"] != data["new_password2"]:
            raise serializers.ValidationError({"new_password2": "Les mots de passe ne correspondent pas."})

        try:
            password_validation.validate_password(data["new_password"], user)
        except Exception as e:
            raise serializers.ValidationError({"new_password": list(e.messages)})

        data["user"] = user
        return data

    def save(self):
        user = self.validated_data["user"]
        user.set_password(self.validated_data["new_password"])
        user.save(update_fields=["password"])
        return user
