"""Email-based authentication backend for Rissala."""

from django.contrib.auth import get_user_model

User = get_user_model()


class EmailBackend:
    """
    Authenticates using email + password instead of username + password.
    This is the only auth backend used in production.
    """

    def authenticate(self, request, email: str = None, password: str = None, **kwargs):
        if email is None or password is None:
            return None
        try:
            user = User.objects.get(email__iexact=email.strip())
        except User.DoesNotExist:
            # Run the default password hasher to mitigate timing attacks
            User().set_password(password)
            return None

        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None

    def get_user(self, user_id):
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
        return user if self.user_can_authenticate(user) else None

    def user_can_authenticate(self, user) -> bool:
        return getattr(user, "is_active", False)
