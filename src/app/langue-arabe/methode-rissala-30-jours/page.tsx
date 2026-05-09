import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Target, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Méthode Rissala en 30 Jours | Langue Arabe",
  description: "Un plan d'action structuré sur 30 jours pour passer de grand débutant à lecteur autonome.",
};

export default function MethodeRissalaPage() {
  return (
    <article className="container mx-auto px-4 lg:px-8 py-10 max-w-4xl">
      <div className="mb-8">
        <Link href="/langue-arabe" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au programme
        </Link>
      </div>
      
      <header className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-heading text-primary">
          Méthode Rissala en 30 Jours
        </h1>
        <p className="text-xl text-muted-foreground">Votre programme complet d'apprentissage</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-card/50">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-bold mb-2">30 Jours</h3>
            <p className="text-sm text-muted-foreground">20 minutes par jour pour créer une routine d'apprentissage solide.</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold mb-2">Objectif Clair</h3>
            <p className="text-sm text-muted-foreground">Savoir lire l'arabe vocalisé de manière fluide et sans erreur.</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold mb-2">Autonomie</h3>
            <p className="text-sm text-muted-foreground">Les clés pour pouvoir lire le Coran et débuter l'étude de la langue.</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/30 border border-border/50 rounded-xl p-8 my-8 text-center">
        <p className="text-lg font-medium text-foreground mb-2">Programme en cours de finalisation...</p>
        <p className="text-sm text-muted-foreground">Le calendrier détaillé jour par jour sera bientôt disponible ici.</p>
      </div>
    </article>
  );
}
