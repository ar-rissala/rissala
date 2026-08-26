"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, LogOut, BookOpen, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useAuth } from "@/context/AuthContext";

const defaultLang = "fr";

type NavItem = {
  label: string;
  href: string;
  megaMenu?: {
    items: { label: string; href: string }[];
    footerLink: { label: string; href: string };
  };
};

const navConfig: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: `/${defaultLang}/bibliotheque`, label: "Livres" },
  { href: `/${defaultLang}/sciences-islamiques`, label: "Sciences islamiques" },
  { href: `/${defaultLang}/apprendre-arabe`, label: "Langue arabe" },
  { href: `/${defaultLang}/fiqh-al-muamalat`, label: "Finance islamique" },
  { href: `/${defaultLang}/actualites`, label: "Actualités" },
  { href: "/parcours", label: "Parcours" },
];

export function Navbar() {
  const rawPathname = usePathname();
  const pathname = rawPathname ? decodeURIComponent(rawPathname) : "";
  const router = useRouter();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [openMobileAccordions, setOpenMobileAccordions] = useState<Record<string, boolean>>({});
  
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    setHoveredMenu(null);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setHoveredMenu(null);
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    setMobileOpen(false);
    await signOut();
    router.push("/connexion");
  };

  const toggleMobileAccordion = (label: string) => {
    setOpenMobileAccordions((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const displayName = user?.first_name?.trim() || user?.pseudo || "";
  const initials = displayName ? displayName[0].toUpperCase() : "?";

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? "border-b border-border/80 bg-background/80 backdrop-blur-xl shadow-sm"
          : "border-b border-border/40 bg-background/60 backdrop-blur-md"
          }`}
        onMouseLeave={() => setHoveredMenu(null)}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group z-10" onClick={() => setHoveredMenu(null)}>
            <div className="relative w-48 sm:w-64 h-14 sm:h-20 -ml-2 overflow-hidden flex items-center">
              <img 
                src="/LogoRissala.svg" 
                alt="Logo officiel de Rissala - Institut d'apprentissage de l'arabe et des fondements islamiques" 
                title="Rissala - Accueil"
                width="256"
                height="80"
                className="w-full h-full object-contain object-left group-hover:opacity-90 transition-all" 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1 flex-1 justify-center z-10 h-full">
            {navConfig.map((link) => (
              <div 
                key={link.href} 
                className="relative flex items-center h-full px-1"
                onMouseEnter={() => link.megaMenu && setHoveredMenu(link.label)}
              >
                {link.megaMenu ? (
                  <button
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-primary ${isActive(link.href) || hoveredMenu === link.label
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    aria-expanded={hoveredMenu === link.label}
                    onClick={() => setHoveredMenu(hoveredMenu === link.label ? null : link.label)}
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${hoveredMenu === link.label ? "rotate-180" : ""}`} />
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="navbar-active"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary ${isActive(link.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    onMouseEnter={() => setHoveredMenu(null)}
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
                )}

                {/* Mega Menu Dropdown */}
                {link.megaMenu && (
                  <AnimatePresence>
                    {hoveredMenu === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-[calc(100%-0.5rem)] left-1/2 -translate-x-1/2 w-[600px] pt-4 cursor-default"
                        onMouseLeave={() => setHoveredMenu(null)}
                      >
                        <div className="bg-background border border-border/60 rounded-xl shadow-2xl overflow-hidden p-6 grid grid-cols-2 gap-x-8 gap-y-3 relative z-50">
                          {link.megaMenu.items.map((item, idx) => (
                            <Link
                              key={idx}
                              href={item.href}
                              className="group flex items-center px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors"
                              onClick={() => setHoveredMenu(null)}
                            >
                              <span className="group-hover:text-primary transition-colors">{item.label}</span>
                            </Link>
                          ))}
                          
                          <div className="col-span-2 mt-4 pt-4 border-t border-border/40">
                            <Link
                              href={link.megaMenu.footerLink.href}
                              className="group inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                              onClick={() => setHoveredMenu(null)}
                            >
                              {link.megaMenu.footerLink.label}
                              <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden xl:flex items-center gap-3 shrink-0 z-10" onMouseEnter={() => setHoveredMenu(null)}>
            <LanguageSwitcher />

            {/* User menu */}
            {!loading && user ? (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-xl border border-border/60 bg-muted/30 hover:bg-muted/60 transition-all group outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Menu utilisateur"
                  aria-expanded={userMenuOpen}
                >
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
                    {initials}
                  </span>
                  <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                    {displayName}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-52 bg-card border border-border/80 rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-border/50">
                        <p className="text-xs text-muted-foreground">Connecté en tant que</p>
                        <p className="text-sm font-semibold text-foreground truncate mt-0.5">
                          {user.pseudo}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/espace-membre"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          Espace membre
                        </Link>
                      </div>

                      <div className="py-1 border-t border-border/50">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Déconnexion
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : !loading ? (
              <Link
                href="/connexion"
                className={buttonVariants({ variant: "default", size: "sm" }) + " px-4 font-medium shadow-sm transition-all hover:shadow-md hover:opacity-95"}
              >
                Se connecter
              </Link>
            ) : (
              <div className="w-28 h-8 rounded-xl bg-muted/40 animate-pulse" />
            )}
          </div>

          {/* Tablet Language Switcher */}
          <div className="hidden sm:flex xl:hidden items-center mr-4 z-10">
            <LanguageSwitcher />
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden relative z-50 flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
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
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex flex-col items-center min-h-screen px-6 pt-20 pb-[env(safe-area-inset-bottom,1rem)] h-full overflow-y-auto"
            >
              {/* Mobile user info (if logged in) */}
              {!loading && user && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl bg-muted/30 border border-border/50 w-full max-w-sm"
                >
                  <span className="w-9 h-9 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </motion.div>
              )}

              <nav className="flex flex-col items-center w-full max-w-sm">
                {navConfig.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="w-full border-b border-border/30 last:border-0"
                  >
                    {link.megaMenu ? (
                      <div className="w-full">
                        <button
                          onClick={() => toggleMobileAccordion(link.label)}
                          className={`flex items-center justify-center gap-2 w-full py-3 px-4 text-lg font-medium transition-colors ${openMobileAccordions[link.label] || isActive(link.href)
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                            }`}
                          aria-expanded={openMobileAccordions[link.label]}
                        >
                          {link.label}
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${openMobileAccordions[link.label] ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {openMobileAccordions[link.label] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col items-center gap-1 pb-5 px-6">
                                {link.megaMenu.items.map((item, idx) => (
                                  <Link
                                    key={idx}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="w-full text-center py-3 text-lg text-muted-foreground hover:text-primary transition-colors block"
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                                <Link
                                  href={link.megaMenu.footerLink.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="mt-3 py-3 w-full text-center text-lg font-semibold text-primary hover:text-primary/80 transition-colors inline-flex justify-center items-center"
                                >
                                  {link.megaMenu.footerLink.label}
                                  <ArrowRight className="ml-1.5 w-5 h-5" />
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-center w-full py-3 px-4 text-lg font-medium transition-colors block text-center ${isActive(link.href)
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                          }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex flex-col gap-3 w-full max-w-sm mt-4 pt-4 pb-12 border-t border-border/50"
              >
                <div className="flex justify-center mb-2">
                  <LanguageSwitcher dropUp={true} />
                </div>

                {!loading && user ? (
                  <>
                    <Link
                      href="/espace-membre"
                      onClick={() => setMobileOpen(false)}
                      className={buttonVariants({ variant: "outline", size: "lg" }) + " w-full justify-center h-14 text-lg font-medium"}
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      Espace membre
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full h-14 rounded-xl border border-destructive/40 text-destructive font-medium text-lg hover:bg-destructive/10 transition-colors"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <Link
                    href="/connexion"
                    onClick={() => setMobileOpen(false)}
                    className={
                      buttonVariants({ variant: "default", size: "lg" }) +
                      " w-full justify-center h-14 text-lg font-medium shadow-sm"
                    }
                  >
                    Se connecter
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
