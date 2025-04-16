# Portfolio d'Abdoul Ahad Mbacké Diouf

Ce dépôt contient le code source de mon portfolio personnel, qui présente mon parcours professionnel, mes compétences techniques et mes projets en tant qu'Ingénieur Big Data pour la Transformation Numérique.

## 🚀 Démo

Le site est accessible à l'adresse suivante : [https://AbdoulDiouf2.github.io/portfolio_last_version](https://AbdoulDiouf2.github.io/portfolio_last_version)

## 💻 Technologies utilisées

- **Framework** : React.js avec TypeScript
- **Bundler** : Vite
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Icônes** : Lucide React
- **Formulaire de contact** : EmailJS
- **Hébergement** : GitHub Pages

## 📋 Fonctionnalités

- Design responsive s'adaptant à tous les appareils
- Mode sombre/clair avec conservation des préférences
- Animations fluides pour une navigation agréable
- Sections détaillées présentant :
  - Accueil avec présentation générale
  - À propos (parcours, formation, centres d'intérêt)
  - Compétences techniques
  - Expériences professionnelles
  - Projets
  - Contact
- Intégration de liens vers les réseaux sociaux et le CV

## 🛠️ Installation et utilisation en local

### Prérequis

- Node.js (v16.0.0 ou supérieur)
- npm ou yarn

### Installation

1. Clonez ce dépôt sur votre machine locale
   ```bash
   git clone https://github.com/AbdoulDiouf2/portfolio_last_version.git
   ```

2. Accédez au répertoire du projet
   ```bash
   cd portfolio_last_version
   ```

3. Installez les dépendances
   ```bash
   npm install
   # ou
   yarn install
   ```

### Lancement en local

Pour démarrer le serveur de développement :
```bash
npm run dev
# ou
yarn dev
```

Le site sera accessible à l'adresse `http://localhost:5173/`

### Construction pour la production

Pour générer les fichiers de production :
```bash
npm run build
# ou
yarn build
```

Les fichiers générés se trouveront dans le dossier `dist/`.

## 📂 Structure du projet

```
portfolio_last_version/
├── public/            # Ressources statiques (images, documents)
├── src/
│   ├── components/    # Composants React réutilisables
│   ├── context/       # Contextes React (thème, etc.)
│   ├── App.tsx        # Composant principal
│   ├── main.tsx       # Point d'entrée
│   └── index.css      # Styles globaux
├── index.html         # Page HTML principale
├── package.json       # Dépendances et scripts
└── vite.config.ts     # Configuration de Vite
```

## 🔄 Mise à jour du site déployé

Pour déployer vos modifications locales sur GitHub Pages, suivez ces étapes :

1. Effectuez vos modifications localement
2. Testez-les en utilisant `npm run dev` ou `yarn dev`
3. Après avoir validé vos changements, commitez et pushez-les sur GitHub :
   ```bash
   git add .
   git commit -m "Description des changements"
   git push origin main
   ```
4. Déployez les modifications sur GitHub Pages :
   ```bash
   npm run deploy
   # ou
   yarn deploy
   ```

Cette commande va :
1. Construire le projet (`npm run build`)
2. Publier le contenu du dossier `dist/` sur la branche `gh-pages`
3. Mettre à jour automatiquement le site hébergé

> **Note** : La commande `deploy` utilise le package `gh-pages` qui est déjà configuré dans les scripts de votre `package.json`. Assurez-vous d'avoir les autorisations nécessaires pour pousser sur le dépôt GitHub.

## 📱 Contact

- 📧 Email : [aad.mbacke691@gmail.com](mailto:aad.mbacke691@gmail.com)
- 🔗 LinkedIn : [Abdoul Ahad Mbacké Diouf](https://www.linkedin.com/in/abdoul-ahad-mbacké-diouf-5b04b4213)
- 🔗 GitHub : [AbdoulDiouf2](https://github.com/AbdoulDiouf2)
