"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-24 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-heading">Contactez-nous</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Une question sur nos méthodes de vérification, d'investissement ou un partenariat ? Écrivez-nous.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <Card className="bg-background border-none shadow-none text-left flex items-start p-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-6 text-primary shrink-0">
               <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Email</h3>
              <p className="text-muted-foreground">contact@rissala.com</p>
            </div>
          </Card>

          <Card className="bg-background border-none shadow-none text-left flex items-start p-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-6 text-primary shrink-0">
               <Phone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Téléphone</h3>
              <p className="text-muted-foreground">+33 1 23 45 67 89</p>
            </div>
          </Card>

          <Card className="bg-background border-none shadow-none text-left flex items-start p-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-6 text-primary shrink-0">
               <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Siège Rissala</h3>
              <p className="text-muted-foreground">12 Avenue des Champs, Paris 75008, France.</p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="border-border/50 bg-card/60 backdrop-blur shadow-sm p-4 md:p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstname" className="text-sm font-medium text-foreground">Prénom</label>
                  <input id="firstname" type="text" className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Votre prénom..." />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastname" className="text-sm font-medium text-foreground">Nom</label>
                  <input id="lastname" type="text" className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Votre nom..." />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Adresse Email</label>
                <input id="email" type="email" className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="exemple@mail.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">Sujet</label>
                <select id="subject" className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground">
                  <option>Support Général</option>
                  <option>Question sur la Zakat</option>
                  <option>Partenariat Marché (Crypto/Actions)</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <textarea id="message" rows={5} className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Comment pouvons-nous vous aider ?"></textarea>
              </div>
              <Button type="submit" size="lg" className="w-full h-14">Envoyer le message</Button>
              <div className="text-center text-xs text-muted-foreground hidden lg:block">Formulaire protégé par reCAPTCHA</div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
