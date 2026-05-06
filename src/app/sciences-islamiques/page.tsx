import type { Metadata } from "next";
import { Scale, ShieldCheck, ScrollText, Compass } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sciences Islamiques | Rissala",
  description:
    "Fiqh, Aqida, Hadith et méthodologie islamique. Étudiez les sciences religieuses avec rigueur et authenticité.",
};

const disciplines = [
  {
    icon: Scale,
    title: "Fiqh (Jurisprudence)",
    description:
      "Les règles pratiques de l'Islam : la prière, le jeûne, le pèlerinage, les transactions commerciales et la vie quotidienne selon les 4 écoles de jurisprudence.",
  },
  {
    icon: ShieldCheck,
    title: "Aqida (Croyance)",
    description:
      "Les fondements de la foi islamique : l'unicité d'Allah (Tawhid), les attributs divins, les piliers de la foi et la réfutation des ambiguïtés contemporaines.",
  },
  {
    icon: ScrollText,
    title: "Sciences du Hadith",
    description:
      "Apprenez à authentifier les traditions prophétiques : classifications, chaînes de transmission (Isnad), critiques des rapporteurs et recueils fondamentaux.",
  },
  {
    icon: Compass,
    title: "Méthodologie (Usul)",
    description:
      "Les principes fondamentaux (Usul al-Fiqh) : les sources de la législation, le consensus, l'analogie, les objectifs de la Sharia (Maqasid) et les règles de déduction.",
  },
];

export default function SciencesIslamiquesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary/5 py-14 sm:py-18 lg:py-24 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">
            Sciences{" "}
            <span className="text-primary">Islamiques</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Le savoir islamique est un héritage prophétique. De la jurisprudence
            à la croyance, en passant par les sciences du hadith et la
            méthodologie, Rissala vous offre un contenu structuré et vérifié par
            des spécialistes.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-18 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 lg:gap-12">
            {disciplines.map((disc, i) => (
              <Card
                key={i}
                className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors duration-300 p-5 sm:p-6 lg:p-8 flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <disc.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl mb-3">{disc.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {disc.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
