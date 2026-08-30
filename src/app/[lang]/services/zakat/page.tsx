"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Info, Wallet, Coins, Briefcase, CreditCard } from "lucide-react";

const NISAB_GOLD_VALUE = 4500; // Mock current Euro value for 85 grams of gold

export default function ZakatCalculator() {
  const [cash, setCash] = useState<number>(0);
  const [gold_silver, setGoldSilver] = useState<number>(0);
  const [investments, setInvestments] = useState<number>(0);
  const [debts, setDebts] = useState<number>(0);

  const totalAssets = cash + gold_silver + investments;
  const netWealth = Math.max(0, totalAssets - debts);
  const isEligible = netWealth >= NISAB_GOLD_VALUE;
  const zakatToPay = isEligible ? netWealth * 0.025 : 0;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-heading mb-4">Calculatrice de Zakat Al-Maal</h1>
        <p className="text-muted-foreground text-lg">Évaluez vos actifs liquides et déterminez le montant précis de votre aumône légale (2.5%).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="border-border/50 bg-background/50 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center"><Wallet className="mr-2 h-5 w-5 text-primary"/> Liquidités (Cash & Banque)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">€</span>
                <input 
                  type="number" 
                  min="0"
                  className="w-full bg-muted/50 border border-input rounded-md pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={cash || ""} 
                  onChange={(e) => setCash(Number(e.target.value))} 
                  placeholder="0.00"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/50 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center"><Coins className="mr-2 h-5 w-5 text-primary"/> Or et Argent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">€</span>
                <input 
                  type="number" 
                  min="0"
                  className="w-full bg-muted/50 border border-input rounded-md pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={gold_silver || ""} 
                  onChange={(e) => setGoldSilver(Number(e.target.value))} 
                  placeholder="0.00"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/50 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center"><Briefcase className="mr-2 h-5 w-5 text-primary"/> Actions & Cryptos Halal</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">€</span>
                <input 
                  type="number" 
                  min="0"
                  className="w-full bg-muted/50 border border-input rounded-md pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={investments || ""} 
                  onChange={(e) => setInvestments(Number(e.target.value))} 
                  placeholder="0.00"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/30 bg-background/50 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center text-destructive"><CreditCard className="mr-2 h-5 w-5"/> Dettes à court terme (à déduire)</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">€</span>
                <input 
                  type="number" 
                  min="0"
                  className="w-full bg-muted/50 border border-input rounded-md pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-destructive"
                  value={debts || ""} 
                  onChange={(e) => setDebts(Number(e.target.value))} 
                  placeholder="0.00"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="h-full">
          <Card className="h-full border-primary/20 bg-primary/5 sticky top-24">
            <CardHeader className="text-center pb-2 border-b border-border/50">
              <Calculator className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Résultat de votre Zakat</CardTitle>
              <CardDescription>Estimation basée sur la valeur actuelle du Nisab ({NISAB_GOLD_VALUE.toLocaleString()} €)</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-muted-foreground">Total des Actifs Bruts</span>
                <span className="font-medium text-foreground">{totalAssets.toLocaleString()} €</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-muted-foreground">Dettes déductibles</span>
                <span className="font-medium text-destructive">- {debts.toLocaleString()} €</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="text-muted-foreground">Patrimoine Net Soumis</span>
                <span className="font-medium text-foreground">{netWealth.toLocaleString()} €</span>
              </div>
              
              <div className="bg-background rounded-lg p-6 text-center border shadow-sm">
                <div className="text-sm font-semibold text-muted-foreground mb-2">Zakat due (2.5%)</div>
                <div className={`text-4xl font-bold ${isEligible ? 'text-primary' : 'text-muted-foreground'}`}>
                  {zakatToPay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} €
                </div>
                {!isEligible && netWealth > 0 && (
                  <div className="text-xs text-orange-500 mt-2 flex items-center justify-center">
                    <Info className="h-3 w-3 mr-1"/> Votre patrimoine est inférieur au Nisab.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full h-12 text-lg" disabled={!isEligible || zakatToPay === 0}>
                Payer ma Zakat (Partenaires)
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
