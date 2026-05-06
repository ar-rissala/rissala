import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    title: "Comment la Zakat purifie votre richesse dans l'ère moderne",
    excerpt: "Découvrez les règles d'application de la Zakat sur les actifs numériques, cryptos et portefeuilles boursiers internationaux.",
    category: "Zakat",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
  },
  {
    title: "Le filtrage Halal (Sharia Screening) : Méthode AAOIFI",
    excerpt: "Plongée en profondeur dans les 3 ratios financiers stricts permettant à une action d'être déclarée Halal.",
    category: "Investissement",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
  {
    title: "L'essor de l'immobilier conforme (Mourabaha & Ijara)",
    excerpt: "Comment devenir propriétaire sans passer par le modèle de la banque classique et des crédits usuraires. Explication des montages.",
    category: "Finance Perso",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  }
];

export const metadata = {
  title: 'Blog & Ressources | Rissala',
  description: 'Articles sur la finance islamique, la Zakat et l\'investissement éthique.',
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 sm:py-12 lg:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 border-b border-border/50 pb-6 sm:pb-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4 font-heading">Ressources & Éducation</h1>
          <p className="text-base sm:text-lg text-muted-foreground">Analyses des marchés, jurisprudences (fatawas), et guides complets pour exceller dans la finance islamique.</p>
        </div>
        <div className="mt-4 sm:mt-6 md:mt-0 flex flex-wrap gap-2">
           <Button variant="outline">Articles Récents</Button>
           <Button variant="outline">FAQ Juridique</Button>
           <Button variant="outline">Vidéos</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {blogPosts.map((post, i) => (
          <Card key={i} className="overflow-hidden border-border/50 bg-card/60 hover:bg-card hover:border-primary/50 transition-all duration-300 group cursor-pointer flex flex-col h-full">
            <div className="h-36 sm:h-48 overflow-hidden relative">
               <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay"></div>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <CardHeader className="flex-1">
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-medium">
                <span className="flex items-center text-primary bg-primary/10 px-2 py-1 rounded-md"><Tag className="w-3 h-3 mr-1" /> {post.category}</span>
                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {post.readTime}</span>
              </div>
              <CardTitle className="text-lg sm:text-xl leading-tight group-hover:text-primary transition-colors">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-muted-foreground line-clamp-3">{post.excerpt}</CardDescription>
            </CardContent>
            <CardFooter className="pt-0">
               <div className="font-semibold text-sm flex items-center text-foreground group-hover:text-primary transition-colors">
                  Lire l'article <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
               </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-10 sm:mt-16 bg-muted/30 border border-border/50 rounded-2xl p-5 sm:p-8 lg:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8">
        <div>
           <h3 className="text-2xl font-bold font-heading mb-2 flex items-center"><BookOpen className="text-primary mr-2" /> Lexique Financier</h3>
           <p className="text-muted-foreground">Mourabaha, Moudaraba, Sukuk... Comprenez les termes essentiels de la Sharia.</p>
        </div>
        <Button size="lg" variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">Accéder au Lexique</Button>
      </div>
    </div>
  );
}
