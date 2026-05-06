"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowRight, Play, BookOpen, Crown } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const formations = [
  {
    icon: BookOpen,
    badge: "Populaire",
    title: "Pack Arabe — Niveau Débutant",
    description:
      "De l'alphabet à la lecture fluide en 12 semaines. Vidéos HD, exercices interactifs et suivi personnalisé.",
    features: ["40+ heures de vidéo", "Exercices corrigés", "Certificat de fin"],
  },
  {
    icon: Play,
    badge: "Nouveau",
    title: "Comprendre le Coran — Intensif",
    description:
      "Formation complète sur le Tafsir des 30 derniers Hizb. Idéal pour comprendre ce que vous récitez dans la prière.",
    features: ["Tafsir verset par verset", "Vocabulaire contextuel", "Accès à vie"],
  },
  {
    icon: Crown,
    badge: "Premium",
    title: "Pack Sciences Islamiques",
    description:
      "Fiqh, Aqida, Hadith et Sira en un seul programme. Le parcours académique complet pour le musulman francophone.",
    features: ["Programme sur 6 mois", "Mentorat individuel", "Communauté privée"],
  },
];

export default function FormationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary/5 py-14 sm:py-18 lg:py-24 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">
            Nos{" "}
            <span className="text-primary">Formations</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Des programmes structurés, créés par des spécialistes, pour vous
            faire progresser du niveau débutant au niveau avancé. Chaque
            formation est conçue pour transformer votre pratique et votre
            compréhension.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-18 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {formations.map((formation, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="h-full border-border/50 bg-background/50 backdrop-blur hover:border-primary/50 transition-all duration-300 p-5 sm:p-6 lg:p-8 flex flex-col relative overflow-hidden group">
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {formation.badge}
                    </span>
                  </div>

                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <formation.icon className="h-7 w-7" />
                  </div>

                  <CardTitle className="text-xl mb-3">
                    {formation.title}
                  </CardTitle>

                  <CardDescription className="text-base leading-relaxed mb-6 flex-1">
                    {formation.description}
                  </CardDescription>

                  <ul className="space-y-2 mb-8">
                    {formation.features.map((feature, j) => (
                      <li
                        key={j}
                        className="text-sm text-muted-foreground flex items-center"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full group/btn">
                    Découvrir
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-muted/30 border border-border/50 rounded-2xl p-6 sm:p-8 lg:p-12 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading mb-3 sm:mb-4">
              Besoin d'un programme sur mesure ?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contactez-nous pour un accompagnement personnalisé adapté à votre
              niveau et vos objectifs d'apprentissage.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/20 text-primary hover:bg-primary/5"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
