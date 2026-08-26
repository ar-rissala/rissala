"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube } from "@/components/ui/icons";
import { usePathname } from "next/navigation";
import { type Locale, getLocalizedSlug } from "@/lib/i18n";

export function Footer() {
  const rawPathname = usePathname();
  const pathname = rawPathname ? decodeURIComponent(rawPathname) : "";
  const match = pathname?.match(/^\/(fr|en|ar)(\/|$)/);
  const currentLang = (match?.[1] as Locale) ?? "fr";

  return (
    <footer className="w-full border-t border-border bg-background pt-10 sm:pt-12 lg:pt-16 pb-6 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
        <div className="col-span-2 sm:col-span-2 md:col-span-1">
          <Link href="/" className="inline-block mb-4 group">
            <div className="relative w-48 sm:w-64 h-14 sm:h-20 -ml-2 overflow-hidden flex items-center">
              <img 
                src="/LogoRissala.svg" 
                alt="Logo officiel de Rissala - Apprendre l'arabe et les sciences islamiques" 
                title="Retour à l'accueil de Rissala"
                loading="lazy"
                width="256"
                height="80"
                className="w-full h-full object-contain object-left group-hover:opacity-80 transition-all" 
              />
            </div>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Une plateforme dédiée à l&apos;étude et à la transmission du savoir islamique.
            <span className="block mt-2 font-medium">Étudier. Comprendre. Transmettre.</span>
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a href="https://instagram.com/rissala.officiel/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300" aria-label="Instagram Rissala">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://youtube.com/@rissala-1" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all duration-300" aria-label="YouTube Rissala">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-6 text-foreground">Apprendre</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href={`/${currentLang}/${getLocalizedSlug("apprendre-arabe", currentLang)}`} className="hover:text-primary transition-colors">Langue arabe</Link></li>
            <li><Link href={`/${currentLang}/${getLocalizedSlug("sciences-islamiques", currentLang)}`} className="hover:text-primary transition-colors">Sciences islamiques</Link></li>
            <li><Link href={`/${currentLang}/${getLocalizedSlug("fiqh-al-muamalat", currentLang)}`} className="hover:text-primary transition-colors">Finance islamique</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-6 text-foreground">Ressources</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href={`/${currentLang}/${getLocalizedSlug("actualites", currentLang)}`} className="hover:text-primary transition-colors">Actualités &amp; Articles</Link></li>
            <li><Link href={`/${currentLang}/${getLocalizedSlug("about", currentLang)}`} className="hover:text-primary transition-colors">À propos de Rissala</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-6 text-foreground">Contact</h4>
          <p className="text-sm text-muted-foreground mb-4">Besoin d&apos;accompagnement ? Contactez notre équipe.</p>
          <Link href="/contact" className="text-sm text-primary font-medium hover:underline">Nous contacter</Link>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground pb-[env(safe-area-inset-bottom,0px)]">
        <p>&copy; {new Date().getFullYear()} Rissala. Tous droits réservés.</p>
        <div className="flex gap-4 sm:gap-6 mt-3 sm:mt-0">
          <Link href={`/${currentLang}/legal`} className="hover:text-primary transition-colors">Mentions légales</Link>
          <Link href={`/${currentLang}/privacy`} className="hover:text-primary transition-colors">Politique de confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
