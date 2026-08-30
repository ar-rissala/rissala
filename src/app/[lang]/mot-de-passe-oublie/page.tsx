"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { requestPasswordReset, fieldError, type AuthError } from "@/lib/auth";

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<AuthError | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setIsLoading(true);

    const { error } = await requestPasswordReset(email);
    setIsLoading(false);

    if (error && Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen w-full bg-background flex flex-col justify-between items-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <header className="w-full max-w-5xl flex items-center justify-between z-10">
        <Link
          href="/connexion"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group py-4 px-6 -ml-4 rounded-lg hover:bg-muted/40"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          <span>Retour à la connexion</span>
        </Link>
        <Link href="/" className="group">
          <span className="text-xl font-bold text-primary tracking-tight font-heading">Rissala</span>
        </Link>
        <div className="w-[120px]" />
      </header>

      <div className="w-full max-w-[420px] my-auto py-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/[0.03] dark:shadow-black/20"
        >
          {submitted ? (
            <div className="py-4 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Mail className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h1 className="text-xl font-bold text-foreground font-heading">Email envoyé !</h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Si un compte associé à{" "}
                  <span className="font-medium text-foreground">{email}</span>{" "}
                  existe, un lien de réinitialisation vient d&apos;être envoyé.
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Vérifiez également votre dossier spam.
                </p>
              </div>
              <Link
                href="/connexion"
                className="inline-flex items-center gap-2 mt-2 text-sm text-primary font-medium hover:underline"
              >
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center space-y-2 mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
                  Mot de passe oublié ?
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Saisissez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
              </div>

              {errors && (
                <div className="mb-4 flex items-start gap-2.5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/30">
                  <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <p className="text-xs text-destructive">
                    {fieldError(errors, "email") ?? Object.values(errors).flat()[0]}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
                      <span>Envoyer le lien de réinitialisation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-border/60 text-center">
                <p className="text-xs text-muted-foreground">
                  Vous vous souvenez de votre mot de passe ?{" "}
                  <Link href="/connexion" className="text-primary font-semibold hover:underline">
                    Se connecter
                  </Link>
                </p>
              </div>
            </>
          )}
        </motion.div>

        <div className="mt-6 text-center flex items-center justify-center gap-2 text-xs text-muted-foreground/80">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>Lien sécurisé &amp; Données protégées</span>
        </div>
      </div>

      <footer className="w-full max-w-5xl flex items-center justify-between text-xs text-muted-foreground z-10 py-2">
        <span>© {new Date().getFullYear()} Rissala. Tous droits réservés.</span>
        <div className="flex items-center gap-4">
          <Link href="/fr/privacy" className="hover:text-foreground transition-colors">Confidentialité</Link>
          <Link href="/fr/legal" className="hover:text-foreground transition-colors">Mentions légales</Link>
        </div>
      </footer>
    </main>
  );
}
