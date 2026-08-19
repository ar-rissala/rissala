"""Custom User Model for Rissala.

Uses email as the unique login identifier.
Designed to be easily extensible for the future training platform
(Course, Lesson, Enrollment, Progress, Certificate).
"""

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model for Rissala.

    email     → login identifier
    pseudo    → displayed username (unique, required)
    first_name → optional, used to personalise emails ("Bonjour Ahmed,")
    """

    # ── Core fields ──────────────────────────────────────────────────────────
    pseudo = models.CharField(
        verbose_name="Pseudo",
        max_length=50,
        unique=True,
        help_text="Pseudo unique visible par les autres membres (3–50 caractères).",
    )
    email = models.EmailField(
        verbose_name="Adresse email",
        unique=True,
        help_text="Adresse email utilisée pour la connexion.",
    )
    first_name = models.CharField(
        verbose_name="Prénom",
        max_length=150,
        blank=True,
        default="",
        help_text="Facultatif. Utilisé pour personnaliser les emails.",
    )

    # ── Permissions & status ─────────────────────────────────────────────────
    is_active = models.BooleanField(
        verbose_name="Compte actif",
        default=True,
        help_text="Désactivez ce compte pour interdire la connexion sans supprimer l'utilisateur.",
    )
    is_staff = models.BooleanField(
        verbose_name="Accès administration",
        default=False,
        help_text="Permet l'accès à l'interface d'administration Django.",
    )

    # ── Timestamps ───────────────────────────────────────────────────────────
    date_joined = models.DateTimeField(
        verbose_name="Date d'inscription",
        default=timezone.now,
    )
    # last_login is provided by AbstractBaseUser

    # ── Manager ──────────────────────────────────────────────────────────────
    objects = UserManager()

    # ── Auth configuration ───────────────────────────────────────────────────
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["pseudo"]  # Required by createsuperuser (beyond email)

    class Meta:
        verbose_name = "Utilisateur"
        verbose_name_plural = "Utilisateurs"
        ordering = ["-date_joined"]

    def __str__(self) -> str:
        return f"{self.pseudo} <{self.email}>"

    @property
    def display_name(self) -> str:
        """Return first_name if set, otherwise pseudo."""
        return self.first_name.strip() if self.first_name.strip() else self.pseudo

    @property
    def greeting(self) -> str:
        """Return greeting string e.g. 'Bonjour Ahmed,' or 'Bonjour,'."""
        name = self.first_name.strip()
        return f"Bonjour {name}," if name else "Bonjour,"
