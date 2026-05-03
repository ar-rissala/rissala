import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight">Rissala</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            La référence de la finance islamique. Investissez de manière éthique, transparente et conforme à vos convictions.
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-6 text-foreground">Services</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/services/zakat" className="hover:text-primary transition-colors">Calcul de la Zakat</Link></li>
            <li><Link href="/services/personal-finance" className="hover:text-primary transition-colors">Finance Personnelle</Link></li>
            <li><Link href="/marketplaces/crypto" className="hover:text-primary transition-colors">Marché Crypto Halal</Link></li>
            <li><Link href="/marketplaces/stocks" className="hover:text-primary transition-colors">Marché Actions Halal</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-6 text-foreground">Ressources</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog & Actualités</Link></li>
            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ Juridique</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">À propos de Rissala</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-6 text-foreground">Contact</h4>
          <p className="text-sm text-muted-foreground mb-4">Besoin d'accompagnement ? Contactez notre équipe d'experts.</p>
          <Link href="/contact" className="text-sm text-primary font-medium hover:underline">Nous contacter</Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Rissala. Tous droits réservés.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/legal" className="hover:text-primary transition-colors">Mentions légales</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Politique de confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
