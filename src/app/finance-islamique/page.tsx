import type { Metadata } from "next";
import { Ban, TrendingUp, Wallet, Calculator } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Finance Islamique | Rissala",
  description:
    "Comprendre le Riba, l'investissement halal et la gestion financière conforme à la Sharia. Formation et outils pratiques.",
};

const topics = [
  {
    icon: Ban,
    title: "Comprendre le Riba (Usure)",
    description:
      "Le Riba est l'un des plus grands péchés en Islam. Comprenez ses formes modernes (crédits, intérêts bancaires, cartes revolving) et les alternatives licites qui existent.",
  },
  {
    icon: TrendingUp,
    title: "Investissement Halal",
    description:
      "Actions, cryptomonnaies, immobilier : apprenez à filtrer vos investissements selon les critères AAOIFI et à construire un portefeuille 100% conforme à la Sharia.",
  },
  {
    icon: Wallet,
    title: "Économie Personnelle",
    description:
      "Budgétisation, épargne, gestion des dettes sans Riba, assurance Takaful : tous les outils pour une vie financière saine et conforme à vos principes.",
  },
  {
    icon: Calculator,
    title: "Zakat & Purification",
    description:
      "Calculez votre Zakat Al-Maal avec précision, comprenez le Nisab, et apprenez les règles de purification des revenus douteux selon le Fiqh.",
  },
];

export default function FinanceIslamiquePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary/5 py-14 sm:py-18 lg:py-24 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">
            Finance{" "}
            <span className="text-primary">Islamique</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            La finance islamique n'est pas une simple alternative. C'est un
            système complet basé sur la justice, le partage des risques et
            l'interdiction de l'exploitation. Rissala vous donne les clés pour
            gérer votre argent en conformité avec votre foi.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-18 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 lg:gap-12">
            {topics.map((topic, i) => (
              <Card
                key={i}
                className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors duration-300 p-5 sm:p-6 lg:p-8 flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <topic.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl mb-3">{topic.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {topic.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
