"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart3, Bitcoin, Briefcase, Calculator, ShieldCheck } from "lucide-react";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32 lg:pt-36 lg:pb-40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-0" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-50 z-0" />
        
        <div className="container relative z-10 mx-auto px-4 lg:px-8 flex flex-col items-center text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
              <ShieldCheck className="mr-2 h-4 w-4" /> La référence éthique
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-foreground font-heading">
              Investissez selon vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-3">convictions</span>.
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Rissala vous accompagne dans la gestion de votre patrimoine, le calcul de votre Zakat et l'accès aux marchés cryptos et actions 100% Halal.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto group">
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto border-primary/20 hover:bg-primary/5">
                Découvrir nos services
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-card/50 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Une plateforme complète</h2>
            <p className="text-muted-foreground text-lg">Des outils conçus sur-mesure pour allier performance financière et respect des principes islamiques.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Crypto Card */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border-border/50 bg-background/50 backdrop-blur hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <Bitcoin className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Marketplace Crypto Halal</CardTitle>
                  <CardDescription className="text-base line-clamp-2">
                    Investissez dans des cryptomonnaies filtrées et auditées selon les standards de la finance islamique.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/marketplaces/crypto" className="text-primary font-medium flex items-center group">
                    Accéder au marché <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stocks Card */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border-border/50 bg-background/50 backdrop-blur hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Marketplace Actions Halal</CardTitle>
                  <CardDescription className="text-base line-clamp-2">
                    Accédez aux actions de sociétés conformes via notre intégration de données du marché (Interactive Trader).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/marketplaces/stocks" className="text-primary font-medium flex items-center group">
                    Découvrir les actions <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Zakat Card */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border-border/50 bg-background/50 backdrop-blur hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Calcul de la Zakat</CardTitle>
                  <CardDescription className="text-base line-clamp-2">
                    Un outil précis et conforme pour évaluer la Nisab et calculer votre Zakat Al-Maal sur tous vos actifs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/services/zakat" className="text-primary font-medium flex items-center group">
                    Calculer ma Zakat <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center border-t border-border/50 pt-24">
          <h2 className="text-2xl font-semibold mb-12 text-muted-foreground">Ils nous font confiance pour leur investissement éthique</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Logos Placeholders - Emulating Fintech Partners */}
            <div className="text-2xl font-bold font-heading">Interactive Trader</div>
            <div className="text-2xl font-bold font-heading flex items-center"><Briefcase className="mr-2" /> Islamic Finance Hub</div>
            <div className="text-2xl font-bold font-heading">Halal Investors Network</div>
          </div>
        </div>
      </section>
    </div>
  );
}
