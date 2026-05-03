import type { Metadata } from "next";
import { Shield, BookOpen, HeartHandshake } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "À propos | Rissala - Finance Islamique",
  description: "Découvrez la vision, l'éthique et l'équipe derrière Rissala, la référence de la finance islamique moderne et transparente.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary/5 py-24 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 font-heading">
            Réconcilier <span className="text-primary">l'investissement moderne</span> et <span className="text-primary">l'éthique islamique</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Chez Rissala, nous croyons qu'il est possible de faire croître son capital sans compromettre ses convictions religieuses.
            Notre mission est de démocratiser l'accès à une finance transparente, sans Riba (intérêt) et pure de tout investissement nuisible.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Card className="bg-background/50 border-none shadow-none text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Shield className="h-8 w-8" />
              </div>
              <CardTitle className="mb-4">Transparence Totale</CardTitle>
              <CardDescription className="text-base">
                Aucun frais caché. Nos processus de filtrage des actions et des cryptomonnaies sont publics et audités par des comités de savants (Sharia Boards).
              </CardDescription>
            </Card>

            <Card className="bg-background/50 border-none shadow-none text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <BookOpen className="h-8 w-8" />
              </div>
              <CardTitle className="mb-4">Éducation Financière</CardTitle>
              <CardDescription className="text-base">
                Nous fournissons les outils et l'accompagnement nécessaires pour que chaque musulman puisse devenir un investisseur avisé et indépendant.
              </CardDescription>
            </Card>

            <Card className="bg-background/50 border-none shadow-none text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <HeartHandshake className="h-8 w-8" />
              </div>
              <CardTitle className="mb-4">Sens & Impact</CardTitle>
              <CardDescription className="text-base">
                La finance islamique n'est pas seulement une série d'interdictions. C'est surtout investir dans l'économie réelle, sociale, et bénéfique pour la société.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
