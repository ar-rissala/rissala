import secrets

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, email, pseudo=None, password=None, **extra_fields):
        if not email:
            raise ValueError("L'adresse e-mail est obligatoire.")
        email = self.normalize_email(email).strip().lower()
        if not pseudo:
            pseudo = email.split("@")[0]
        user = self.model(email=email, pseudo=pseudo, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        if not user.email_verification_token:
            user.email_verification_token = secrets.token_urlsafe(32)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, pseudo="admin", password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("email_verified", True)
        extra_fields.setdefault("role", User.Role.ADMIN)
        return self.create_user(email=email, pseudo=pseudo, password=password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    class Role(models.TextChoices):
        MEMBER = "MEMBER", "Membre"
        EDITOR = "EDITOR", "Éditeur"
        ADMIN = "ADMIN", "Administrateur"

    LANGUAGE_CHOICES = (
        ("fr", "Français"),
        ("en", "English"),
        ("ar", "العربية"),
    )

    email = models.EmailField("Adresse e-mail", unique=True, db_index=True)
    pseudo = models.CharField("Pseudo", max_length=60, unique=True, db_index=True)
    first_name = models.CharField("Prénom", max_length=80, blank=True)
    last_name = models.CharField("Nom", max_length=80, blank=True)
    bio = models.TextField("Biographie", blank=True)
    role = models.CharField("Rôle", max_length=20, choices=Role.choices, default=Role.MEMBER)
    preferred_language = models.CharField(
        "Langue préférée", max_length=5, choices=LANGUAGE_CHOICES, default="fr"
    )
    email_verified = models.BooleanField("E-mail vérifié", default=False)
    email_verification_token = models.CharField(max_length=128, blank=True)
    newsletter_opt_in = models.BooleanField("Abonné newsletter", default=False)
    terms_accepted_at = models.DateTimeField("Conditions acceptées le", null=True, blank=True)

    is_active = models.BooleanField("Actif", default=True)
    is_staff = models.BooleanField("Accès staff", default=False)
    date_joined = models.DateTimeField("Date d'inscription", default=timezone.now)
    updated_at = models.DateTimeField("Modifié le", auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["pseudo"]

    class Meta:
        verbose_name = "Utilisateur"
        verbose_name_plural = "Utilisateurs"
        ordering = ["-date_joined"]

    def __str__(self):
        return f"{self.pseudo} ({self.email})"

    @property
    def display_name(self) -> str:
        if self.first_name and self.first_name.strip():
            return self.first_name.strip()
        return self.pseudo or self.email.split("@")[0]

    @property
    def initials(self) -> str:
        name = self.display_name
        return name[0].upper() if name else "?"

    @property
    def is_editorial_staff(self) -> bool:
        return self.is_superuser or self.is_staff or self.role in (self.Role.EDITOR, self.Role.ADMIN)

    @property
    def is_editor_or_admin(self) -> bool:
        return self.is_editorial_staff

    def has_perm(self, perm, obj=None):
        if self.is_active and self.is_superuser:
            return True
        if self.is_active and self.is_staff and self.role in (self.Role.EDITOR, self.Role.ADMIN):
            app_label = perm.split(".")[0] if "." in perm else ""
            if app_label in ("content", "books", "courses", "library"):
                return True
        return super().has_perm(perm, obj)

    def has_module_perms(self, app_label):
        if self.is_active and self.is_superuser:
            return True
        if self.is_active and self.is_staff and self.role in (self.Role.EDITOR, self.Role.ADMIN):
            if app_label in ("content", "books", "courses", "library"):
                return True
        return super().has_module_perms(app_label)
