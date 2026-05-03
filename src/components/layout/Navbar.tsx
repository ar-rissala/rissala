import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary tracking-tight">Rissala</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center flex-1 justify-center">
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">À propos</Link>
          <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Services</Link>
          <Link href="/marketplaces/crypto" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Crypto</Link>
          <Link href="/marketplaces/stocks" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Actions</Link>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          {/* REMPLACEZ LE "#" CI-DESSOUS PAR VOTRE LIEN DE CONNEXION SYSTEME.IO */}
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "ghost" }) + " text-foreground hover:text-primary"}
          >
            Connexion
          </a>
          {/* REMPLACEZ LE "#" CI-DESSOUS PAR LE LIEN DE VOTRE PAGE DE CAPTURE SYSTEME.IO */}
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "default" })}
          >
            S'inscrire
          </a>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" className="text-foreground">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
