import os
import sys
import django

# Setup Django environment if run as standalone script
if not os.environ.get("DJANGO_SETTINGS_MODULE"):
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    django.setup()

from django.db import connection


def reset_all_postgres_sequences():
    if connection.vendor != "postgresql":
        print(f"Ce script nécessite PostgreSQL (moteur détecté : {connection.vendor}).")
        sys.exit(1)

    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT table_name, column_name 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
              AND column_name = 'id'
            ORDER BY table_name;
        """)
        columns = cursor.fetchall()

        synchronized = 0
        for table_name, col_name in columns:
            cursor.execute(
                "SELECT pg_get_serial_sequence(%s, %s);",
                [f'"{table_name}"', col_name]
            )
            seq_result = cursor.fetchone()
            seq_name = seq_result[0] if seq_result else None

            if seq_name:
                cursor.execute(f"""
                    SELECT setval(
                        %s,
                        coalesce((SELECT max("{col_name}") FROM "{table_name}"), 1),
                        (SELECT max("{col_name}") FROM "{table_name}") IS NOT NULL
                    );
                """, [seq_name])
                synchronized += 1
                print(f"[OK] Séquence synchronisée : {table_name}.{col_name} -> {seq_name}")
            else:
                print(f"[INFO] Pas de séquence associée à {table_name}.{col_name}")

        print(f"\nTotal : {synchronized} séquences réalignées avec succès.")


if __name__ == "__main__":
    reset_all_postgres_sequences()
