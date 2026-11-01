from django.db import models
from django.utils.translation import gettext_lazy as _


class TimeStampedModel(models.Model):
    """Abstract base model with created_at and updated_at timestamps."""

    created_at = models.DateTimeField(_("date de création"), auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(_("date de modification"), auto_now=True)

    class Meta:
        abstract = True


TimestampedModel = TimeStampedModel
