"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, Mail, ShieldCheck } from "lucide-react";

export default function ConnexionPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate ultra-smooth authentication transition
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <main className="min-h-screen w-full bg-background flex flex-col justify-between items-center px-4 py-8 relative overflow-hidden select-none">
      {/* Subtle Ambient Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[20%] right-[-10%] w-[400px] h-[300px] bg-primary/3 blur-[100px] rounded-full" />
      </div>

      {/* Top Header Bar */}
      <header className="w-full max-w-5xl flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group py-2 px-3 rounded-lg hover:bg-muted/40"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Retour à l&apos;accueil</span>
        </Link>

        <Link href="/" className="group">
          <span className="text-xl font-bold text-primary tracking-tight font-heading group-hover:opacity-90 transition-opacity">
            Rissala
          </span>
        </Link>

        <div className="w-[120px] text-right">
          <span className="text-xs text-muted-foreground hidden sm:inline-block">
            Accès sécurisé
          </span>
        </div>
      </header>

      {/* Main Card Container */}
      <div className="w-full max-w-[420px] my-auto py-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/[0.03] dark:shadow-black/20"
        >
          {/* Header section */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
              {mode === "login" ? "Espace membre" : "Créer votre espace"}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {mode === "login"
                ? "Accédez à votre parcours et ressources Rissala."
                : "Rejoignez la communauté et accédez aux contenus exclusifs."}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">Lien envoyé !</h3>
                  <p className="text-sm text-muted-foreground">
                    Un lien de connexion sécurisé a été envoyé à <br />
                    <span className="font-medium text-foreground">{email}</span>
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-primary font-medium hover:underline pt-4 block mx-auto"
                >
                  Utiliser un autre e-mail
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Main Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">
                      Adresse e-mail
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nom@exemple.com"
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-border/80 bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-foreground block">
                        Mot de passe
                      </label>
                      {mode === "login" && (
                        <a
                          href="#"
                          className="text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          Oublié ?
                        </a>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-border/80 bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 mt-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>{mode === "login" ? "Se connecter" : "Créer un compte"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Mode Switcher */}
                <div className="mt-6 pt-5 border-t border-border/60 text-center">
                  <p className="text-xs text-muted-foreground">
                    {mode === "login" ? "Nouveau sur Rissala ?" : "Vous avez déjà un compte ?"}
                    {" "}
                    <button
                      type="button"
                      onClick={() => setMode(mode === "login" ? "signup" : "login")}
                      className="text-primary font-semibold hover:underline transition-all"
                    >
                      {mode === "login" ? "Créer un compte" : "Se connecter"}
                    </button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Security badge footer */}
        <div className="mt-6 text-center flex items-center justify-center gap-2 text-xs text-muted-foreground/80">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>Connexion chiffrée SSL &amp; Données protégées</span>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="w-full max-w-5xl flex items-center justify-between text-xs text-muted-foreground z-10 py-2">
        <span>© {new Date().getFullYear()} Rissala. Tous droits réservés.</span>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Confidentialité
          </Link>
          <Link href="/legal" className="hover:text-foreground transition-colors">
            Mentions légales
          </Link>
        </div>
      </footer>
    </main>
  );
}
