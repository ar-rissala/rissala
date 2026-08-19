import React from "react";

interface PageHeroProps {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
  overlayClassName?: string;
}

/**
 * PageHero — section hero avec le motif islamique vert en fond derrière le contenu titre.
 * À utiliser sur toutes les pages d'index de section et les pages légales.
 */
export function PageHero({ 
  children, 
  className = "", 
  bgImage = "/islamic-pattern-bg.jpg",
  overlayClassName = "bg-background/80 dark:bg-background/85"
}: PageHeroProps) {
  return (
    <section
      className={`relative py-16 sm:py-20 lg:py-28 min-h-[380px] flex items-center border-b border-border/50 overflow-hidden ${className}`}
    >
      {/* Motif islamique en fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage}')` }}
        aria-hidden="true"
      />
      {/* Overlay sombre pour la lisibilité du texte */}
      <div
        className={`absolute inset-0 ${overlayClassName}`}
        aria-hidden="true"
      />
      {/* Dégradé radial supplémentaire pour le rendu premium */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />
      {/* Contenu */}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
