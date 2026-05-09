import type { Metadata } from "next";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, ShieldCheck, BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Formation Investissement Halal | Rissala",
  description: "Découvrez comment faire fructifier votre patrimoine en respectant les principes de la finance islamique.",
};

export default function FormationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-16 sm:py-24 lg:py-32 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Text Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs sm:text-sm font-medium text-primary mb-6">
                <TrendingUp className="mr-2 h-4 w-4" /> Nouvelle Formation
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 font-heading leading-tight">
                Maîtrisez l'<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-3">Investissement Halal</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                Faites fructifier votre épargne en toute sérénité. Apprenez à filtrer les actions, comprendre la Zakat sur investissement et bâtir un portefeuille performant et 100% conforme à l'éthique islamique.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="https://votre-lien-systeme.io/checkout" 
                  target="_blank"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-12 sm:h-14 px-8 text-base font-semibold group rounded-xl shadow-lg w-full sm:w-auto flex items-center justify-center"
                  )}
                >
                  Accéder à la formation
                  <ExternalLink className="ml-2 h-5 w-5 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </Link>
                <div className="flex items-center text-sm text-muted-foreground ml-2 sm:ml-4">
                  <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                  Paiement 100% sécurisé
                </div>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-full aspect-[4/3] rounded-2xl border border-border/50 bg-muted/30 shadow-2xl overflow-hidden flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent z-0"></div>
              {/* Le jour où vous aurez une image, remplacez cette div par : */}
              {/* <img src="/votre-image.jpg" alt="Formation Investissement" className="w-full h-full object-cover" /> */}
              
              <div className="relative z-10 text-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  <BookOpen className="h-8 w-8 text-primary/50" />
                </div>
                <p className="text-sm font-medium text-muted-foreground/70 uppercase tracking-widest">
                  Emplacement Image
                </p>
                <p className="text-xs text-muted-foreground/50 mt-2 max-w-[200px] mx-auto">
                  Insérez ici un mockup de votre formation (ordinateur + téléphone)
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Description & Benefits */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-4">Ce que vous allez apprendre</h2>
            <p className="text-muted-foreground text-lg">Un programme pas-à-pas pour les débutants et les initiés.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 mb-16">
            {[
              "Les fondements juridiques (Fiqh) du commerce et de la bourse en Islam.",
              "Comment utiliser les screeners pour vérifier la conformité d'une action.",
              "Comprendre et éviter le Riba, le Gharar et le Maysir dans vos placements.",
              "Stratégie de dividendes et purification des revenus (Purification ratio).",
              "Investir dans l'immobilier fractionné et les Sukuks (obligations islamiques).",
              "Calcul précis de la Zakat sur vos différents portefeuilles d'actifs."
            ].map((benefit, i) => (
              <Card key={i} className="border-border/50 bg-background hover:border-primary/30 transition-colors shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <p className="text-foreground leading-relaxed">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="bg-card/50 border border-border/50 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <ShieldCheck className="w-64 h-64" />
             </div>
             <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold font-heading mb-4">Prêt à investir avec éthique ?</h3>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Rejoignez les étudiants qui ont déjà pris le contrôle de leurs finances tout en préservant leurs valeurs. Accès à vie et mises à jour incluses.
                </p>
                <Link 
                  href="https://votre-lien-systeme.io/checkout" 
                  target="_blank"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-14 px-10 text-lg font-semibold rounded-xl shadow-lg flex items-center justify-center inline-flex"
                  )}
                >
                  Rejoindre le programme
                </Link>
             </div>
          </div>

        </div>
      </section>
    </div>
  );
}
