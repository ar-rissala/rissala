import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Compass, ShieldCheck, ScrollText, Scale, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Sciences Islamiques | Rissala — Comprendre l'Islam Classique",
  description:
    "Fiqh, Histoire du Prophète, compilation du Coran, science du hadith et écoles juridiques. Un cursus académique simplifié pour comprendre la tradition sunnite.",
};

const articles = [
  {
    icon: ShieldCheck,
    number: 1,
    title: "Comprendre l'Islam Sunnite",
    subtitle: "Origine, Sources et Structure Globale",
    description:
      "La définition de Ahl al-Sunna wa al-Jamā'a. Les 4 sources fondamentales (Coran, Sunna, Ijmā', Qiyās), la hiérarchie des textes et la logique de transmission.",
    href: "/sciences-islamiques/islam-sunnite-sources",
    tag: "Fondements",
  },
  {
    icon: Compass,
    number: 2,
    title: "La Vie du Prophète Muhammad",
    subtitle: "Contexte historique et chronologie essentielle",
    description:
      "L'Arabie préislamique, la révélation, la différence entre la période mecquoise et médinoise. Les événements clés : Hégire, batailles et construction de la communauté.",
    href: "/sciences-islamiques/vie-prophete-muhammad",
    tag: "Sīra",
  },
  {
    icon: BookOpen,
    number: 3,
    title: "La Transmission du Message",
    subtitle: "Du Prophète aux premiers musulmans",
    description:
      "Comment le Coran est passé de la récitation orale à la standardisation sous 'Uthmān. Le rôle crucial des compagnons (ṣaḥāba) et des successeurs (tābi'ūn).",
    href: "/sciences-islamiques/transmission-message-islamique",
    tag: "Histoire Textuelle",
  },
  {
    icon: ScrollText,
    number: 4,
    title: "La Science du Hadith",
    subtitle: "Comment al-Bukhārī a vérifié la Sunna",
    description:
      "La méthodologie (matn + isnād), la critique des narrateurs ('ilm al-rijāl) et les critères d'authentification (sahih, hasan, da'if) pour protéger le message.",
    href: "/sciences-islamiques/science-hadith-bukhari",
    tag: "Hadith",
  },
  {
    icon: Scale,
    number: 5,
    title: "Les Écoles Juridiques Sunnites",
    subtitle: "Comment le Fiqh s'est structuré",
    description:
      "L'apparition du besoin d'interprétation. Les 4 madhahib (Hanafī, Mālikī, Shāfi'ī, Hanbalī), leurs différences méthodologiques et la notion de divergence valide.",
    href: "/sciences-islamiques/ecoles-juridiques-sunnites",
    tag: "Fiqh",
  },
];

export default function SciencesIslamiquesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary/5 py-14 sm:py-18 lg:py-24 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">
            Sciences{" "}
            <span className="text-primary">Islamiques</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
            Découvrez la construction de la tradition sunnite de manière progressive, structurée et académique. De l&apos;histoire du Prophète à la formation des écoles juridiques.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <BookOpen className="h-4 w-4" />
            <span>Cursus Sunnite Complet • 5 Articles Fondamentaux</span>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-10 sm:py-14 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="space-y-5">
            {articles.map((article) => (
              <Link
                key={article.number}
                href={article.href}
                className="group block p-5 sm:p-6 lg:p-8 rounded-xl border border-border/50 bg-background/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Number + Icon */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-sm font-bold">
                      {article.number}
                    </span>
                    <article.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h2 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      <span className="inline-flex px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {article.tag}
                      </span>
                    </div>
                    <p className="text-sm text-primary/80 font-medium mb-2">{article.subtitle}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{article.description}</p>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 hidden sm:flex items-center self-center">
                    <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology CTA */}
      <section className="py-10 sm:py-14 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <h2 className="text-xl sm:text-2xl font-bold font-heading mb-4">
            Une approche historique et <span className="text-primary">systémique</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ce cursus n&apos;est pas un recueil de dogmes déconnectés. C&apos;est un voyage chronologique expliquant <strong>comment</strong> le message est né, a été transmis, filtré, puis interprété juridiquement au fil des siècles.
          </p>
          <Link
            href="/sciences-islamiques/islam-sunnite-sources"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Commencer par le Fondement
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
