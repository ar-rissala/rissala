import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { 
  Library, 
  LineChart, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  BookMarked,
  Waypoints,
  Focus,
  BookType
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Parcours d'apprentissage | Rissala",
  description: "Découvrez les parcours structurés de Rissala pour étudier progressivement la langue arabe, les sciences islamiques et la finance.",
};

export default function ParcoursPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-background pt-24 pb-16 sm:pt-32 sm:pb-24 border-b border-border/40 overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-foreground">
            Vos parcours d'apprentissage
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
            Des parcours structurés pour étudier progressivement la langue arabe, les sciences islamiques et les domaines essentiels du savoir.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Commencez par les fondements, progressez à votre rythme et approfondissez vos connaissances étape par étape.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#parcours" 
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-12 px-8 text-base w-full sm:w-auto rounded-xl shadow-sm"
              )}
            >
              Commencer à apprendre
            </Link>
            <Link 
              href="#methode" 
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 px-8 text-base w-full sm:w-auto rounded-xl bg-transparent border-border/60 hover:bg-muted/50"
              )}
            >
              Découvrir notre méthode
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SECTION INTRODUCTIVE */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <Compass className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-6">
            Un parcours pour chaque étape de votre étude
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            L'apprentissage ne se construit pas en accumulant des informations. Il demande une progression, des fondations solides et une méthode claire. Rissala organise ses contenus en parcours afin de vous permettre d'avancer progressivement, de revenir aux fondamentaux et d'approfondir chaque domaine avec méthode.
          </p>
        </div>
      </section>

      {/* 3. SECTION : LES PARCOURS */}
      <section id="parcours" className="py-20 sm:py-32 bg-background scroll-m-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">Explorez les parcours</h2>
            <p className="text-lg text-muted-foreground">Des enseignements organisés autour de plusieurs domaines complémentaires.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Parcours 1 : Langue Arabe */}
            <Card className="flex flex-col border-border/60 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                    LANGUE
                  </span>
                  <BookType className="w-6 h-6 text-muted-foreground/50" />
                </div>
                <CardTitle className="text-2xl font-heading mb-2">Langue arabe</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  De l'alphabet aux premières bases de compréhension, développez progressivement votre maîtrise de la langue arabe et préparez-vous à aborder les textes classiques avec davantage d'autonomie.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 mb-6">
                  {["Alphabet et lecture", "Vocabulaire", "Grammaire", "Compréhension", "Progression structurée"].map((point, idx) => (
                    <li key={idx} className="flex items-start text-sm sm:text-base text-foreground/80">
                      <span className="text-primary mr-3 mt-1 text-lg leading-none">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0 mt-auto">
                <Link 
                  href="/fr/langue-arabe" 
                  className="inline-flex items-center justify-center w-full sm:w-auto h-10 px-6 font-medium text-sm transition-colors border border-border/50 rounded-lg hover:bg-primary/5 hover:text-primary hover:border-primary/30 group"
                >
                  Découvrir le parcours
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* Parcours 2 : Sciences islamiques */}
            <Card className="flex flex-col border-border/60 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                    SCIENCES
                  </span>
                  <Library className="w-6 h-6 text-muted-foreground/50" />
                </div>
                <CardTitle className="text-2xl font-heading mb-2">Sciences islamiques</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Étudiez les fondements essentiels des sciences islamiques à travers une progression structurée : croyance, hadith, fiqh, histoire et autres disciplines fondamentales.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 mb-6">
                  {["Fondements de la croyance", "Hadith", "Fiqh", "Histoire", "Méthodologie d'étude"].map((point, idx) => (
                    <li key={idx} className="flex items-start text-sm sm:text-base text-foreground/80">
                      <span className="text-primary mr-3 mt-1 text-lg leading-none">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0 mt-auto">
                <Link 
                  href="/fr/sciences-islamiques" 
                  className="inline-flex items-center justify-center w-full sm:w-auto h-10 px-6 font-medium text-sm transition-colors border border-border/50 rounded-lg hover:bg-primary/5 hover:text-primary hover:border-primary/30 group"
                >
                  Découvrir le parcours
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* Parcours 3 : Finance islamique */}
            <Card className="flex flex-col border-border/60 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                    FINANCE
                  </span>
                  <LineChart className="w-6 h-6 text-muted-foreground/50" />
                </div>
                <CardTitle className="text-2xl font-heading mb-2">Finance islamique</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Découvrez les principes de la finance islamique et apprenez à comprendre les principales problématiques liées au commerce, aux investissements et aux actifs financiers.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 mb-6">
                  {["Principes du commerce", "Riba, Gharar et Maysir", "Analyse des investissements", "Zakat", "Purification des revenus", "Sukuk et autres structures"].map((point, idx) => (
                    <li key={idx} className="flex items-start text-sm sm:text-base text-foreground/80">
                      <span className="text-primary mr-3 mt-1 text-lg leading-none">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0 mt-auto">
                <Link 
                  href="/fr/finance-islamique" 
                  className="inline-flex items-center justify-center w-full sm:w-auto h-10 px-6 font-medium text-sm transition-colors border border-border/50 rounded-lg hover:bg-primary/5 hover:text-primary hover:border-primary/30 group"
                >
                  Découvrir le parcours
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>

            {/* Parcours 4 : À venir */}
            <Card className="flex flex-col border-border/30 bg-muted/10 shadow-none border-dashed items-center justify-center p-8 sm:p-12 text-center h-full min-h-[300px]">
              <Sparkles className="w-10 h-10 text-muted-foreground/40 mb-4" />
              <CardTitle className="text-xl font-heading text-muted-foreground mb-3">De nouveaux parcours arrivent prochainement</CardTitle>
              <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed max-w-sm">
                Rissala développe progressivement de nouveaux contenus afin d'élargir son offre d'étude et d'accompagnement.
              </p>
            </Card>

          </div>
        </div>
      </section>

      {/* 4. SECTION : COMMENT PROGRESSER ? */}
      <section className="py-20 sm:py-24 bg-muted/30 border-y border-border/40">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">Une progression pensée pour durer</h2>
            <p className="text-lg text-muted-foreground">Chaque parcours est conçu pour vous permettre de construire progressivement vos connaissances.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { num: "01", title: "Commencer par les fondements", text: "Construisez les bases nécessaires avant d'aborder des notions plus complexes." },
              { num: "02", title: "Avancer progressivement", text: "Chaque étape s'inscrit dans une progression logique afin de limiter les lacunes et faciliter la compréhension." },
              { num: "03", title: "Approfondir", text: "Revenez aux notions essentielles et développez progressivement votre compréhension des différentes disciplines." },
              { num: "04", title: "Transmettre", text: "Le savoir prend toute sa valeur lorsqu'il est compris, assimilé et transmis avec justesse." },
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col">
                <span className="text-4xl sm:text-5xl font-heading font-bold text-primary/15 mb-4">{step.num}</span>
                <h3 className="text-lg font-bold font-heading mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECTION : LA MÉTHODE RISSALA */}
      <section id="methode" className="py-20 sm:py-32 scroll-m-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">La méthode Rissala</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Étudier avec rigueur. Comprendre avec clarté. Transmettre avec fidélité.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
            {[
              { icon: BookMarked, title: "Rigueur", text: "Des contenus construits autour de sources et de références clairement identifiées lorsque cela est pertinent." },
              { icon: Waypoints, title: "Progression", text: "Une organisation par étapes pour avancer de manière cohérente et construire des fondations solides." },
              { icon: Focus, title: "Clarté", text: "Des explications accessibles qui cherchent à rendre les notions complexes compréhensibles sans sacrifier leur profondeur." },
            ].map((pillar, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 text-primary ring-1 ring-primary/10">
                  <pillar.icon className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SECTION : POUR QUI ? */}
      <section className="py-20 sm:py-24 bg-muted/20 border-t border-border/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading">À chacun son point de départ</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-8 border border-border/60 rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold font-heading mb-4 text-primary">Débuter</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Vous découvrez le domaine et souhaitez construire des bases solides sans vous disperser.</p>
            </div>
            <div className="p-8 border border-border/60 rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold font-heading mb-4 text-primary">Approfondir</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Vous possédez déjà certaines connaissances et souhaitez structurer et approfondir votre étude.</p>
            </div>
            <div className="p-8 border border-border/60 rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold font-heading mb-4 text-primary">Consolider</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Vous souhaitez reprendre les fondamentaux, combler certaines lacunes et progresser avec une méthode plus structurée.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION : PHILOSOPHIE */}
      <section className="py-24 sm:py-32 relative overflow-hidden bg-foreground text-background">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute -left-1/4 -top-1/4 w-[150%] h-[150%] opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-8 tracking-wide">
            Le savoir se construit dans le temps
          </h2>
          <p className="text-lg sm:text-xl text-background/90 leading-relaxed mb-6 font-medium max-w-3xl mx-auto">
            Comprendre demande davantage que mémoriser. Chaque parcours Rissala cherche à replacer les connaissances dans leur contexte, à expliquer leurs fondements et à proposer une progression cohérente.
          </p>
          <p className="text-base sm:text-lg text-background/70 leading-relaxed max-w-2xl mx-auto">
            Notre objectif est de rendre l'étude plus accessible sans réduire la profondeur des sujets abordés.
          </p>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="py-24 sm:py-32 bg-background text-center relative">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-6">Commencez votre parcours</h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Choisissez un domaine, commencez par les fondamentaux et avancez progressivement dans votre étude.
          </p>
          <Link 
            href="#parcours" 
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12 px-10 text-base rounded-xl shadow-sm w-full sm:w-auto"
            )}
          >
            Explorer les parcours
          </Link>
        </div>
      </section>

    </div>
  );
}
