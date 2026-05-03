import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Building2, Server, Shield, FileText } from "lucide-react";

export default function LegalMentions() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <Scale className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-heading mb-4">Mentions Légales</h1>
        <p className="text-muted-foreground text-lg">
          Informations légales et réglementaires concernant l'utilisation du site Rissala.
        </p>
      </div>

      <div className="space-y-8">
        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Éditeur du site
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Le site <strong>Rissala</strong> est édité par la société Rissala SAS, société par actions simplifiée au capital de 10 000 euros.
            </p>
            <ul className="list-none space-y-2">
              <li><strong>Siège social :</strong> 123 Avenue de la République, 75011 Paris, France</li>
              <li><strong>RCS :</strong> Paris B 123 456 789</li>
              <li><strong>SIRET :</strong> 123 456 789 00012</li>
              <li><strong>TVA Intracommunautaire :</strong> FR 12 123456789</li>
              <li><strong>Email :</strong> contact@rissala.fr</li>
            </ul>
            <p>
              <strong>Directeur de la publication :</strong> Mickael (Directeur Général)
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              Hébergement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Le site Rissala est hébergé par Vercel Inc.
            </p>
            <ul className="list-none space-y-2">
              <li><strong>Adresse :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA</li>
              <li><strong>Site web :</strong> https://vercel.com</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Propriété intellectuelle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p>
              La reproduction de tout ou partie de ce site sur un support électronique ou papier quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Données personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Rissala s'engage à ce que la collecte et le traitement de vos données, effectués à partir du site rissala.fr, soient conformes au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.
            </p>
            <p>
              Pour toute information ou exercice de vos droits Informatique et Libertés sur les traitements de données personnelles gérés par Rissala, vous pouvez contacter son délégué à la protection des données (DPO) : dpo@rissala.fr.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
