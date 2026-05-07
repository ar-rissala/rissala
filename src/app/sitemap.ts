import { MetadataRoute } from "next";

// Remplacez cette URL par votre vrai nom de domaine en production
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rissala.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  // Routes principales
  const routes = [
    "",
    "/a-propos",
    "/contact",
    "/services",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Apprendre l'Arabe
  const arabeRoutes = [
    "/apprendre-arabe",
    "/apprendre-arabe/alphabet-arabe",
    "/apprendre-arabe/formes-lettres-arabes",
    "/apprendre-arabe/voyelles-courtes-arabe",
    "/apprendre-arabe/voyelles-longues-arabe",
    "/apprendre-arabe/methode-rissala-30-jours",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route === "/apprendre-arabe" ? 0.9 : 0.7,
  }));

  // Sciences Islamiques
  const sciencesRoutes = [
    "/sciences-islamiques",
    "/sciences-islamiques/islam-sunnite-sources",
    "/sciences-islamiques/vie-prophete-muhammad",
    "/sciences-islamiques/transmission-message-islamique",
    "/sciences-islamiques/science-hadith-bukhari",
    "/sciences-islamiques/ecoles-juridiques-sunnites",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route === "/sciences-islamiques" ? 0.9 : 0.7,
  }));

  // Finance Islamique
  const financeRoutes = [
    "/finance-islamique",
    "/finance-islamique/fondements-commerce-islam",
    "/finance-islamique/regles-vente-contrats",
    "/finance-islamique/riba-usure-explication",
    "/finance-islamique/zakat-mecanisme-economique",
    "/finance-islamique/finance-islamique-moderne",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route === "/finance-islamique" ? 0.9 : 0.7,
  }));

  return [...routes, ...arabeRoutes, ...sciencesRoutes, ...financeRoutes];
}
