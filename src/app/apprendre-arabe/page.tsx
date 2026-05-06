import type { Metadata } from "next";
import { BookOpen, Languages, PenTool, GraduationCap } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Apprendre l'Arabe | Rissala",
  description:
    "Apprenez la langue arabe depuis zéro : alphabet, grammaire, conjugaison et méthode basée sur le Coran. Cours structurés pour débutants et intermédiaires.",
};

const modules = [
  {
    icon: PenTool,
    title: "L'Alphabet Arabe",
    description:
      "Maîtrisez les 28 lettres, les voyelles courtes et longues, et les règles d'écriture de droite à gauche avec des exercices progressifs.",
  },
  {
    icon: Languages,
    title: "Grammaire (Nahw & Sarf)",
    description:
      "Comprenez la structure de la phrase arabe, la morphologie des mots et les déclinaisons à travers des exemples tirés du Coran.",
  },
  {
    icon: BookOpen,
    title: "Méthode Coranique",
    description:
      "Apprenez l'arabe à travers le vocabulaire et les structures du Coran, la méthode la plus efficace pour les musulmans francophones.",
  },
  {
    icon: GraduationCap,
    title: "Parcours Débutant",
    description:
      "Un programme complet de 0 à la lecture fluide : phonétique, lecture, compréhension et expression, avec suivi de progression.",
  },
];

export default function ApprendreArabePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary/5 py-14 sm:py-18 lg:py-24 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">
            Apprendre{" "}
            <span className="text-primary">la Langue Arabe</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            La langue arabe est la clé du savoir islamique. Sans elle,
            impossible d'accéder directement aux textes fondateurs. Rissala vous
            propose un parcours structuré, progressif et ancré dans les sources
            coraniques.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-18 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 lg:gap-12">
            {modules.map((mod, i) => (
              <Card
                key={i}
                className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors duration-300 p-5 sm:p-6 lg:p-8 flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <mod.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl mb-3">{mod.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {mod.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
