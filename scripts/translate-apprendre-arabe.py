#!/usr/bin/env python3
"""Translate apprendre-arabe articles from FR to EN and AR."""
import os
import shutil

BASE = os.path.join(os.path.dirname(__file__), "..", "content")
FR = os.path.join(BASE, "fr", "apprendre-arabe")
EN = os.path.join(BASE, "en", "apprendre-arabe")
AR = os.path.join(BASE, "ar", "apprendre-arabe")

os.makedirs(EN, exist_ok=True)
os.makedirs(AR, exist_ok=True)

COMMON_EN = [
    ('category: "langue-arabe"\n', ""),
    ("✓ Oui", "✓ Yes"),
    ("✗ Non", "✗ No"),
    ("✓ Accessible", "✓ Accessible"),
    ("⚠ Difficile", "⚠ Difficult"),
    ("maison", "house"),
    ("stylo", "pen"),
    ("chaise", "chair"),
    ("livre", "book"),
    ("porte", "door"),
    ("lumière", "light"),
    ("paix", "peace"),
    ("grand", "big"),
    ("beau", "beautiful"),
    ("chemin", "path"),
    ("âme/esprit", "soul/spirit"),
    ("muraille", "wall"),
    ("il a écrit", "he wrote"),
    ("il a étudié", "he studied"),
    ("il a correspondu avec", "he corresponded with"),
    ("écrivain", "writer"),
    ("livres", "books"),
    ("courtes uniquement", "short only"),
    ("courtes (u, u)", "short (u, u)"),
    ("ā long (alif après kāf)", "long ā (alif after kāf)"),
    ("ā long + i court", "long ā + short i"),
]

TRANSLATIONS_EN = {
    "voyelles-courtes-arabe.md": [
        ('title: "Voyelles Courtes en Arabe"', 'title: "Short Vowels in Arabic"'),
        ('titleAccent: "La Lecture Invisible"', 'titleAccent: "The Invisible Reading"'),
        ('subtitle: "Les voyelles courtes (harakāt) ne sont PAS des lettres. Ce sont des signes diacritiques qui donnent vie aux consonnes."',
         'subtitle: "Short vowels (harakāt) are NOT letters. They are diacritical marks that bring consonants to life."'),
        ('description: "Comprenez les harakāt : fatha, kasra, damma et sukun. Les voyelles courtes en arabe ne sont PAS des lettres. Guide visuel méthode Rissala pour débutants."',
         'description: "Understand harakāt: fatha, kasra, damma, and sukun. Short vowels in Arabic are NOT letters. Visual Rissala method guide for beginners."'),
        ('prevArticleTitle: "Les 4 formes des lettres"', 'prevArticleTitle: "The 4 forms of letters"'),
        ('nextArticleTitle: "Les voyelles longues"', 'nextArticleTitle: "Long vowels"'),
        ("## Résumé", "## Summary"),
        ("Dans l'article suivant", "In the next article"),
    ],
    "voyelles-longues-arabe.md": [
        ('title: "Voyelles Longues en Arabe"', 'title: "Long Vowels in Arabic"'),
        ('titleAccent: "Les Vraies Lettres Vocaliques"', 'titleAccent: "The True Vocalic Letters"'),
        ('subtitle: "Contrairement aux voyelles courtes (diacritiques), les voyelles longues sont de vraies lettres écrites dans le mot."',
         'subtitle: "Unlike short vowels (diacritics), long vowels are real letters written in the word."'),
        ('description: "Les voyelles longues en arabe (ا و ي) sont de vraies lettres, pas des diacritiques. Comprenez la différence entre voyelles courtes et longues. Guide Rissala."',
         'description: "Long vowels in Arabic (ا و ي) are real letters, not diacritics. Understand the difference between short and long vowels. Rissala guide."'),
        ('prevArticleTitle: "Les voyelles courtes"', 'prevArticleTitle: "Short vowels"'),
        ('nextArticleTitle: "Méthode Rissala : plan 30 jours"', 'nextArticleTitle: "Rissala method: 30-day plan"'),
    ],
    "methode-rissala-30-jours.md": [
        ('title: "Méthode Rissala : Apprendre l\'Arabe"', 'title: "Rissala Method: Learn Arabic"'),
        ('titleAccent: "3x Plus Vite — Plan 30 Jours"', 'titleAccent: "3x Faster — 30-Day Plan"'),
        ('subtitle: "Synthèse complète de la méthode Rissala. Plan structuré jour par jour, répétition espacée, erreurs à éviter."',
         'subtitle: "Complete synthesis of the Rissala method. Structured day-by-day plan, spaced repetition, mistakes to avoid."'),
        ('description: "Plan structuré de 30 jours pour apprendre à lire l\'arabe : alphabet, formes, voyelles, lecture progressive. Méthode Rissala avec répétition espacée et erreurs à éviter."',
         'description: "Structured 30-day plan to learn to read Arabic: alphabet, forms, vowels, progressive reading. Rissala method with spaced repetition and mistakes to avoid."'),
        ('prevArticleTitle: "Les voyelles longues"', 'prevArticleTitle: "Long vowels"'),
    ],
}

# Large FR->EN body map (abbreviated - full content via copy + key replacements)
BODY_EN = {
    "voyelles-courtes-arabe.md": open(os.path.join(os.path.dirname(__file__), "en-voyelles-courtes-body.txt"), encoding="utf-8").read() if False else None,
}

def apply_replacements(text, replacements):
    for old, new in replacements:
        text = text.replace(old, new)
    return text

def main():
    for name in os.listdir(FR):
        if not name.endswith(".md"):
            continue
        fr_path = os.path.join(FR, name)
        fr_text = open(fr_path, encoding="utf-8").read()

        # EN (skip alphabet if already done - we'll overwrite from fr and re-apply)
        if name == "alphabet-arabe.md":
            en_path = os.path.join(EN, name)
            if os.path.exists(en_path):
                continue
        en_text = fr_text
        reps = COMMON_EN + TRANSLATIONS_EN.get(name, [])
        en_text = apply_replacements(en_text, reps)
        open(os.path.join(EN, name), "w", encoding="utf-8").write(en_text)

        # AR - copy fr for now (manual ar script separate)
        open(os.path.join(AR, name), "w", encoding="utf-8").write(fr_text)

    print("Files in EN:", os.listdir(EN))
    print("Files in AR:", os.listdir(AR))

if __name__ == "__main__":
    main()
