# Rissala — Frontend Next.js

Il s'agit du frontend du projet Rissala, construit avec [Next.js](https://nextjs.org), React, TypeScript et Tailwind CSS. 
Ce projet est totalement indépendant du backend Django et communique avec lui via une API REST.

## Installation

### 1. Prérequis

- Node.js 18+ installé

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer l'environnement

Créer un fichier `.env.local` à la racine (s'il n'existe pas) basé sur `.env.example` :

```env
# URL du backend Django (ex: http://127.0.0.1:8000 en dev ou https://api.rissala.net en prod)
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Déploiement (Production)

Pour construire le projet pour la production :

```bash
npm run build
npm start
```

Ce projet est prêt à être déployé sur [Vercel](https://vercel.com).
Assurez-vous de définir la variable d'environnement `NEXT_PUBLIC_API_URL` dans les paramètres de votre projet Vercel vers l'URL de production de votre API Django.
