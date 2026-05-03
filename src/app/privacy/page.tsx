import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, UserCheck, AlertCircle, Clock, Database, Cookie } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-heading mb-4">Politique de Confidentialité</h1>
        <p className="text-muted-foreground text-lg">
          Votre vie privée est notre priorité. Découvrez comment Rissala protège et utilise vos données personnelles.
        </p>
      </div>

      <div className="space-y-8">
        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Collecte des données
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Dans le cadre de l'utilisation de nos services, nous sommes amenés à collecter certaines données personnelles vous concernant :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Données d'identification :</strong> nom, prénom, adresse e-mail, numéro de téléphone.</li>
              <li><strong>Données de connexion :</strong> adresse IP, logs de connexion, informations sur le navigateur et le terminal utilisé.</li>
              <li><strong>Données financières (pour certains services) :</strong> informations nécessaires au calcul de la Zakat ou à l'accès aux places de marché (strictement encadré).</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Finalité du traitement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Vos données sont principalement utilisées pour les finalités suivantes :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>La gestion de votre compte et l'accès à nos services (Marketplace Halal, calculatrice de Zakat, etc.).</li>
              <li>L'amélioration de la qualité de nos services et de votre expérience utilisateur.</li>
              <li>La communication avec vous (envoi de newsletters, alertes de marché, notifications de sécurité), avec votre consentement préalable.</li>
              <li>Le respect de nos obligations légales et réglementaires.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Durée de conservation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Nous conservons vos données personnelles uniquement le temps nécessaire à la réalisation des finalités prévues, ou pour remplir nos obligations légales.
            </p>
            <p>
              Par exemple, les données liées à votre compte sont conservées pendant toute la durée de votre inscription, puis pendant une durée maximale de 3 ans après sa fermeture ou inactivité, à des fins de prospection commerciale et selon le cadre légal du RGPD.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              Vos droits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Conformément à la réglementation applicable (notamment le Règlement Général sur la Protection des Données ou RGPD), vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Droit d'accès :</strong> obtenir une copie de vos données traitées.</li>
              <li><strong>Droit de rectification :</strong> corriger vos données si elles sont inexactes ou incomplètes.</li>
              <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données ("droit à l'oubli").</li>
              <li><strong>Droit d'opposition et limitation :</strong> vous opposer à un traitement ou demander sa suspension.</li>
              <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré et lisible.</li>
            </ul>
            <p>
              Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : <strong>dpo@rissala.fr</strong> ou via notre <Link href="/contact" className="text-primary hover:underline">page de contact</Link>.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              Politique des cookies (et Google Analytics)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Le site Rissala utilise des traceurs (cookies) pour assurer son bon fonctionnement, analyser l'audience et vous proposer une expérience personnalisée. Lors de votre première visite, un bandeau vous permet de paramétrer vos préférences et d'accepter ou refuser les cookies non essentiels.
            </p>
            <p>
              <strong>Google Analytics :</strong> Nous utilisons Google Analytics, un service d'analyse web fourni par Google LLC. Cet outil utilise des cookies pour nous aider à comprendre comment les visiteurs interagissent avec notre site (pages visitées, temps passé, etc.), ce qui nous permet d'améliorer continuellement notre plateforme. Les données générées par ces cookies concernant votre utilisation du site sont généralement transmises et stockées par Google.
            </p>
            <p>
              Vous pouvez configurer votre navigateur pour bloquer l'installation de ces cookies ou utiliser l'extension de navigateur pour la désactivation de Google Analytics fournie par Google si vous ne souhaitez pas participer à ces statistiques.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        <p className="mt-2">
          Pour plus d'informations légales, veuillez consulter nos <Link href="/legal" className="text-primary hover:underline">Mentions Légales</Link>.
        </p>
      </div>
    </div>
  );
}
