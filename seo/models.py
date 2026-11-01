from django.db import models
from django.utils.translation import gettext_lazy as _

from core.models import TimeStampedModel


class RedirectRule(TimeStampedModel):
    """Custom URL redirect rules managed via Django Admin."""

    source_path = models.CharField(
        _("chemin source"),
        max_length=255,
        unique=True,
        db_index=True,
        help_text=_("Ex: /fr/old-page/"),
    )
    target_path = models.CharField(
        _("chemin ou URL cible"),
        max_length=500,
        help_text=_("Ex: /fr/sciences-islamiques/"),
    )
    is_permanent = models.BooleanField(_("redirection permanente (301)"), default=True)
    is_active = models.BooleanField(_("active"), default=True, db_index=True)
    hit_count = models.PositiveIntegerField(_("nombre d'accès"), default=0)

    class Meta:
        verbose_name = _("règle de redirection")
        verbose_name_plural = _("règles de redirection")
        ordering = ["source_path"]

    def __str__(self) -> str:
        code = "301" if self.is_permanent else "302"
        return f"{self.source_path} -> {self.target_path} ({code})"


class SiteSEOSettings(TimeStampedModel):
    """Global SEO & GEO metadata defaults."""

    site_name = models.CharField(_("nom du site"), max_length=120, default="Rissala")
    default_title_fr = models.CharField(
        max_length=160,
        default="Rissala — Sciences Islamiques, Langue Arabe & Finance Éthique",
    )
    default_title_en = models.CharField(
        max_length=160,
        default="Rissala — Islamic Sciences, Arabic Language & Ethical Finance",
    )
    default_title_ar = models.CharField(
        max_length=160,
        default="رسالة — العلوم الإسلامية، اللغة العربية والتمويل الأخلاقي",
    )
    default_description_fr = models.CharField(
        max_length=320,
        default="Plateforme francophone et internationale dédiée aux sciences islamiques, à l'apprentissage de l'arabe, à la finance islamique et à la bibliothèque numérique.",
    )
    default_description_en = models.CharField(
        max_length=320,
        default="International platform dedicated to Islamic sciences, Arabic language learning, Islamic finance, and a curated digital library.",
    )
    default_description_ar = models.CharField(
        max_length=320,
        default="منصة معرفية متخصصة في العلوم الإسلامية، تعلم اللغة العربية، المالية الإسلامية والمكتبة الرقمية.",
    )
    default_og_image = models.CharField(
        max_length=255, default="/static/LogoRissala.png"
    )
    organization_url = models.URLField(default="https://rissala.net")

    class Meta:
        verbose_name = _("configuration SEO globale")
        verbose_name_plural = _("configurations SEO globales")

    def __str__(self) -> str:
        return self.site_name

