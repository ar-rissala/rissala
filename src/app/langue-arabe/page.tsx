import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Languages, PenTool, GraduationCap, ArrowRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Langue Arabe | Rissala",
  description: "Découvrez notre méthode pour apprendre la langue arabe, clé essentielle pour comprendre les sciences.",
};

const articles = [
  {
    icon: BookOpen,
    number: 1,
    title: "L'Alphabet Arabe",
    subtitle: "Les 28 lettres fondamentales",
    description: "Apprenez à prononcer et reconnaître les 28 lettres de l'alphabet arabe, la première étape essentielle.",
    href: "/langue-arabe/alphabet-arabe",
    tag: "Base",
  },
  {
    icon: PenTool,
    number: 2,
    title: "Les Formes des Lettres",
    subtitle: "Début, milieu et fin de mot",
    description: "Comprenez comment les lettres arabes s'attachent entre elles et changent de forme selon leur position.",
    href: "/langue-arabe/formes-lettres-arabes",
    tag: "Écriture",
  },
  {
    icon: Languages,
    number: 3,
    title: "Les Voyelles Courtes",
    subtitle: "Fatha, Kasra, Damma",
    description: "Maîtrisez les voyelles courtes (Harakat) qui donnent le son exact à chaque lettre.",
    href: "/langue-arabe/voyelles-courtes-arabe",
    tag: "Lecture",
  },
  {
    icon: Languages,
    number: 4,
    title: "Les Voyelles Longues",
    subtitle: "Alif, Waw, Ya",
    description: "Découvrez l'allongement des sons dans la langue arabe pour une prononciation parfaite.",
    href: "/langue-arabe/voyelles-longues-arabe",
    tag: "Prononciation",
  },
  {
    icon: GraduationCap,
    number: 5,
    title: "Méthode Rissala en 30 Jours",
    subtitle: "Votre programme complet",
    description: "Un plan d'action structuré sur 30 jours pour passer de grand débutant à lecteur autonome.",
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
            Découvrez notre méthode d'apprentissage de la langue arabe, clé essentielle pour comprendre les sciences.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Link key={article.number} href={article.href} className="group">
                <Card className="h-full border-border/50 bg-background/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-sm font-bold">
                        {article.number}
                      </div>
                      <article.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                        {article.tag}
                      </span>
                    </div>
                    <p className="text-xs text-primary/80 font-semibold mb-3 uppercase tracking-wide">
                      {article.subtitle}
                    </p>
                    <CardDescription className="text-sm leading-relaxed">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
