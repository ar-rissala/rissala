"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, LogOut, User, Star, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function EspaceMembre() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  // Redirect to /connexion if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/connexion");
    }
  }, [loading, user, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/connexion");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null; // Will redirect via useEffect

  const displayName = user.first_name?.trim() || user.pseudo;
  const initials = displayName[0]?.toUpperCase() ?? "?";

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/4 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-primary/3 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground text-xl font-bold flex items-center justify-center shadow-lg shadow-primary/20">
              {initials}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-0.5">
                {user.first_name?.trim() ? "Bienvenue," : "Bienvenue,"}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground font-heading">
                {user.first_name?.trim() ? user.first_name : user.pseudo} 👋
              </h1>
            </div>
          </div>

          {/* Welcome card */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <Star className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  Votre espace membre est actif
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Les formations arrivent bientôt. Vous serez parmi les premiers à y avoir accès.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid sm:grid-cols-2 gap-4 mb-8"
        >
          {/* Account info */}
          <div className="bg-card border border-border/60 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Mon compte</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Pseudo</p>
                <p className="text-sm font-medium text-foreground">{user.pseudo}</p>
              </div>
              {user.first_name?.trim() && (
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Prénom</p>
                  <p className="text-sm font-medium text-foreground">{user.first_name}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Membre depuis</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(user._creationTime).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Formations coming soon */}
          <div className="bg-card border border-border/60 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Mes formations</h2>
            </div>
            <div className="flex flex-col items-center justify-center h-24 text-center">
              <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Les formations arrivent bientôt.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card border border-border/60 rounded-2xl overflow-hidden mb-8"
        >
          <Link
            href="/parcours"
            className="flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors border-b border-border/40"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-foreground">Explorer les parcours</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
          <Link
            href="/"
            className="flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                <Star className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">Découvrir Rissala</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        </motion.div>

        {/* Logout button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/30 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </motion.div>
      </div>
    </main>
  );
}
