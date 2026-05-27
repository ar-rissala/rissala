import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Compass,
  Coins,
  GraduationCap,
  Handshake,
  Languages,
  PenTool,
  Scale,
  ScrollText,
  ShieldCheck,
  Building2,
} from "lucide-react";
import {
  type ContentSection,
  type Locale,
  articlePath,
} from "@/lib/i18n";

export interface SectionArticleCard {
  slug: string;
  icon: LucideIcon;
  number: number;
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  description: Record<Locale, string>;
  tag: Record<Locale, string>;
}

export const apprendreArabeCatalog: SectionArticleCard[] = [
  {
    slug: "alphabet-arabe",
    icon: BookOpen,
    number: 1,
    title: { fr: "L'Alphabet Arabe", en: "The Arabic Alphabet", ar: "الأبجدية العربية" },
    subtitle: {
      fr: "Les 28 lettres fondamentales",
      en: "The 28 fundamental letters",
      ar: "الحروف الـ٢٨ الأساسية",
    },
    description: {
      fr: "Apprenez à prononcer et reconnaître les 28 lettres de l'alphabet arabe, la première étape essentielle.",
      en: "Learn to pronounce and recognize the 28 letters of the Arabic alphabet — the essential first step.",
      ar: "تعلّم نطق الحروف العربية الـ٢٨ والتعرّف عليها — الخطوة الأولى الأساسية.",
    },
    tag: { fr: "Base", en: "Basics", ar: "أساس" },
  },
  {
    slug: "formes-lettres-arabes",
    icon: PenTool,
    number: 2,
    title: { fr: "Les Formes des Lettres", en: "Letter Forms", ar: "أشكال الحروف" },
    subtitle: {
      fr: "Début, milieu et fin de mot",
      en: "Initial, medial, and final",
      ar: "أول الكلمة ووسطها وآخرها",
    },
    description: {
      fr: "Comprenez comment les lettres arabes s'attachent entre elles et changent de forme selon leur position.",
      en: "Understand how Arabic letters connect and change shape by position in a word.",
      ar: "افهم كيف تتصل الحروف العربية وتتغيّر أشكالها حسب موضعها في الكلمة.",
    },
    tag: { fr: "Écriture", en: "Writing", ar: "كتابة" },
  },
  {
    slug: "voyelles-courtes-arabe",
    icon: Languages,
    number: 3,
    title: { fr: "Les Voyelles Courtes", en: "Short Vowels", ar: "الحركات القصيرة" },
    subtitle: { fr: "Fatha, Kasra, Damma", en: "Fatha, Kasra, Damma", ar: "الفتحة والكسرة والضمة" },
    description: {
      fr: "Maîtrisez les voyelles courtes (Harakat) qui donnent le son exact à chaque lettre.",
      en: "Master short vowels (harakāt) that give each letter its precise sound.",
      ar: "أتقن الحركات القصيرة التي تعطي كل حرف صوته الدقيق.",
    },
    tag: { fr: "Lecture", en: "Reading", ar: "قراءة" },
  },
  {
    slug: "voyelles-longues-arabe",
    icon: Languages,
    number: 4,
    title: { fr: "Les Voyelles Longues", en: "Long Vowels", ar: "المدّ الطويل" },
    subtitle: { fr: "Alif, Waw, Ya", en: "Alif, Waw, Ya", ar: "الألف والواو والياء" },
    description: {
      fr: "Découvrez l'allongement des sons dans la langue arabe pour une prononciation parfaite.",
      en: "Learn vowel lengthening in Arabic for clear pronunciation.",
      ar: "تعرّف على إطالة الأصوات في العربية لنطق أوضح.",
    },
    tag: { fr: "Prononciation", en: "Pronunciation", ar: "نطق" },
  },
  {
    slug: "methode-rissala-30-jours",
    icon: GraduationCap,
    number: 5,
    title: {
      fr: "Méthode Rissala en 30 Jours",
      en: "Rissala 30-Day Method",
      ar: "منهج رسالة في ٣٠ يومًا",
    },
    subtitle: {
      fr: "Votre programme complet",
      en: "Your complete program",
      ar: "برنامجك الكامل",
    },
    description: {
      fr: "Un plan d'action structuré sur 30 jours pour passer de grand débutant à lecteur autonome.",
      en: "A structured 30-day plan from complete beginner to independent reader.",
      ar: "خطة منظمة لمدة ٣٠ يومًا من المبتدئ إلى قارئ مستقل.",
    },
    tag: { fr: "Méthode", en: "Method", ar: "منهج" },
  },
];

export const sciencesCatalog: SectionArticleCard[] = [
  {
    slug: "islam-sunnite-sources",
    icon: ShieldCheck,
    number: 1,
    title: {
      fr: "Comprendre l'Islam Sunnite",
      en: "Understanding Sunni Islam",
      ar: "فهم الإسلام السني",
    },
    subtitle: {
      fr: "Origine, Sources et Structure Globale",
      en: "Origins, sources, and structure",
      ar: "الأصل والمصادر والبنية",
    },
    description: {
      fr: "La définition de Ahl al-Sunna wa al-Jamā'a. Les 4 sources fondamentales et la logique de transmission.",
      en: "Ahl al-Sunna wa al-Jamā'a, the four sources, and the logic of transmission.",
      ar: "أهل السنة والجماعة والمصادر الأربعة ومنطق النقل.",
    },
    tag: { fr: "Fondements", en: "Foundations", ar: "أساس" },
  },
  {
    slug: "vie-prophete-muhammad",
    icon: Compass,
    number: 2,
    title: {
      fr: "La Vie du Prophète Muhammad",
      en: "The Life of Prophet Muhammad",
      ar: "سيرة النبي محمد",
    },
    subtitle: {
      fr: "Contexte historique et chronologie essentielle",
      en: "Historical context and key timeline",
      ar: "السياق التاريخي والتسلسل الزمني",
    },
    description: {
      fr: "L'Arabie préislamique, la révélation, la période mecquoise et médinoise, la Hégire et les batailles.",
      en: "Pre-Islamic Arabia, revelation, Meccan and Medinan periods, Hijra, and key events.",
      ar: "الجزيرة قبل الإسلام والوحي ومكّة والمدينة والهجرة والغزوات.",
    },
    tag: { fr: "Sīra", en: "Sīra", ar: "سيرة" },
  },
  {
    slug: "transmission-message-islamique",
    icon: BookOpen,
    number: 3,
    title: {
      fr: "La Transmission du Message",
      en: "Transmission of the Message",
      ar: "نقل الرسالة",
    },
    subtitle: {
      fr: "Du Prophète aux premiers musulmans",
      en: "From the Prophet to the first Muslims",
      ar: "من النبي إلى المسلمين الأوّلين",
    },
    description: {
      fr: "Du Coran oral à la standardisation sous 'Uthmān. Le rôle des compagnons et des successeurs.",
      en: "From oral Qur'an to 'Uthmānic standardization. The role of companions and successors.",
      ar: "من التلاوة إلى المصحف العثماني ودور الصحابة والتابعين.",
    },
    tag: { fr: "Histoire Textuelle", en: "Textual history", ar: "تاريخ نصّي" },
  },
  {
    slug: "science-hadith-bukhari",
    icon: ScrollText,
    number: 4,
    title: {
      fr: "La Science du Hadith",
      en: "Hadith Sciences",
      ar: "علم الحديث",
    },
    subtitle: {
      fr: "Comment al-Bukhārī a vérifié la Sunna",
      en: "How al-Bukhārī verified the Sunna",
      ar: "كيف تحقّق البخاري من السنّة",
    },
    description: {
      fr: "Matn + isnād, critique des narrateurs et critères d'authentification (sahih, hasan, da'if).",
      en: "Matn and isnād, narrator criticism, and grading (ṣaḥīḥ, ḥasan, ḍaʿīf).",
      ar: "المتن والإسناد وجرح التراجم والتصحيح والحسن والضعف.",
    },
    tag: { fr: "Hadith", en: "Hadith", ar: "حديث" },
  },
  {
    slug: "ecoles-juridiques-sunnites",
    icon: Scale,
    number: 5,
    title: {
      fr: "Les Écoles Juridiques Sunnites",
      en: "Sunni Legal Schools",
      ar: "المذاهب الفقهية السنية",
    },
    subtitle: {
      fr: "Comment le Fiqh s'est structuré",
      en: "How fiqh took shape",
      ar: "كيف تشكّل الفقه",
    },
    description: {
      fr: "Les 4 madhahib, leurs différences méthodologiques et la notion de divergence valide.",
      en: "The four madhāhib, methodological differences, and valid scholarly divergence.",
      ar: "المذاهب الأربعة واختلافها المنهجي والخلاف المشروع.",
    },
    tag: { fr: "Fiqh", en: "Fiqh", ar: "فقه" },
  },
];

export const financeCatalog: SectionArticleCard[] = [
  {
    slug: "fondements-commerce-islam",
    icon: Scale,
    number: 1,
    title: {
      fr: "Les Fondements du Commerce en Islam",
      en: "Foundations of Trade in Islam",
      ar: "أسس التجارة في الإسلام",
    },
    subtitle: {
      fr: "Licéité et Justice Économique",
      en: "Permissibility and economic justice",
      ar: "الجواز والعدالة الاقتصادية",
    },
    description: {
      fr: "Profit du commerce (bayʿ) vs usure (ribā). Philosophie économique islamique.",
      en: "Trade profit (bayʿ) vs usury (ribā). Islamic economic philosophy.",
      ar: "ربح البيع مقابل الربا. الفلسفة الاقتصادية الإسلامية.",
    },
    tag: { fr: "Fondements", en: "Foundations", ar: "أساس" },
  },
  {
    slug: "regles-vente-contrats",
    icon: Handshake,
    number: 2,
    title: {
      fr: "Les Règles de la Vente (Bayʿ)",
      en: "Rules of Sale (Bayʿ)",
      ar: "أحكام البيع",
    },
    subtitle: {
      fr: "Conditions de Validité d'un Contrat",
      en: "Conditions for a valid contract",
      ar: "شروط صحة العقد",
    },
    description: {
      fr: "Ijab et Qabul, licéité de l'objet, propriété, et interdiction du Gharar excessif.",
      en: "Offer and acceptance, lawful object, ownership, and excessive gharar.",
      ar: "الإيجاب والقبول وحلّية المبيع والملكية وتحريم الغرر الفاحش.",
    },
    tag: { fr: "Contrats", en: "Contracts", ar: "عقود" },
  },
  {
    slug: "riba-usure-explication",
    icon: Coins,
    number: 3,
    title: {
      fr: "Le Ribā en Détail",
      en: "Ribā in Detail",
      ar: "الربا بالتفصيل",
    },
    subtitle: {
      fr: "Ribā al-Faḍl et Ribā al-Nasīʾa",
      en: "Ribā al-faḍl and ribā al-nasīʾa",
      ar: "ربا الفضل وربا النسيئة",
    },
    description: {
      fr: "L'usure selon le hadith des 6 catégories. Vente à crédit licite vs prêt à intérêt.",
      en: "Usury per the six-commodity hadith. Lawful deferred sale vs interest loan.",
      ar: "الربا في حديث الستّة والبيع الآجل الجائز مقابل القرض بفائدة.",
    },
    tag: { fr: "Interdictions", en: "Prohibitions", ar: "محظورات" },
  },
  {
    slug: "zakat-mecanisme-economique",
    icon: BookOpen,
    number: 4,
    title: {
      fr: "La Zakāt",
      en: "Zakāt",
      ar: "الزكاة",
    },
    subtitle: {
      fr: "Pilier Spirituel et Mécanisme Économique",
      en: "Spiritual pillar and economic mechanism",
      ar: "ركن روحي وآلية اقتصادية",
    },
    description: {
      fr: "Rôle macro-économique de la Zakāt pour circuler la richesse et encourager l'investissement.",
      en: "Zakāt's macro-economic role in circulating wealth and encouraging investment.",
      ar: "دور الزكاة الاقتصادي في تدوير المال وتشجيع الاستثمار.",
    },
    tag: { fr: "Redistribution", en: "Redistribution", ar: "إعادة توزيع" },
  },
  {
    slug: "zakat-ere-moderne",
    icon: Coins,
    number: 5,
    title: {
      fr: "Comment la Zakāt purifie votre richesse",
      en: "How Zakāt purifies your wealth",
      ar: "كيف تطهّر الزكاة مالك",
    },
    subtitle: {
      fr: "Purifier sa Richesse au XXIe Siècle",
      en: "Purifying wealth in the 21st century",
      ar: "تطهير المال في القرن الحادي والعشرين",
    },
    description: {
      fr: "Règles de Zakāt sur actifs numériques, cryptos et portefeuilles boursiers.",
      en: "Zakāt rules for digital assets, crypto, and stock portfolios.",
      ar: "أحكام الزكاة على الأصول الرقمية والعملات المشفّرة والأسهم.",
    },
    tag: { fr: "Haute Science", en: "Advanced", ar: "متقدّم" },
  },
  {
    slug: "finance-islamique-moderne",
    icon: Building2,
    number: 6,
    title: {
      fr: "La Finance Islamique Moderne",
      en: "Modern Islamic Finance",
      ar: "التمويل الإسلامي الحديث",
    },
    subtitle: {
      fr: "De la Jurisprudence Classique aux Banques",
      en: "From classical fiqh to banks",
      ar: "من الفقه الكلاسيكي إلى المصارف",
    },
    description: {
      fr: "Murābaḥa, Ijāra, Mushāraka et Muḍāraba expliquées clairement.",
      en: "Murābaḥa, ijāra, mushāraka, and muḍāraba explained clearly.",
      ar: "المرابحة والإجارة والمشاركة والمضاربة بإيجاز واضح.",
    },
    tag: { fr: "Époque Moderne", en: "Modern era", ar: "عصر حديث" },
  },
];

export const sectionCatalogs: Record<ContentSection, SectionArticleCard[]> = {
  "apprendre-arabe": apprendreArabeCatalog,
  "sciences-islamiques": sciencesCatalog,
  "finance-islamique": financeCatalog,
};

export function catalogHref(
  lang: Locale,
  section: ContentSection,
  slug: string
): string {
  return articlePath(lang, section, slug);
}
