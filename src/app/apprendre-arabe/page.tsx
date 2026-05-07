import type { Metadata } from "next";
import Link from "next/link";
import { PenTool, Layers, Eye, BookOpen, Rocket, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Apprendre l'Arabe | Méthode Rissala — Cours Structurés pour Débutants",
  description:
    "Apprenez l'arabe depuis zéro avec la méthode Rissala : alphabet, formes des lettres, voyelles courtes et longues, plan 30 jours. Méthode progressive et visuelle.",
};

const articles = [
  {
    icon: PenTool,
    number: 1,
    title: "L'Alphabet Arabe",
    subtitle: "28 lettres, formes isolées, système abjad",
    description:
      "Maîtrisez les 28 lettres dans leur forme isolée. Familles visuelles, lettres difficiles (ع غ ح خ ق ط ظ ص), direction droite → gauche et logique de l'abjad.",
    href: "/apprendre-arabe/alphabet-arabe",
    tag: "Fondation",
  },
  {
    icon: Layers,
    number: 2,
    title: "Les 4 Formes des Lettres",
    subtitle: "Isolée, initiale, médiane, finale",
    description:
      "Comprenez le système cursif arabe : chaque lettre change de forme selon sa position. Les 6 lettres non-connectantes et les règles de transformation.",
    href: "/apprendre-arabe/formes-lettres-arabes",
    tag: "Cursif",
  },
  {
    icon: Eye,
    number: 3,
    title: "Les Voyelles Courtes",
    subtitle: "Fatha, kasra, damma, sukun — les harakāt",
    description:
      "Les voyelles courtes ne sont PAS des lettres. Ce sont des diacritiques invisibles dans les textes courants. Apprenez à lire le squelette consonantique.",
    href: "/apprendre-arabe/voyelles-courtes-arabe",
    tag: "Harakāt",
  },
  {
    icon: BookOpen,
    number: 4,
    title: "Les Voyelles Longues",
    subtitle: "Alif (ā), Wāw (ū), Yā' (ī)",
    description:
      "Contrairement aux harakāt, les voyelles longues sont de vraies lettres. Elles structurent le sens : kataba ≠ kātaba. Distinction fondamentale.",
    href: "/apprendre-arabe/voyelles-longues-arabe",
    tag: "Vocalique",
  },
  {
    icon: Rocket,
    number: 5,
    title: "Méthode Rissala : Plan 30 Jours",
    subtitle: "Synthèse + feuille de route complète",
    description:
      "Plan structuré jour par jour : répétition espacée, lecture progressive, transition vers texte réel. Erreurs classiques et pièges de prononciation.",
    href: "/apprendre-arabe/methode-rissala-30-jours",
    tag: "Méthode",
  },
];

export default function ApprendreArabePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary/5 py-14 sm:py-18 lg:py-24 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">
            Apprendre{" "}
            <span className="text-primary">la Langue Arabe</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
            La méthode Rissala : une approche structurée, visuelle et progressive pour apprendre l&apos;arabe depuis zéro. 5 articles, une progression logique, aucun saut conceptuel.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <BookOpen className="h-4 w-4" />
            <span>5 articles • Niveau débutant à intermédiaire</span>
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
            La méthode Rissala en un mot : <span className="text-primary">structure</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Chaque article est conçu pour être lu dans l&apos;ordre. Chaque concept s&apos;appuie sur le précédent. Pas de surcharge, pas de blabla — juste une progression logique de la lettre isolée à la lecture fluide.
          </p>
          <Link
            href="/apprendre-arabe/alphabet-arabe"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Commencer par l&apos;Article 1
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
