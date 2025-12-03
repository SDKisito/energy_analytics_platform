# Guide de Déploiement

## Options de Déploiement

### 1. Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

Ou connectez votre repo GitHub à Vercel : https://vercel.com/new

### 2. Netlify

```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Déployer
netlify deploy --prod
```

Ou glissez-déposez le dossier `build` sur : https://app.netlify.com/drop

### 3. AWS Amplify

1. Connectez votre repo à AWS Amplify Console
2. Le fichier `amplify.yml` est déjà configuré
3. AWS détectera automatiquement la configuration

### 4. GitHub Pages

1. Activez GitHub Pages dans les paramètres du repo
2. Le workflow `.github/workflows/deploy.yml` déploiera automatiquement

### 5. Build Manuel

```bash
# Construire l'application
npm run build

# Le dossier build/ contient les fichiers statiques
# Déployez ce dossier sur n'importe quel hébergeur statique
```

## Variables d'Environnement

Créez un fichier `.env` avec :

```env
VITE_API_URL=https://votre-api.com
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

## Configuration Serveur

Pour un serveur personnalisé, assurez-vous de :
- Servir `index.html` pour toutes les routes (SPA routing)
- Activer la compression gzip/brotli
- Configurer les en-têtes de cache pour les assets statiques

## Vérification Post-Déploiement

- ✅ Toutes les routes fonctionnent (/, /analytics, /site-monitor, /executive)
- ✅ Les assets se chargent correctement
- ✅ Pas d'erreurs dans la console
- ✅ Les performances sont optimales (Lighthouse > 90)
