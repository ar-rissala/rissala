"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Lock, Mail, User, ShieldCheck, AlertCircle, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { register, fieldError, type AuthError } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

const PASSWORD_RULES = [
  "Au moins 8 caractères",
  "Non identique à votre email ou pseudo",
  "Pas un mot de passe trop courant",
];

export default function InscriptionPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<AuthError | null>(null);

  const passwordStrength = (() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return Math.min(score, 4);
  })();

  const strengthLabel = ["", "Faible", "Moyen", "Bon", "Fort"][passwordStrength];
  const strengthColor = ["", "bg-red-500", "bg-amber-500", "bg-yellow-400", "bg-primary"][passwordStrength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);

    // Client-side check before sending
    if (password !== password2) {
      setErrors({ password2: ["Les mots de passe ne correspondent pas."] });
      return;
    }

    setIsLoading(true);

    const { user, error } = await register({
      pseudo,
      email,
      password,
      password2,
      accept_terms: acceptTerms,
    });

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
    fieldError(errors, "accept_terms");

  return (
    <main className="min-h-screen w-full bg-background flex flex-col justify-between items-center px-4 py-8 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[20%] left-[-10%] w-[400px] h-[300px] bg-primary/3 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
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
          <span className="text-xs text-muted-foreground hidden sm:inline-block">Accès sécurisé</span>
        </div>
      </header>

      {/* Card */}
      <div className="w-full max-w-[440px] my-auto py-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/[0.03] dark:shadow-black/20"
        >
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
              Créer votre espace
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Rejoignez la communauté et accédez aux contenus exclusifs.
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

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Pseudo */}
            <div className="space-y-1.5">
              <label htmlFor="pseudo" className="text-xs font-medium text-foreground block">
                Pseudo <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="pseudo"
                  type="text"
                  required
                  autoComplete="username"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  placeholder="MonPseudo"
                  maxLength={50}
                  className={`w-full h-11 pl-10 pr-4 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all ${
                    fieldError(errors, "pseudo")
                      ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                      : "border-border/80 focus:border-primary focus:ring-primary/20"
                  }`}
                />
              </div>
              {fieldError(errors, "pseudo") ? (
                <p className="text-xs text-destructive mt-1">{fieldError(errors, "pseudo")}</p>
              ) : (
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Lettres, chiffres, points, tirets et underscores uniquement.
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-medium text-foreground block">
                Adresse e-mail <span className="text-primary">*</span>
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
              <label htmlFor="password" className="text-xs font-medium text-foreground block">
                Mot de passe <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full h-11 pl-10 pr-10 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all ${
                    fieldError(errors, "password")
                      ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                      : "border-border/80 focus:border-primary focus:ring-primary/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Strength indicator */}
              {password && (
                <div className="space-y-1.5 mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= passwordStrength ? strengthColor : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  {strengthLabel && (
                    <p className="text-xs text-muted-foreground">
                      Force : <span className="font-medium text-foreground">{strengthLabel}</span>
                    </p>
                  )}
                </div>
              )}

              {fieldError(errors, "password") ? (
                <p className="text-xs text-destructive mt-1">{fieldError(errors, "password")}</p>
              ) : (
                <div className="mt-2 space-y-1">
                  {PASSWORD_RULES.map((rule) => (
                    <p key={rule} className="text-xs text-muted-foreground/70 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      {rule}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
              <label htmlFor="password2" className="text-xs font-medium text-foreground block">
                Confirmer le mot de passe <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password2"
                  type={showPassword2 ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full h-11 pl-10 pr-10 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all ${
                    fieldError(errors, "password2") || (password2 && password !== password2)
                      ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                      : password2 && password === password2
                      ? "border-primary focus:border-primary focus:ring-primary/20"
                      : "border-border/80 focus:border-primary focus:ring-primary/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword2((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword2 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldError(errors, "password2") ? (
                <p className="text-xs text-destructive mt-1">{fieldError(errors, "password2")}</p>
              ) : password2 && password !== password2 ? (
                <p className="text-xs text-destructive mt-1">Les mots de passe ne correspondent pas.</p>
              ) : password2 && password === password2 ? (
                <p className="text-xs text-primary mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Les mots de passe correspondent.
                </p>
              ) : null}
            </div>

            {/* Terms */}
            <div className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${
              fieldError(errors, "accept_terms")
                ? "bg-destructive/5 border-destructive/30"
                : "bg-muted/20 border-border/40"
            }`}>
              <input
                id="accept_terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-primary shrink-0"
              />
              <label htmlFor="accept_terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                J&apos;accepte les{" "}
                <Link href="/fr/conditions" className="text-primary hover:underline font-medium">
                  conditions d&apos;utilisation
                </Link>{" "}
                et la{" "}
                <Link href="/fr/privacy" className="text-primary hover:underline font-medium">
                  politique de confidentialité
                </Link>
                .
              </label>
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
                  <span>Créer mon compte</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch to login */}
          <div className="mt-6 pt-5 border-t border-border/60 text-center">
            <p className="text-xs text-muted-foreground">
              Vous avez déjà un compte ?{" "}
              <Link
                href="/connexion"
                className="text-primary font-semibold hover:underline transition-all"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Security badge */}
        <div className="mt-6 text-center flex items-center justify-center gap-2 text-xs text-muted-foreground/80">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>Inscription chiffrée SSL &amp; Données protégées</span>
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
