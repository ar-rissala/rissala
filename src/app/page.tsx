"use client";

import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Languages, GraduationCap, ShieldCheck, CheckCircle2, Coins } from "lucide-react";
import { cn } from "@/lib/utils";
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
      <section className="relative overflow-hidden bg-background pt-16 pb-20 sm:pt-20 sm:pb-28 lg:pt-36 lg:pb-40 border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background z-0" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] bg-primary/10 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] opacity-40 z-0" />
        
        <div className="container relative z-10 mx-auto px-4 lg:px-8 flex flex-col items-center text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs sm:text-sm font-medium text-primary mb-6 sm:mb-8 backdrop-blur-sm">
              <ShieldCheck className="mr-2 h-4 w-4" /> La science Authentique
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8 text-foreground font-heading leading-tight">
              Étudiez selon vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-3">convictions</span>.
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Rissala vous accompagne dans votre quête de savoir, nous croyons que la vraie connaissance élève l&apos;âme et rapproche du Créateur.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
              <Link 
                href="/sciences" 
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base w-full sm:w-56 group rounded-xl shadow-sm flex items-center justify-center"
                )}
              >
                Explorer les Sciences
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/langue-arabe" 
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base w-full sm:w-56 rounded-xl border-2 border-primary/20 hover:bg-primary/5 transition-all flex items-center justify-center"
                )}
              >
                Apprendre l&apos;Arabe
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-3 sm:mb-4">Vos Parcours d&apos;Apprentissage</h2>
            <p className="text-muted-foreground text-base sm:text-lg italic">Un cursus progressif conçu pour bâtir des fondations solides.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {/* Arabe Card */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border-border/50 bg-background hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <Languages className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Langue Arabe</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    De l&apos;alphabet à la lecture autonome. Une progression logique pour maîtriser les bases de la langue classique.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/langue-arabe" className="text-primary font-medium flex items-center group">
                    Commencer l&apos;alphabet <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sciences Card */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border-border/50 bg-background hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Sciences</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Comprendre la tradition sunnite : Histoire, Hadith, Fiqh. Un cursus académique simplifié et sourcé.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/sciences" className="text-primary font-medium flex items-center group">
                    Découvrir le cursus <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ressources Card */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border-border/50 bg-background hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Ressources & Articles</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Bibliothèque d&apos;articles, guides et outils pédagogiques pour approfondir vos connaissances au quotidien.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/ressources" className="text-primary font-medium flex items-center group">
                    Lire les articles <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-6">La Méthode Rissala : Rigueur et Clarté</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Notre approche repose sur trois piliers fondamentaux pour garantir un apprentissage sain et durable du savoir.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Rigueur Académique", desc: "Des contenus basés sur les sources classiques et authentifiées." },
                  { title: "Progression Logique", desc: "Un découpage par étapes pour ne jamais se sentir perdu." },
                  { title: "Authenticité du Savoir", desc: "Une transmission fidèle à l'esprit de la tradition originelle." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square bg-gradient-to-br from-primary/20 to-transparent rounded-2xl overflow-hidden flex items-center justify-center border border-primary/10"
            >
              <div className="p-12 text-center">
                <BookOpen className="h-24 w-24 text-primary/40 mb-6 mx-auto" />
                <p className="text-primary font-heading text-xl font-medium italic opacity-60">
                  « La connaissance est une lumière qu&apos;Allah place dans le cœur. »
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-6">Commencez votre voyage aujourd&apos;hui</h2>
            <p className="text-muted-foreground text-lg mb-10">
              Rejoignez une communauté d&apos;étudiants sérieux et accédez à des contenus conçus pour élever votre compréhension.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/formations" className={buttonVariants({ size: "lg", className: "px-8 rounded-xl h-14" })}>
                Voir toutes les formations
              </Link>
              <Link href="/a-propos" className={buttonVariants({ variant: "outline", size: "lg", className: "px-8 rounded-xl h-14" })}>
                En savoir plus
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
