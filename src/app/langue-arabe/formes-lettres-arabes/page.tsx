import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Les Formes des Lettres | Langue Arabe",
  description: "Comprenez comment les lettres arabes s'attachent entre elles et changent de forme.",
};

export default function FormesLettresPage() {
  return (
    <article className="container mx-auto px-4 lg:px-8 py-10 max-w-3xl">
      <div className="mb-8">
        <Link href="/langue-arabe" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au programme
        </Link>
      </div>
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-heading">
          Les Formes des Lettres
        </h1>
        <p className="text-xl text-muted-foreground">Début, milieu et fin de mot</p>
      </header>
      <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
        <p>
          En arabe, l'écriture est cursive. Cela signifie que la plupart des lettres s'attachent entre elles.
          Pour permettre cet attachement, chaque lettre change légèrement de forme selon sa position dans le mot.
        </p>
        <div className="bg-muted/30 border border-border/50 rounded-xl p-8 my-8 text-center">
          <p className="text-lg font-medium text-foreground mb-2">Contenu pédagogique en cours de préparation...</p>
          <p className="text-sm">Bientôt, vous retrouverez ici l'intégralité du cours interactif.</p>
        </div>
      </div>
    </article>
  );
}
