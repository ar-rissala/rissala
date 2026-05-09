import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Type, Baseline, Languages, GraduationCap, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Langue Arabe | Rissala",
  description: "Découvrez notre méthode pour apprendre la langue arabe, clé essentielle pour comprendre les sciences islamiques.",
};

const articles = [
  {
    icon: Type,
    number: 1,
    title: "L'Alphabet Arabe",
    subtitle: "Les 28 lettres fondamentales",
    description: "Apprenez à prononcer et reconnaître les 28 lettres de l'alphabet arabe, la première étape essentielle de votre apprentissage.",
    href: "/langue-arabe/alphabet-arabe",
    tag: "Base",
  },
  {
    icon: Baseline,
    number: 2,
    title: "Les Formes des Lettres",
    subtitle: "Début, milieu et fin de mot",
    description: "Comprenez comment les lettres arabes s'attachent entre elles et changent de forme selon leur position dans le mot.",
    href: "/langue-arabe/formes-lettres-arabes",
    tag: "Écriture",
  },
  {
    icon: Languages,
    number: 3,
    title: "Les Voyelles Courtes",
    subtitle: "Fatha, Kasra, Damma",
    description: "Maîtrisez les voyelles courtes (Harakat) qui donnent le son exact à chaque lettre et permettent de lire vos premiers mots.",
    href: "/langue-arabe/voyelles-courtes-arabe",
    tag: "Lecture",
  },
  {
    icon: Languages,
    number: 4,
    title: "Les Voyelles Longues",
    subtitle: "Alif, Waw, Ya",
    description: "Découvrez l'allongement des sons dans la langue arabe pour une prononciation parfaite et fluide.",
    href: "/langue-arabe/voyelles-longues-arabe",
    tag: "Prononciation",
  },
  {
    icon: GraduationCap,
    number: 5,
    title: "Méthode Rissala en 30 Jours",
    subtitle: "Votre programme complet",
    description: "Un plan d'action structuré sur 30 jours pour passer de grand débutant à lecteur autonome de l'arabe classique.",
    href: "/langue-arabe/methode-rissala-30-jours",
    tag: "Méthode",
  },
];

export default function LangueArabePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary/5 py-14 sm:py-18 lg:py-24 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">
            Langue <span className="text-primary">Arabe</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
            Découvrez notre méthode d'apprentissage de la langue arabe, clé essentielle pour comprendre les sciences islamiques.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <BookOpen className="h-4 w-4" />
            <span>Cursus Arabe Complet • 5 Articles Fondamentaux</span>
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
    </div>
  );
}
