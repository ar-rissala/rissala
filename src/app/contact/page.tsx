"use client";

import { Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-20 sm:py-32 flex flex-col items-center min-h-[70vh] justify-center">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center mb-12 sm:mb-16 max-w-2xl"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 font-heading">Contactez-nous</h1>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          Une question sur nos méthodes de vérification, d&apos;investissement ou un partenariat ? Écrivez-nous.
        </p>
      </motion.div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
        }}
        className="w-full max-w-lg space-y-4"
      >
        {/* Email Item */}
        <motion.div 
          variants={fadeIn}
          className="flex items-center p-6 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-6 text-primary group-hover:scale-110 transition-transform">
            <Mail className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Email</span>
            <a href="mailto:rissala.contact@gmail.com" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
              rissala.contact@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Address Item */}
        <motion.div 
          variants={fadeIn}
          className="flex items-center p-6 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-6 text-primary group-hover:scale-110 transition-transform">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Siège social</span>
            <address className="text-lg font-medium text-foreground not-italic">
              24 avenue du Prado 13006, Marseille, France
            </address>
          </div>
        </motion.div>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-sm text-muted-foreground italic"
      >
        Réponse sous 24 à 48 heures ouvrées.
      </motion.p>
    </div>
  );
}
