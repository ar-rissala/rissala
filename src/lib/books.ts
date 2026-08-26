// ─────────────────────────────────────────────────────────────────────────────
// Bibliothèque Islamique — Modèle de données & catalogue mocké
// À terme : remplacer mockBooks par des appels API Django/PostgreSQL
// ─────────────────────────────────────────────────────────────────────────────

export const BOOK_CATEGORIES = [
  "tous",
  "fondements",
  "fiqh",
  "langue-arabe",
  "coran",
  "hadith",
  "spiritualite",
  "histoire",
] as const;

export type BookCategory = (typeof BOOK_CATEGORIES)[number];

export const categoryLabels: Record<BookCategory, { fr: string; en: string; ar: string }> = {
  tous:          { fr: "Tous",          en: "All",          ar: "الكل" },
  fondements:    { fr: "Fondements",    en: "Foundations",  ar: "الأصول" },
  fiqh:          { fr: "Fiqh",          en: "Fiqh",         ar: "الفقه" },
  "langue-arabe":{ fr: "Langue Arabe",  en: "Arabic",       ar: "اللغة العربية" },
  coran:         { fr: "Coran",         en: "Quran",        ar: "القرآن" },
  hadith:        { fr: "Hadith",        en: "Hadith",       ar: "الحديث" },
  spiritualite:  { fr: "Spiritualité",  en: "Spirituality", ar: "الروحانية" },
  histoire:      { fr: "Histoire",      en: "History",      ar: "التاريخ" },
};

// ─────────────────────────────────────────────────────────────────────────────
// Type principal
// ─────────────────────────────────────────────────────────────────────────────

export type Book = {
  /** Identifiant unique, utilisé dans l'URL */
  id: string;
  /** Titre affiché */
  title: string;
  /** Nom de l'auteur */
  author: string;
  /** Courte description (1-2 phrases) */
  description: string;
  /** Catégorie principale */
  category: BookCategory;
  /** Chemin vers la couverture dans /public */
  coverUrl: string;
  /** Chemin vers le PDF dans /public/livres/ */
  pdfUrl: string;
  /** Nombre de pages (optionnel) */
  pages?: number;
  /** Langue du livre */
  language?: "ar" | "fr" | "en";
  /** Mise en avant sur la page d'accueil bibliothèque */
  featured?: boolean;
};

// ─────────────────────────────────────────────────────────────────────────────
// Catalogue mocké — à remplacer par un fetch API
// ─────────────────────────────────────────────────────────────────────────────

export const mockBooks: Book[] = [
  {
    id: "ne-sois-pas-triste",
    title: "Ne sois pas triste",
    author: "Aaidh ibn Abdullah al-Qarni",
    description:
      "Un guide spirituel majeur offrant des conseils pratiques et réconfortants, tirés du Coran et de la Sunna, pour surmonter les épreuves, l'anxiété et la tristesse au quotidien.",
    category: "spiritualite",
    coverUrl: "/images/covers/dont_be_sad_fr_cover.jpg",
    pdfUrl: "/livres/dont_be_sad_fr.pdf",
    pages: 464,
    language: "fr",
    featured: true,
  },
  {
    id: "risalat-ibn-abi-zayd",
    title: "La Risāla",
    author: "Ibn Abī Zayd al-Qayrawānī",
    description:
      "Traité fondamental de jurisprudence mālikite rédigé au Xe siècle. Couvre les cinq piliers, les transactions et les règles éthiques essentielles du musulman.",
    category: "fiqh",
    coverUrl: "/images/covers/risalat-ibn-abi-zayd.jpg",
    pdfUrl: "/livres/demo.pdf",
    pages: 112,
    language: "ar",
    featured: true,
  },
  {
    id: "usul-al-fiqh",
    title: "Principes de Jurisprudence Islamique",
    author: "Mohammad Hashim Kamali",
    description:
      "Introduction académique aux uṣūl al-fiqh : sources, méthodes d'interprétation, ijtihad et consensus. Référence incontournable pour les étudiants.",
    category: "fondements",
    coverUrl: "/images/covers/usul-al-fiqh.jpg",
    pdfUrl: "/livres/demo.pdf",
    pages: 380,
    language: "fr",
    featured: true,
  },
  {
    id: "introduction-sciences-coran",
    title: "Introduction aux Sciences du Coran",
    author: "Mannāʿ al-Qaṭṭān",
    description:
      "Étude systématique des sciences coraniques : révélation, compilation, tafsīr, qirāʾāt et abrogation. Ouvrage de référence dans les instituts islamiques.",
    category: "coran",
    coverUrl: "/images/covers/introduction-sciences-coran.jpg",
    pdfUrl: "/livres/demo.pdf",
    pages: 430,
    language: "ar",
    featured: false,
  },
  {
    id: "arbain-nawawi",
    title: "Les Quarante Hadiths",
    author: "Yaḥyā ibn Sharaf al-Nawawī",
    description:
      "Collection de quarante hadiths fondamentaux sélectionnés par l'imam al-Nawawī, couvrant les piliers de la foi, de l'adoration et de l'éthique islamique.",
    category: "hadith",
    coverUrl: "/images/covers/arbain-nawawi.jpg",
    pdfUrl: "/livres/demo.pdf",
    pages: 96,
    language: "ar",
    featured: false,
  },
  {
    id: "methode-arabe",
    title: "Méthode d'Apprentissage de l'Arabe",
    author: "Rissala",
    description:
      "Parcours progressif pour maîtriser l'arabe standard moderne et l'arabe coranique : phonétique, grammaire, vocabulaire et exercices de lecture.",
    category: "langue-arabe",
    coverUrl: "/images/covers/methode-arabe.jpg",
    pdfUrl: "/livres/demo.pdf",
    pages: 220,
    language: "fr",
    featured: true,
  },
  {
    id: "ihya-ulum-al-din",
    title: "Iḥyāʾ ʿUlūm al-Dīn",
    author: "Abū Ḥāmid al-Ghazālī",
    description:
      "Le chef-d'œuvre spirituel d'al-Ghazālī : revivification des sciences de la religion en quatre volumes. Couvre les actes d'adoration, les coutumes, les vices et les vertus.",
    category: "spiritualite",
    coverUrl: "/images/covers/ihya-ulum-al-din.jpg",
    pdfUrl: "/livres/demo.pdf",
    pages: 1500,
    language: "ar",
    featured: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Utilitaires — à terme wrappés dans des hooks React Query ou SWR
// ─────────────────────────────────────────────────────────────────────────────

/** Renvoie tous les livres (futur : fetch `/api/books`) */
export function getAllBooks(): Book[] {
  return mockBooks;
}

/** Renvoie un livre par son ID (futur : fetch `/api/books/{id}`) */
export function getBookById(id: string): Book | undefined {
  return mockBooks.find((b) => b.id === id);
}

/** Filtre les livres par catégorie et terme de recherche (côté client) */
export function filterBooks(
  books: Book[],
  category: BookCategory,
  query: string
): Book[] {
  const q = query.toLowerCase().trim();
  return books.filter((book) => {
    const matchCat = category === "tous" || book.category === category;
    const matchQuery =
      !q ||
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      categoryLabels[book.category].fr.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// LocalStorage — Lecture récente (bibliothèque personnelle)
// ─────────────────────────────────────────────────────────────────────────────

const RECENTLY_READ_KEY = "rissala_recently_read";
const MAX_RECENT = 6;

export type ReadingProgress = {
  bookId: string;
  lastPage: number;
  totalPages: number;
  lastReadAt: string; // ISO date
};

export function saveReadingProgress(progress: ReadingProgress): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getReadingHistory();
    const filtered = existing.filter((p) => p.bookId !== progress.bookId);
    const updated = [progress, ...filtered].slice(0, MAX_RECENT);
    localStorage.setItem(RECENTLY_READ_KEY, JSON.stringify(updated));
  } catch {
    // localStorage peut être désactivé
  }
}

export function getReadingHistory(): ReadingProgress[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENTLY_READ_KEY);
    return raw ? (JSON.parse(raw) as ReadingProgress[]) : [];
  } catch {
    return [];
  }
}

export function getBookProgress(bookId: string): ReadingProgress | undefined {
  return getReadingHistory().find((p) => p.bookId === bookId);
}
