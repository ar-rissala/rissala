from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q

User = get_user_model()


class EmailOrPseudoModelBackend(ModelBackend):
    """Authenticate user by email (case-insensitive) or pseudo."""

    def authenticate(self, request, username=None, password=None, **kwargs):
        identifier = (username or kwargs.get("email") or "").strip()
        if not identifier or not password:
            return None
        try:
            user = User.objects.filter(
                Q(email__iexact=identifier) | Q(pseudo__iexact=identifier)
            ).first()
        except User.DoesNotExist:
            return None

        if user and user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None

