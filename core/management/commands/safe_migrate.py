"""
Command to safely execute migrations and idempotent database seeding with engine-specific locking.
- PostgreSQL: Uses pg_advisory_lock to prevent concurrent migrations across multiple application instances.
- SQLite: Runs single-threaded sequentially before Gunicorn workers spawn.
"""
from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.db import connection

POSTGRES_MIGRATION_LOCK_ID = 84729104


class Command(BaseCommand):
    help = "Safely run database migrations and seeding with engine-specific concurrency protection."

    def handle(self, *args, **options):
        vendor = connection.vendor
        self.stdout.write(f"==> Safe database initialization (Engine: {vendor})")

        if vendor == "postgresql":
            self.stdout.write("==> Acquiring PostgreSQL advisory lock...")
            with connection.cursor() as cursor:
                cursor.execute("SELECT pg_advisory_lock(%s);", [POSTGRES_MIGRATION_LOCK_ID])
                try:
                    self.stdout.write("==> Lock acquired. Applying migrations...")
                    call_command("migrate", interactive=False)
                    self.stdout.write("==> Running idempotent seed...")
                    call_command("seed_rissala")
                finally:
                    cursor.execute("SELECT pg_advisory_unlock(%s);", [POSTGRES_MIGRATION_LOCK_ID])
                    self.stdout.write("==> PostgreSQL advisory lock released.")
        else:
            # SQLite: Single-instance execution
            self.stdout.write("==> Applying migrations...")
            call_command("migrate", interactive=False)
            self.stdout.write("==> Running idempotent seed...")
            call_command("seed_rissala")

        self.stdout.write(self.style.SUCCESS("==> Database initialization complete."))

