import type { Metadata } from "next";
import { BookMarked, MessageSquareText, Lightbulb, Search } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Comprendre le Coran | Rissala",
  description:
    "Tafsir simplifié, vocabulaire coranique et explication des versets. Accédez à une compréhension profonde du Livre d'Allah.",
};

const sections = [
  {
    icon: BookMarked,
    title: "Tafsir Simplifié",
    description:
      "Des explications claires et accessibles des sourates et versets du Coran, basées sur les plus grands exégètes (Ibn Kathir, At-Tabari, As-Sa'di).",
  },
  {
    icon: Search,
    title: "Vocabulaire Coranique",
    description:
      "Apprenez les mots les plus fréquents du Coran. Maîtriser 300 mots vous permet de comprendre plus de 70% du texte coranique.",
  },
  {
    icon: MessageSquareText,
    title: "Explication des Versets",
    description:
      "Contexte de révélation (Asbab an-Nuzul), enseignements pratiques et sagesses extraites des versets pour votre quotidien.",
  },
  {
    icon: Lightbulb,
    title: "Sciences du Coran ('Ulum al-Quran)",
    description:
      "Les fondements de la science coranique : l'abrogé et l'abrogeant, le clair et l'ambigu, les lectures (Qira'at) et la compilation du Coran.",
  },
];

export default function ComprendreCoranPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary/5 py-14 sm:py-18 lg:py-24 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">
            Comprendre{" "}
            <span className="text-primary">le Coran</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Le Coran est la parole d'Allah adressée à l'humanité. Le comprendre
            dans sa langue originale, avec ses contextes et ses subtilités, est
            un devoir et un honneur pour chaque croyant. Rissala vous y
            accompagne.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-18 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 lg:gap-12">
            {sections.map((sec, i) => (
              <Card
                key={i}
                className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors duration-300 p-5 sm:p-6 lg:p-8 flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <sec.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl mb-3">{sec.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {sec.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
