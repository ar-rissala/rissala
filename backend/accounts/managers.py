"""Custom User Manager for Rissala."""

from django.contrib.auth.base_user import BaseUserManager
from django.utils.text import slugify
import re


class UserManager(BaseUserManager):
    """Manager for the custom User model using email as the unique identifier."""

    def _validate_pseudo(self, pseudo: str) -> str:
        pseudo = pseudo.strip()
        if not pseudo:
            raise ValueError("Le pseudo est obligatoire.")
        if len(pseudo) < 3:
            raise ValueError("Le pseudo doit comporter au moins 3 caractères.")
        if len(pseudo) > 50:
            raise ValueError("Le pseudo ne peut pas dépasser 50 caractères.")
        # Allow letters (including accented), digits, underscores, hyphens, dots
        if not re.match(r"^[\w.\-À-ÿ]+$", pseudo, re.UNICODE):
            raise ValueError(
                "Le pseudo ne peut contenir que des lettres, chiffres, points, tirets et underscores."
            )
        return pseudo

    def create_user(self, email: str, pseudo: str, password: str = None, **extra_fields):
        if not email:
            raise ValueError("L'adresse email est obligatoire.")
        email = self.normalize_email(email)
        pseudo = self._validate_pseudo(pseudo)
        user = self.model(email=email, pseudo=pseudo, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, pseudo: str, password: str = None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if not extra_fields.get("is_staff"):
            raise ValueError("Le superutilisateur doit avoir is_staff=True.")
        if not extra_fields.get("is_superuser"):
            raise ValueError("Le superutilisateur doit avoir is_superuser=True.")

        return self.create_user(email, pseudo, password, **extra_fields)
