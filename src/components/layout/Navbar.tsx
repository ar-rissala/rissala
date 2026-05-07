"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Instagram, Youtube } from "@/components/ui/icons";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/apprendre-arabe", label: "Apprendre l'arabe" },
  { href: "/sciences-islamiques", label: "Sciences islamiques" },
  { href: "/finance-islamique", label: "Finance islamique" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "À propos" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for enhanced glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-border/80 bg-background/80 backdrop-blur-xl shadow-sm"
            : "border-b border-border/40 bg-background/60 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <span className="text-2xl font-bold text-primary tracking-tight font-heading">
              Rissala
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA & Socials */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            {/* Social Icons */}
            <div className="flex items-center gap-1 mr-2">
              <a href="https://instagram.com/rissala.net_/" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-full transition-colors" aria-label="Instagram Rissala">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://youtube.com/@Methoderissala" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-full transition-colors" aria-label="YouTube Rissala">
                <Youtube className="h-4 w-4" />
              </a>
            </div>

            {/* REMPLACEZ LE "#" CI-DESSOUS PAR VOTRE LIEN DE CONNEXION SYSTEME.IO */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={
                buttonVariants({ variant: "ghost", size: "sm" }) +
                " text-foreground hover:text-primary"
              }
            >
              Connexion
            </a>
            {/* REMPLACEZ LE "#" CI-DESSOUS PAR LE LIEN DE VOTRE PAGE DE CAPTURE SYSTEME.IO */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              S&apos;inscrire
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden relative z-50 flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-[env(safe-area-inset-bottom,1rem)]"
            >
              <nav className="flex flex-col items-center gap-2 w-full max-w-sm">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-center w-full py-3.5 px-6 rounded-xl text-lg font-medium transition-all duration-200 ${
                        isActive(link.href)
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:text-primary hover:bg-muted/50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA & Socials */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex flex-col gap-3 w-full max-w-sm mt-8 pt-8 border-t border-border/50"
              >
                <div className="flex justify-center gap-4 mb-2">
                  <a href="https://instagram.com/rissala.net_/" target="_blank" rel="noopener noreferrer" className="p-3 text-muted-foreground hover:text-primary bg-muted/30 hover:bg-muted/50 rounded-full transition-colors" aria-label="Instagram Rissala">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="https://youtube.com/@Methoderissala" target="_blank" rel="noopener noreferrer" className="p-3 text-muted-foreground hover:text-primary bg-muted/30 hover:bg-muted/50 rounded-full transition-colors" aria-label="YouTube Rissala">
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    buttonVariants({ variant: "outline", size: "lg" }) +
                    " w-full justify-center h-12"
                  }
                >
                  Connexion
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    buttonVariants({ variant: "default", size: "lg" }) +
                    " w-full justify-center h-12"
                  }
                >
                  S&apos;inscrire
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
