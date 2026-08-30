import type { Metadata } from "next";
import { Calculator, LayoutDashboard, BadgeDollarSign } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nos Services | Rissala",
  description: "Zakat, Marketplace Crypto, Marketplace Actions: Tous les outils nécessaires à la finance islamique.",
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-24 max-w-5xl">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 font-heading text-center">Nos Services Halal</h1>
      <p className="text-xl text-muted-foreground text-center mb-20 max-w-2xl mx-auto">
        Rissala regroupe sur une seule plateforme tous les outils nécessaires pour gérer vos finances personnelles selon vos principes.
      </p>

      <div className="space-y-24">
        {/* Zakat Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-card rounded-2xl p-8 border border-border/50 shadow-sm flex items-center justify-center h-64">
            <Calculator className="h-24 w-24 text-primary/40" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-4 font-heading">Calculatrice de Zakat Avancée</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Calculez facilement le Nisab et la Zakat Al-Maal sur l'ensemble de votre patrimoine : liquidités, or, argent, cryptomonnaies, actions et biens commerciaux.
            </p>
            <Link href="/services/zakat" className={buttonVariants({ size: "lg" })}>Calculer ma Zakat</Link>
          </div>
        </div>

        {/* Crypto Marketplace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 font-heading">Marketplace Crypto Halal</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Toutes les cryptomonnaies ne sont pas licites (Halal). Rissala analyse pour vous le fonctionnement des projets blockchain (staking, defi, utilité) pour vous garantir des investissements purs et valides selon la Sharia.
            </p>
            <Link href="/marketplaces/crypto" className={buttonVariants({ size: "lg" })}>Découvrir les tokens</Link>
          </div>
          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm flex items-center justify-center h-64">
            <BadgeDollarSign className="h-24 w-24 text-primary/40" />
          </div>
        </div>

        {/* Stocks Marketplace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-card rounded-2xl p-8 border border-border/50 shadow-sm flex items-center justify-center h-64">
             <LayoutDashboard className="h-24 w-24 text-primary/40" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-4 font-heading">Marketplace Actions (Stocks)</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Connectez-vous via Interactive Trader ou nos partenaires pour acheter des actions d'entreprises respectant les quotas stricts d'endettement et de liquidité (Sharia Compliant).
            </p>
            <Link href="/marketplaces/stocks" className={buttonVariants({ size: "lg" })}>Explorer la bourse halal</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
