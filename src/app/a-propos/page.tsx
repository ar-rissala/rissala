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
      <section className="bg-primary/5 py-14 sm:py-18 lg:py-24 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">
            Le Savoir  <span className="text-primary">au Service</span> de <span className="text-primary">la Foi</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Chez Rissala, nous croyons que la quête du savoir est une progression noble qui élève l’âme et rapproche du Créateur.
Notre mission est de vous offrir un espace complet pour étudier sereinement : étude de la science islamique, apprentissage de la langue arabe, lecture et compréhension approfondie du Coran, biographies des grands savants, explication des madhabs, finance islamique, et bien d’autres domaines utiles.
Rissala vous accompagne dans votre progression spirituelle et intellectuelle avec des contenus rigoureux, clairs et profondément ancrés dans les sources islamiques.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-18 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
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
