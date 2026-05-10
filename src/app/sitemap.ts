import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Remplacez cette URL par votre vrai nom de domaine en production
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rissala.net";

  // 1. Routes Principales (Niveau 1) - Les plus importantes (Priorité haute)
  const mainRoutes = [
    "",
    "/langue-arabe",
    "/sciences",
    "/finance-islamique",
    "/ressources",
    "/formations",
    "/a-propos",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.9,
  }));

  // 2. Sous-routes : Sciences (Niveau 2)
  const sciencesRoutes = [
    "/sciences/islam-sunnite-sources",
    "/sciences/vie-prophete-muhammad",
    "/sciences/transmission-message-islamique",
    "/sciences/science-hadith-bukhari",
    "/sciences/ecoles-juridiques-sunnites",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 3. Sous-routes : Finance Islamique (Niveau 2)
  const financeRoutes = [
    "/finance-islamique/fondements-commerce-islam",
    "/finance-islamique/regles-vente-contrats",
    "/finance-islamique/riba-usure-explication",
    "/finance-islamique/zakat-mecanisme-economique",
    "/finance-islamique/finance-islamique-moderne",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 4. Sous-routes : Langue Arabe (Niveau 2)
  const arabeRoutes = [
    "/langue-arabe/alphabet-arabe",
    "/langue-arabe/formes-lettres-arabes",
    "/langue-arabe/voyelles-courtes-arabe",
    "/langue-arabe/voyelles-longues-arabe",
    "/langue-arabe/methode-rissala-30-jours",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // On fusionne toutes les routes et on les envoie à Google
  return [...mainRoutes, ...sciencesRoutes, ...financeRoutes, ...arabeRoutes];
}
