"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Lock, Mail, ShieldCheck, AlertCircle } from "lucide-react";
import { login, fieldError, type AuthError } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

export default function ConnexionPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<AuthError | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setIsLoading(true);

    const { user, error } = await login({ email, password });

    if (error) {
      setErrors(error);
      setIsLoading(false);
      return;
    }

    if (user) {
      setUser(user);
      router.push("/espace-membre");
    }
  };

  const globalError =
    fieldError(errors, "non_field_errors") ??
    (errors && !errors.email && !errors.password ? Object.values(errors).flat()[0] : undefined);

  return (
    <main className="min-h-screen w-full bg-background flex flex-col justify-between items-center px-4 py-8 relative overflow-hidden select-none">
      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[20%] right-[-10%] w-[400px] h-[300px] bg-primary/3 blur-[100px] rounded-full" />
      </div>

      {/* Top Header Bar */}
      <header className="w-full max-w-5xl flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group py-3 px-4 -ml-4 rounded-lg hover:bg-muted/40"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
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
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
              Espace membre
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Accédez à votre parcours et ressources Rissala.
            </p>
          </div>

          {/* Global error */}
          <AnimatePresence>
            {globalError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 flex items-start gap-2.5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/30"
              >
                <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                <p className="text-xs text-destructive leading-relaxed">{globalError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-medium text-foreground block">
                Adresse e-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@exemple.com"
                  className={`w-full h-11 pl-10 pr-4 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all ${
                    fieldError(errors, "email")
                      ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                      : "border-border/80 focus:border-primary focus:ring-primary/20"
                  }`}
                />
              </div>
              {fieldError(errors, "email") && (
                <p className="text-xs text-destructive mt-1">{fieldError(errors, "email")}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-medium text-foreground block">
                  Mot de passe
                </label>
                <Link
                  href="/mot-de-passe-oublie"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Oublié ?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full h-11 pl-10 pr-4 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all ${
                    fieldError(errors, "password")
                      ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                      : "border-border/80 focus:border-primary focus:ring-primary/20"
                  }`}
                />
              </div>
              {fieldError(errors, "password") && (
                <p className="text-xs text-destructive mt-1">{fieldError(errors, "password")}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch to register */}
          <div className="mt-6 pt-5 border-t border-border/60 text-center">
            <p className="text-xs text-muted-foreground">
              Nouveau sur Rissala ?{" "}
              <Link
                href="/inscription"
                className="text-primary font-semibold hover:underline transition-all"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Security badge */}
        <div className="mt-6 text-center flex items-center justify-center gap-2 text-xs text-muted-foreground/80">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>Connexion chiffrée SSL &amp; Données protégées</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-5xl flex items-center justify-between text-xs text-muted-foreground z-10 py-2">
        <span>© {new Date().getFullYear()} Rissala. Tous droits réservés.</span>
        <div className="flex items-center gap-4">
          <Link href="/fr/privacy" className="hover:text-foreground transition-colors">
            Confidentialité
          </Link>
          <Link href="/fr/legal" className="hover:text-foreground transition-colors">
            Mentions légales
          </Link>
        </div>
      </footer>
    </main>
  );
}
