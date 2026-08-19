import type { Metadata } from "next";
import { BookOpen, Scale, Globe, Target } from "lucide-react";
import { type Locale } from "@/lib/i18n";
import { PageHero } from "@/components/ui/page-hero";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const content = pageCopy[lang] || pageCopy.fr;
  return {
    title: content.metaTitle,
    description: content.metaDesc,
    alternates: {
      languages: {
        fr: "https://rissala.net/fr/a-propos",
        en: "https://rissala.net/en/about",
        ar: "https://rissala.net/ar/about",
      },
    },
  };
}

const pageCopy = {
  fr: {
    metaTitle: "À propos de Rissala | Sciences Islamiques, Arabe & Finance",
    metaDesc: "Rissala est une plateforme éducative dédiée à l'étude des sciences islamiques, de l'arabe et de la finance islamique, fondée sur des sources authentiques.",
    h1: "À propos de",
    h1Span: "Rissala",
    h2: "Rissala : la plateforme de référence en sciences islamiques, langue arabe et finance islamique",
    intro: "Rissala est une plateforme éducative dédiée à l'étude rigoureuse des sciences islamiques, à l'apprentissage de la langue arabe et à la compréhension de la finance islamique. Disponible en français, en anglais et en arabe, elle rend accessibles des connaissances authentiques, vérifiées et structurées, fondées sur le Coran, la Sunna et les avis des savants classiques et contemporains.",
    h3_1: "Ce que nous enseignons",
    features: [
      { title: "Fiqh (jurisprudence islamique)", desc: "Comparaison des quatre écoles juridiques (madhabs) : hanafite, malikite, chaféite, hanbalite." },
      { title: "Hadith et sciences du hadith", desc: "Authentification, chaînes de transmission (isnad), classification." },
      { title: "Tafsir (exégèse coranique)", desc: "Interprétation classique et contemporaine du Coran." },
      { title: "Aqida (croyance islamique)", desc: "Fondements de la foi selon Ahl al-Sunna." },
      { title: "Sîra (biographie du Prophète ﷺ)", desc: "Vie, contexte historique et enseignements." },
      { title: "Langue arabe", desc: "Grammaire (nahw), conjugaison (sarf), vocabulaire coranique, arabe classique et moderne." },
      { title: "Finance islamique", desc: "Principes de la charia économique, contrats halal, alternatives à la banque conventionnelle, zakat, investissement conforme." }
    ],
    h3_2: "Notre approche",
    approach: "Chaque contenu publié sur Rissala repose sur des sources primaires — Coran, Sunna authentifiée — et sur les positions établies des écoles juridiques reconnues, avec citation systématique des références. Notre méthodologie privilégie la traçabilité des sources à l'opinion non sourcée.",
    h3_3: "À qui s'adresse Rissala",
    audience1: "Rissala s'adresse aux nouveaux musulmans, aux étudiants en sciences islamiques, aux personnes en apprentissage de la langue arabe, et à toute personne souhaitant structurer sa compréhension de l'islam ou des principes de la finance islamique — en français, en anglais ou en arabe.",
    audience2: "Rissala est pensée pour une audience internationale : chaque version linguistique offre un accès complet et natif au même niveau d'exigence et de rigueur.",
  },
  en: {
    metaTitle: "About Rissala | Islamic Sciences, Arabic & Finance",
    metaDesc: "Rissala is an educational platform dedicated to the study of Islamic sciences, Arabic, and Islamic finance, based on authentic sources.",
    h1: "About",
    h1Span: "Rissala",
    h2: "Rissala: the reference platform for Islamic sciences, Arabic language, and Islamic finance",
    intro: "Rissala is an educational platform dedicated to the rigorous study of Islamic sciences, the learning of the Arabic language, and the understanding of Islamic finance. Available in French, English, and Arabic, it provides access to authentic, verified, and structured knowledge based on the Quran, the Sunnah, and the opinions of classical and contemporary scholars.",
    h3_1: "What we teach",
    features: [
      { title: "Fiqh (Islamic jurisprudence)", desc: "Comparison of the four schools of law (madhabs): Hanafi, Maliki, Shafi'i, Hanbali." },
      { title: "Hadith and Hadith sciences", desc: "Authentication, chains of transmission (isnad), classification." },
      { title: "Tafsir (Quranic exegesis)", desc: "Classical and contemporary interpretation of the Quran." },
      { title: "Aqida (Islamic creed)", desc: "Foundations of faith according to Ahl al-Sunna." },
      { title: "Sîra (Prophetic biography ﷺ)", desc: "Life, historical context, and teachings." },
      { title: "Arabic language", desc: "Grammar (nahw), conjugation (sarf), Quranic vocabulary, classical and modern Arabic." },
      { title: "Islamic finance", desc: "Principles of economic Sharia, halal contracts, alternatives to conventional banking, zakat, compliant investment." }
    ],
    h3_2: "Our approach",
    approach: "Every piece of content published on Rissala is based on primary sources — the Quran, authentic Sunnah — and the established positions of recognized schools of law, with systematic citation of references. Our methodology prioritizes the traceability of sources over unsourced opinions.",
    h3_3: "Who Rissala is for",
    audience1: "Rissala is aimed at new Muslims, students of Islamic sciences, people learning the Arabic language, and anyone wishing to structure their understanding of Islam or the principles of Islamic finance — in French, English, or Arabic.",
    audience2: "Rissala is designed for an international audience: each linguistic version provides full and native access to the same level of standard and rigor.",
  },
  ar: {
    metaTitle: "نبذة عن رسالة | العلوم الإسلامية، العربية والتمويل",
    metaDesc: "رسالة هي منصة تعليمية مخصصة لدراسة العلوم الإسلامية واللغة العربية والتمويل الإسلامي، استناداً إلى مصادر أصيلة.",
    h1: "نبذة عن",
    h1Span: "رسالة",
    h2: "رسالة: المنصة المرجعية في العلوم الإسلامية، اللغة العربية والتمويل الإسلامي",
    intro: "رسالة هي منصة تعليمية مخصصة للدراسة المنهجية للعلوم الإسلامية، وتعلم اللغة العربية، وفهم التمويل الإسلامي. تتوفر باللغات الفرنسية، الإنجليزية، والعربية، وتقدم معارف أصيلة وموثقة ومنهجية مبنية على القرآن الكريم والسنة النبوية وآراء العلماء المعتبرين قديماً وحديثاً.",
    h3_1: "ما ندرّسه",
    features: [
      { title: "الفقه", desc: "مقارنة المذاهب الفقهية الأربعة: الحنفي، المالكي، الشافعي، الحنبلي." },
      { title: "الحديث وعلومه", desc: "التخريج، الأسانيد، التصنيف." },
      { title: "التفسير", desc: "التفسير الكلاسيكي والمعاصر للقرآن الكريم." },
      { title: "العقيدة", desc: "أصول الإيمان وفق منهج أهل السنة والجماعة." },
      { title: "السيرة (سيرة النبي ﷺ)", desc: "حياته، السياق التاريخي، والدروس المستفادة." },
      { title: "اللغة العربية", desc: "النحو، الصرف، المفردات القرآنية، العربية الفصحى والمعاصرة." },
      { title: "التمويل الإسلامي", desc: "مبادئ الشريعة الاقتصادية، العقود الحلال، بدائل البنوك التقليدية، الزكاة، والاستثمار المتوافق." }
    ],
    h3_2: "منهجنا",
    approach: "يعتمد كل محتوى يُنشر على منصة رسالة على المصادر الأساسية — القرآن الكريم والسنة الصحيحة — والمواقف المعتمدة للمذاهب الفقهية المعروفة، مع التوثيق المنهجي للمراجع. تمنح منهجيتنا الأولوية لتأصيل المصادر على الآراء غير الموثقة.",
    h3_3: "لمن توجه منصة رسالة",
    audience1: "رسالة موجهة للمسلمين الجدد، وطلبة العلم الشرعي، ومتعلمي اللغة العربية، وكل من يرغب في بناء فهم منهجي للإسلام أو لمبادئ التمويل الإسلامي — باللغات الفرنسية، الإنجليزية، أو العربية.",
    audience2: "صُممت رسالة لجمهور عالمي: حيث توفر كل نسخة لغوية وصولاً كاملاً وأصلياً بنفس مستوى الدقة والجودة.",
  }
};

export default async function AboutLocalizedPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = pageCopy[lang] || pageCopy.fr;
  const isRtl = lang === "ar";
  
  return (
    <div className={`flex flex-col min-h-screen ${isRtl ? "text-right" : "text-left"}`} dir={isRtl ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <PageHero>
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-heading">
            {t.h1} <span className="text-primary">{t.h1Span}</span>
          </h1>
          <h2 className="text-xl sm:text-2xl text-foreground font-semibold mb-6">
            {t.h2}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-justify sm:text-center">
            {t.intro}
          </p>
        </div>
      </PageHero>

      {/* Main Content Section */}
      <section className="py-14 sm:py-18 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl space-y-16">
          
          {/* Ce que nous enseignons */}
          <div>
            <div className={`flex items-center gap-3 mb-6 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading">{t.h3_1}</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
              {t.features.map((feature, idx) => (
                <li key={idx} className={`bg-background/50 p-4 rounded-lg border ${idx === t.features.length - 1 ? 'md:col-span-2' : ''}`}>
                  <strong className="text-foreground block mb-1">{feature.title}</strong>
                  {feature.desc}
                </li>
              ))}
            </ul>
          </div>

          {/* Notre approche */}
          <div>
            <div className={`flex items-center gap-3 mb-6 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Scale className="h-6 w-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading">{t.h3_2}</h3>
            </div>
            <p className={`text-lg text-muted-foreground leading-relaxed bg-background/50 p-6 rounded-lg border ${isRtl ? 'border-r-4 border-r-primary' : 'border-l-4 border-l-primary'}`}>
              {t.approach}
            </p>
          </div>

          {/* À qui s'adresse Rissala */}
          <div>
            <div className={`flex items-center gap-3 mb-6 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading">{t.h3_3}</h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t.audience1}
            </p>
            <div className={`flex items-center gap-4 bg-primary/5 p-4 rounded-lg border border-primary/20 ${isRtl ? "flex-row-reverse text-right" : ""}`}>
              <Globe className="h-8 w-8 text-primary shrink-0" />
              <p className="text-muted-foreground">
                {t.audience2}
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
