"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { confirmPasswordReset, fieldError, type AuthError } from "@/lib/auth";

export default function ReinitialisationPage() {
  const params = useParams();
  const router = useRouter();
  const uidb64 = typeof params.uidb64 === "string" ? params.uidb64 : "";
  const token = typeof params.token === "string" ? params.token : "";

  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<AuthError | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);

    if (newPassword !== newPassword2) {
      setErrors({ new_password2: ["Les mots de passe ne correspondent pas."] });
      return;
    }

    setIsLoading(true);
    const { error } = await confirmPasswordReset({
      uidb64,
      token,
      new_password: newPassword,
      new_password2: newPassword2,
    });
    setIsLoading(false);

    if (error) {
      setErrors(error);
      return;
    }

    router.push("/reinitialisation/terminee");
  };

  const globalError =
    fieldError(errors, "token") ??
    fieldError(errors, "uidb64") ??
    fieldError(errors, "non_field_errors");

  return (
    <main className="min-h-screen w-full bg-background flex flex-col justify-between items-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <header className="w-full max-w-5xl flex items-center justify-between z-10">
        <Link
          href="/connexion"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group py-2 px-3 rounded-lg hover:bg-muted/40"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
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
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
              Créer un nouveau mot de passe
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Choisissez un mot de passe sécurisé pour votre compte.
            </p>
          </div>

          {/* Global/token error */}
          {globalError && (
            <div className="mb-4 flex items-start gap-2.5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/30">
              <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-destructive font-medium">{globalError}</p>
                {(fieldError(errors, "token") || fieldError(errors, "uidb64")) && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Ce lien a peut-être expiré.{" "}
                    <Link href="/mot-de-passe-oublie" className="text-primary hover:underline">
                      Demander un nouveau lien
                    </Link>
                  </p>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* New password */}
            <div className="space-y-1.5">
              <label htmlFor="new_password" className="text-xs font-medium text-foreground block">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="new_password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full h-11 pl-10 pr-10 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all ${
                    fieldError(errors, "new_password")
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
              {fieldError(errors, "new_password") && (
                <p className="text-xs text-destructive mt-1">{fieldError(errors, "new_password")}</p>
              )}
            </div>

            {/* Confirm */}
            <div className="space-y-1.5">
              <label htmlFor="new_password2" className="text-xs font-medium text-foreground block">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="new_password2"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={newPassword2}
                  onChange={(e) => setNewPassword2(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full h-11 pl-10 pr-4 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all ${
                    fieldError(errors, "new_password2") || (newPassword2 && newPassword !== newPassword2)
                      ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                      : newPassword2 && newPassword === newPassword2
                      ? "border-primary focus:ring-primary/20"
                      : "border-border/80 focus:border-primary focus:ring-primary/20"
                  }`}
                />
              </div>
              {fieldError(errors, "new_password2") ? (
                <p className="text-xs text-destructive mt-1">{fieldError(errors, "new_password2")}</p>
              ) : newPassword2 && newPassword === newPassword2 ? (
                <p className="text-xs text-primary mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Les mots de passe correspondent.
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                "Réinitialiser mon mot de passe"
              )}
            </button>
          </form>
        </motion.div>

        <div className="mt-6 text-center flex items-center justify-center gap-2 text-xs text-muted-foreground/80">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>Lien sécurisé &amp; Données protégées</span>
        </div>
      </div>

      <footer className="w-full max-w-5xl flex items-center justify-between text-xs text-muted-foreground z-10 py-2">
        <span>© {new Date().getFullYear()} Rissala. Tous droits réservés.</span>
      </footer>
    </main>
  );
}
