# StokApp - Application de Gestion de Stock

## 📋 Vue d'ensemble du projet

**StokApp** est une application web moderne de gestion de stock construite avec **React** + **Vite** + **TypeScript** et utilisant **HeroUI** comme système de design.

## 🏗️ Architecture et Structure du Projet

```
vite-template/
├── 📁 public/                    # Ressources statiques
│   └── vite.svg                  # Logo Vite
├── 📁 src/                       # Code source principal
│   ├── 📁 components/            # Composants réutilisables
│   │   ├── admin-navbar/         # Navigation administration
│   │   │   ├── topbar.tsx        # Barre de navigation supérieure
│   │   │   └── sidebar.jsx       # Menu latéral avec navigation
│   │   ├── icons.tsx             # Icônes personnalisées
│   │   ├── navbar_home.tsx       # Navigation page d'accueil
│   │   ├── breadcrumbs.jsx       # Fil d'Ariane
│   │   └── TitleDashboard.jsx    # Titre du dashboard
│   ├── 📁 config/                # Configuration de l'application
│   │   ├── routes.ts             # Configuration des routes centralisée
│   │   ├── theme-switch.tsx      # Commutateur de thème dark/light
│   │   └── url_home.ts           # URLs et navigation accueil
│   ├── 📁 features/              # Fonctionnalités métier
│   │   └── dashboard.jsx         # Fonctionnalité dashboard principals
│   ├── 📁 hooks/                 # Hooks personnalisés React
│   │   └── useRouterDebug.tsx    # Debug des informations de routing
│   ├── 📁 layouts/               # Layouts de page
│   │   ├── admin.tsx             # Layout pour l'interface admin
│   │   └── default.tsx           # Layout par défaut
│   ├── 📁 pages/                 # Pages de l'application
│   │   ├── back/                 # Pages administration
│   │   │   └── dashboard.tsx     # Page dashboard admin
│   │   └── front/                # Pages publiques
│   │       └── home.tsx          # Page d'accueil
│   ├── 📁 styles/                # Styles globaux
│   │   └── globals.css           # CSS global avec Tailwind
│   ├── App.tsx                   # Composant racine de l'application
│   ├── main.tsx                  # Point d'entrée de l'application
│   ├── provider.tsx              # Providers React (HeroUI, Router)
│   └── vite-env.d.ts            # Types d'environnement Vite
├── eslint.config.mjs             # Configuration ESLint
├── tailwind.config.js            # Configuration Tailwind CSS + HeroUI
├── tsconfig.json                 # Configuration TypeScript
├── tsconfig.node.json            # Configuration TypeScript pour Node
├── vite.config.ts               # Configuration Vite
├── postcss.config.js            # Configuration PostCSS
├── package.json                 # Dépendances et scripts
└── vercel.json                  # Configuration de déploiement Vercel
```

## 🛠️ Technologies Utilisées

### **Frontend Core**
- **React 18.3.1** - Bibliothèque UI
- **TypeScript 5.6.3** - Langage typé
- **Vite 6.0.11** - Bundler et serveur de développement

### **Routing**
- **React Router DOM 6.23.0** - Navigation SPA
- **React Router 7.9.4** - Routing avancé

### **UI & Design System**
- **HeroUI 2.8.5** - Système de composants moderne
- **Tailwind CSS 4.1.11** - Framework CSS utility-first
- **Lucide React 0.546.0** - Icônes modernes
- **Framer Motion 11.18.2** - Animations fluides

### **Développement**
- **ESLint 9.25.1** - Linting du code
- **Prettier 3.5.3** - Formatage automatique
- **TypeScript ESLint** - Règles spécifiques TypeScript

## 🎨 Système de Design

### **Thèmes Configurés**
- **Mode Light** : Interface claire avec couleurs douces
- **Mode Dark** : Interface sombre pour le confort visuel
- **Couleur Primary** : `#F2E205` (Jaune personnalisé)

### **Composants HeroUI Utilisés**
- Navigation (Navbar, Sidebar)
- Boutons et Liens
- Avatars et Badges
- Dropdowns et Menus
- Breadcrumbs
- Inputs et Switches

## 🗂️ Organisation Fonctionnelle

### **Pages Définies dans les Routes**
1. **Accueil** (`/`) - Page d'accueil publique
2. **Dashboard** (`/tableau-de-bord`) - Tableau de bord principal
3. **Produits** (`/produits`) - Gestion des produits
4. **Catégories** (`/catégories`) - Classification des produits
5. **Fournisseurs** (`/fournisseurs`) - Gestion des fournisseurs
6. **Entrées de stock** (`/entrees-de-stock`) - Réceptions de marchandises
7. **Sorties de stock** (`/sorties-de-stock`) - Expéditions et ventes
8. **Mouvements du stock** (`/mouvements-du-stock`) - Historique des mouvements
9. **Clients** (`/clients`) - Base de données clients
10. **Utilisateurs & Rôles** (`/utilisateurs-et-roles`) - Gestion des accès
11. **Rapports** (`/rapports`) - Analyses et statistiques

### **Layouts**
- **Default Layout** - Pour les pages publiques
- **Admin Layout** - Interface administration avec sidebar et topbar

### **Navigation Active**
- Sidebar avec état actif/inactif
- Breadcrumbs dynamiques
- Navigation fluide sans rechargement

## 📦 Scripts Disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run lint     # Vérification du code
npm run preview  # Aperçu du build
```

## 🎯 Points Forts de l'Architecture

### ✅ **Organisation Claire**
- Séparation logique des composants, pages et configurations
- Structure modulaire et évolutive

### ✅ **Configuration Centralisée**
- Routes centralisées dans `/config/routes.ts`
- Thèmes unifiés dans `tailwind.config.js`

### ✅ **TypeScript Intégré**
- Typage strict pour une meilleure maintenance
- Interfaces définies pour les routes et composants

### ✅ **UI Moderne**
- HeroUI pour des composants professionnels
- Thèmes dark/light adaptatifs
- Animations fluides avec Framer Motion

### ✅ **Développement Optimisé**
- Hot reload avec Vite
- Linting et formatage automatiques
- Configuration VS Code incluse

## 🚀 Prochaines Étapes Suggérées

1. **Créer les pages manquantes** pour chaque route définie
2. **Implémenter la logique métier** pour la gestion de stock
3. **Ajouter l'authentification** et la gestion des rôles
4. **Connecter une base de données** ou API backend
5. **Tests unitaires** avec Jest/Vitest
6. **Documentation** des composants avec Storybook

---

*Dernière mise à jour : Octobre 2025*

[Try it on CodeSandbox](https://githubbox.com/heroui-inc/vite-template)

## Technologies Used

- [Vite](https://vitejs.dev/guide/)
- [HeroUI](https://heroui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org)
- [Framer Motion](https://www.framer.com/motion)

## How to Use

