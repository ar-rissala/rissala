"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Languages, GraduationCap, ShieldCheck, CheckCircle2, Coins, Mail, Scale, Book, Feather, Compass, Library, History } from "lucide-react";
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
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);
    setTimeout(() => {
      setNewsletterLoading(false);
      setNewsletterSubmitted(true);
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-28 lg:pt-36 lg:pb-40 border-b border-border/40"
        style={{
          backgroundColor: "#000",
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay with brand colors (black and green) */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-primary/20 to-black/90 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-black/40 pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 lg:px-8 flex flex-col items-center text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >

            <motion.h1 variants={fadeIn} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8 text-white font-heading leading-tight drop-shadow-lg">
              Étudiez selon vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-3">convictions</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-base sm:text-lg md:text-xl text-white/75 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Rissala vous accompagne dans l&apos;étude et la transmission du savoir islamique. Des parcours structurés, des sources rigoureuses et une progression pensée pour comprendre, approfondir et transmettre.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
              <Link 
                href="/parcours" 
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-10 sm:h-12 px-8 sm:px-10 text-sm sm:text-base w-fit group rounded-xl shadow-sm flex items-center justify-center"
                )}
              >
                Découvrez nos parcours
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* Learning Paths Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-3 sm:mb-4">Étudier. Comprendre. Approfondir.</h2>
            <p className="text-muted-foreground text-base sm:text-lg">Des parcours structurés pour construire progressivement des bases solides et développer une compréhension claire du savoir.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6"
          >
            {/* Arabe Card */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border-border/50 bg-background hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <Languages className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Langue arabe</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Maîtriser progressivement la langue arabe, de l&apos;alphabet à la lecture et à la compréhension des textes classiques.
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-4">
                  <Link href="/fr/langue-arabe" className="text-primary font-medium flex items-center group">
                    Découvrir la langue arabe <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sciences Card */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border-border/50 bg-background hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Sciences islamiques</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Étudier les fondements de la tradition sunnite à travers la croyance, le hadith, le fiqh et l&apos;histoire, avec une approche progressive et sourcée.
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-4">
                  <Link href="/fr/sciences-islamiques" className="text-primary font-medium flex items-center group">
                    Découvrir les sciences islamiques <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Finance Card */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border-border/50 bg-background hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <Scale className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Finance islamique</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Comprendre les principes de la finance islamique, ses fondements et ses mécanismes à travers une approche pédagogique et structurée.
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-4">
                  <Link href="/fr/finance-islamique" className="text-primary font-medium flex items-center group">
                    Découvrir la finance islamique <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Actualités Card */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border-border/50 bg-background hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Articles & actualités</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Approfondir ses connaissances à travers des articles, analyses, guides et ressources pédagogiques consacrés aux grandes thématiques de Rissala.
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-4">
                  <Link href="/fr/actualites" className="text-primary font-medium flex items-center group">
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
              <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-6">La méthode Rissala</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Étudier avec rigueur. Comprendre avec clarté. Transmettre avec fidélité.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Rigueur", desc: "Des contenus construits à partir de sources reconnues et présentés avec précision." },
                  { title: "Progression", desc: "Une organisation par étapes pour avancer progressivement, sans perdre de vue les fondements." },
                  { title: "Transmission", desc: "Un effort constant pour transmettre le savoir avec clarté, fidélité et respect de la tradition." }
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
                <p className="text-primary font-heading text-xl font-medium italic opacity-80">
                  « Le savoir se cultive par l&apos;étude, s&apos;affermit par la compréhension et se transmet par la pratique. »
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Capture Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-card border border-border/80 rounded-3xl p-8 sm:p-12 shadow-xl shadow-black/[0.02] dark:shadow-black/20 relative z-10"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-4 text-foreground">
              La Lettre Rissala
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-2 leading-relaxed">
              Recevez les nouvelles publications de Rissala, nos analyses, ressources pédagogiques et synthèses directement dans votre boîte mail.
            </p>
            <p className="text-xs text-muted-foreground/60 mb-8">
              Pas de spam. Désinscription possible en un clic.
            </p>

            {newsletterSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-medium text-sm flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Merci ! Vous êtes bien inscrit à la lettre Rissala.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Votre adresse e-mail"
                  className="flex-1 h-12 px-4 rounded-xl border border-border/80 bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={newsletterLoading}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 px-6 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shrink-0 shadow-sm"
                  )}
                >
                  {newsletterLoading ? (
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>S&apos;inscrire</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="text-xs text-muted-foreground/70 mt-4">
              Pas de spam. Désinscription possible en un clic.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
