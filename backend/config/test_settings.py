"""
Test settings — uses SQLite in-memory for fast test execution
without requiring a PostgreSQL connection.

Usage:
    python manage.py test accounts --settings=config.test_settings
"""

from .settings import *  # noqa: F403, F401

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": ":memory:",
    }
}

# Speed up password hashing in tests
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.MD5PasswordHasher",
]

# Use console email backend in tests
EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"
