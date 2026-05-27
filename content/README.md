# Contenu multilingue

Structure des articles :

```
content/
├── fr/
│   ├── apprendre-arabe/
│   ├── sciences-islamiques/
│   └── finance-islamique/
├── en/
│   └── … (même arborescence)
└── ar/
    └── …
```

Chaque article = un fichier `.md` dont le nom devient le slug URL.

Exemples :

- `/fr/apprendre-arabe/voyelles-longues-arabe`
- `/en/apprendre-arabe/long-vowels` (slug anglais possible)
- `/ar/apprendre-arabe/...`

Navigation prev/next : utiliser `prevArticleSlug` / `nextArticleSlug` dans le frontmatter (pas d’URL absolues).
