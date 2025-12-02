# 🌍 Plateforme Énergétique du Var (83)

Tableau de bord interactif pour la gestion et l'analyse énergétique des installations départementales du Var.

## 📋 Table des Matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Déploiement Web](#déploiement-web)
- [Déploiement Mobile](#déploiement-mobile)
- [Configuration](#configuration)
- [Installation Locale](#installation-locale)
- [Architecture](#architecture)
- [Support](#support)

## 🎯 Aperçu

Application React TypeScript moderne pour le monitoring énergétique en temps réel, l'analyse prédictive et le reporting de durabilité pour les installations du département du Var.

### Technologies Utilisées

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v3.4.6
- **Backend**: Supabase (Base de données PostgreSQL + Auth)
- **Analytics**: Google Analytics 4
- **Visualisation**: Recharts + D3.js
- **Routing**: React Router DOM v6

## ✨ Fonctionnalités

### 📊 Vue d'Ensemble Énergétique
- Monitoring en temps réel de la consommation
- Cartes thermiques des sites
- Flux d'alertes prioritaires
- Export de rapports

### 🏢 Surveillance des Sites
- Matrice de performance des équipements
- État de santé des capteurs
- Planning de maintenance
- Graphiques de consommation horaire

### 🔮 Hub d'Analyse Prédictive
- Prévisions de consommation
- Détection d'anomalies
- Modélisation de scénarios
- Analyse des risques

### 🌱 Durabilité Exécutive
- Suivi des KPI environnementaux
- Conformité réglementaire
- Comparaison de benchmarks
- Génération de rapports

## 🚀 Déploiement Web

### Option 1: Déploiement Instantané (Recommandé)

**Via l'interface Rocket:**

1. Cliquez sur le bouton **"Launch"** dans l'interface
2. L'application sera automatiquement déployée sur **Netlify**
3. Vous recevrez un lien public immédiat (ex: `https://energie-var-83.netlify.app`)
4. Aucune configuration requise - prêt pour présentation

**Avantages:**
- ✅ Déploiement en 1 clic
- ✅ HTTPS automatique
- ✅ CDN global pour performances optimales
- ✅ Mises à jour automatiques

### Option 2: Domaine Personnalisé

Pour une image de marque professionnelle:

1. Après le déploiement via "Launch"
2. Accédez aux paramètres Netlify
3. Ajoutez votre domaine personnalisé (ex: `energie.var.fr`)
4. Configurez les enregistrements DNS

**Configuration DNS:**
```
Type: CNAME
Nom: energie (ou www)
Valeur: [votre-site].netlify.app
```

### Option 3: Déploiement Manuel

Si vous avez cloné le projet localement:

```bash
# Installation des dépendances
npm install

# Build de production
npm run build

# Le dossier 'dist' contient les fichiers à déployer
```

Plateformes de déploiement supportées:
- Netlify (recommandé)
- Vercel
- GitHub Pages
- Firebase Hosting

## 📱 Déploiement Mobile

### Application Android

⚠️ **Important**: Cette application React ne peut pas être directement convertie en APK Android.

**Solutions disponibles:**

#### Option 1: Application Web Responsive (Recommandé)
- ✅ L'application fonctionne parfaitement sur mobile via navigateur
- ✅ Interface entièrement responsive
- ✅ Aucun téléchargement requis
- ✅ Accès via URL: `https://energie.var.fr`

**Avantages:**
- Mises à jour instantanées
- Compatible tous appareils (Android, iOS, tablettes)
- Pas de validation app store nécessaire

#### Option 2: Progressive Web App (PWA)
L'application est configurée comme PWA:

```json
// manifest.json déjà configuré
{
  "name": "Plateforme Énergétique Var",
  "short_name": "Énergie Var",
  "icons": [...],
  "theme_color": "#10b981",
  "background_color": "#ffffff"
}
```

**Installation sur mobile:**
1. Ouvrez l'app dans Chrome/Safari
2. Menu → "Ajouter à l'écran d'accueil"
3. L'icône apparaît comme une app native

#### Option 3: Application Native Flutter
Pour une vraie app Android/iOS:
- Créez un nouveau projet Flutter dans Rocket
- Implémentez les mêmes fonctionnalités
- Connectez à la même base Supabase

## ⚙️ Configuration

### Variables d'Environnement

Créez un fichier `.env` à la racine du projet:

```env
# Supabase Configuration (OBLIGATOIRE)
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-anon-supabase

# Analytics (Optionnel)
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# AdSense (Optionnel)
VITE_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX

# AI Services (Optionnel)
VITE_OPENAI_API_KEY=sk-...
VITE_GEMINI_API_KEY=...
VITE_ANTHROPIC_API_KEY=...
VITE_PERPLEXITY_API_KEY=...
```

### Configuration Supabase

#### 1. Créer un Projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez l'URL et la clé anonyme (Anon Key)

#### 2. Configuration Base de Données

Exécutez les migrations SQL dans l'éditeur Supabase:

```sql
-- Tables principales déjà créées:
-- - Sites énergétiques
-- - Équipements
-- - Capteurs
-- - Alertes
-- - Données de consommation
-- - Prévisions
-- Voir les migrations complètes dans le projet
```

#### 3. Row Level Security (RLS)

Les politiques RLS sont configurées pour:
- Authentification par email/mot de passe
- Accès basé sur les rôles (admin, opérateur, lecteur)
- Protection des données sensibles

### Configuration Analytics

#### Google Analytics 4

1. Créez une propriété GA4 sur [analytics.google.com](https://analytics.google.com)
2. Copiez l'ID de mesure (format: `G-XXXXXXXXXX`)
3. Ajoutez-le dans `.env`: `VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX`

L'intégration est automatique via le hook `useGoogleAnalytics`.

## 💻 Installation Locale

### Prérequis

- Node.js ≥ 18.0.0
- npm ≥ 9.0.0

### Étapes d'Installation

```bash
# 1. Cloner le projet
git clone [url-du-repo]
cd plateforme-energie-var

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés

# 4. Lancer le serveur de développement
npm run dev

# 5. Accéder à l'application
# Ouvrir http://localhost:5173
```

### Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement avec hot-reload

# Production
npm run build        # Build optimisé pour production
npm run preview      # Aperçu du build de production

# Code Quality
npm run lint         # Vérification ESLint
npm run type-check   # Vérification TypeScript
```

## 🏗️ Architecture

### Structure des Dossiers

```
plateforme-energie-var/
├── src/
│   ├── components/           # Composants réutilisables
│   │   ├── ui/              # Composants UI de base
│   │   └── ...              # Icônes, images, utilitaires
│   ├── pages/               # Pages principales
│   │   ├── energy-overview-dashboard/
│   │   ├── site-performance-monitor/
│   │   ├── predictive-analytics-hub/
│   │   └── executive-sustainability/
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Fonctions utilitaires
│   ├── styles/              # Styles globaux
│   ├── App.tsx              # Composant racine
│   └── Routes.tsx           # Configuration routing
├── public/                  # Assets statiques
├── .env                     # Variables d'environnement
└── package.json             # Dépendances
```

### Pages Principales

1. **Energy Overview Dashboard** (`/`)
   - Vue d'ensemble temps réel
   - KPI énergétiques
   - Carte thermique des sites

2. **Site Performance Monitor** (`/site-performance`)
   - Performance par installation
   - État des capteurs
   - Planning maintenance

3. **Predictive Analytics Hub** (`/predictive-analytics`)
   - Prévisions ML
   - Détection anomalies
   - Scénarios d'optimisation

4. **Executive Sustainability** (`/executive-sustainability`)
   - Tableaux de bord exécutifs
   - Conformité ESG
   - Rapports stratégiques

## 🔧 Dépannage

### Problèmes Courants

#### L'Analytics ne fonctionne pas

**Solution:**
1. Vérifiez que `VITE_GOOGLE_ANALYTICS_ID` est défini dans `.env`
2. Vérifiez que l'ID commence par `G-`
3. Redémarrez le serveur de développement

#### Erreurs Supabase

**Solution:**
1. Vérifiez les credentials dans `.env`
2. Consultez les logs dans l'onglet Supabase Dashboard
3. Vérifiez les politiques RLS

#### Erreur "Nested Router"

**Solution:**
- Ne modifiez JAMAIS `App.tsx` pour ajouter du routing
- Toutes les routes doivent être dans `Routes.tsx`
- Un seul `<BrowserRouter>` dans toute l'app

### Logs et Débogage

```bash
# Console navigateur
# Ouvrir DevTools → Console pour voir les erreurs

# Logs Supabase
# Dashboard Supabase → Logs → Postgres Logs

# Logs build
npm run build -- --mode development
```

## 📊 Performance

### Optimisations Implémentées

- ✅ Code splitting avec React.lazy
- ✅ Tree shaking automatique (Vite)
- ✅ Compression assets
- ✅ Lazy loading des composants
- ✅ Optimisation images
- ✅ Cache CDN (Netlify)

### Métriques Cibles

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Lighthouse Score**: > 90

## 🔐 Sécurité

### Bonnes Pratiques

- ✅ Variables sensibles dans `.env` (jamais dans le code)
- ✅ HTTPS obligatoire en production
- ✅ Row Level Security (RLS) Supabase
- ✅ Validation côté client et serveur
- ✅ Authentification JWT
- ✅ Protection CSRF

### Fichier .gitignore

```gitignore
.env
.env.local
.env.production
node_modules/
dist/
*.log
```

## 📞 Support

### Documentation Technique

- **React**: [react.dev](https://react.dev)
- **Vite**: [vitejs.dev](https://vitejs.dev)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)

### Ressources du Projet

- 🌐 **Application Web**: [URL après déploiement]
- 📧 **Support Technique**: contact@var.fr
- 📚 **Wiki**: Documentation interne

### Contacts Département du Var

- **Direction Numérique**: [contact département]
- **Service Énergie**: [contact service]

## 📄 Licence

© 2025 Département du Var - Tous droits réservés

---

**Version**: 1.0.0  
**Dernière mise à jour**: Décembre 2025  
**Maintenu par**: Équipe Numérique du Var