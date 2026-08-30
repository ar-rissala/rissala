"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ReinitialisationTermineePage() {
  return (
    <main className="min-h-screen w-full bg-background flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] z-10"
      >
        <div className="bg-card border border-border/80 rounded-2xl p-8 shadow-xl shadow-black/[0.03] dark:shadow-black/20 text-center">
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-8 h-8" />
          </motion.div>

          <h1 className="text-2xl font-bold text-foreground font-heading mb-3">
            Mot de passe réinitialisé !
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            Votre mot de passe a été réinitialisé avec succès.
            Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
          </p>

          <Link
            href="/connexion"
            className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-95 active:scale-[0.99] transition-all shadow-sm"
          >
            <span>Se connecter</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} Rissala. Tous droits réservés.
        </p>
      </motion.div>
    </main>
  );
}
