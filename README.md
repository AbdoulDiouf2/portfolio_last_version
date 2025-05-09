# Portfolio d'Abdoul Ahad Mbacké Diouf

Ce dépôt contient le code source de mon portfolio personnel, qui présente mon parcours professionnel, mes compétences techniques et mes projets en tant qu'Ingénieur Big Data pour la Transformation Numérique.

## 🚀 Démo

Le site est accessible à l'adresse suivante : [https://AbdoulDiouf2.github.io/portfolio_last_version](https://AbdoulDiouf2.github.io/portfolio_last_version)

## 💻 Technologies utilisées

- **Framework** : React.js avec TypeScript
- **Bundler** : Vite
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Visualisations 3D** : Three.js
- **Icônes** : Lucide React
- **Formulaire de contact** : EmailJS
- **Interactions** : EmailJS, Framer Motion
- **Hébergement** : GitHub Pages

## 📋 Fonctionnalités

- Design responsive s'adaptant à tous les appareils
- Mode sombre/clair avec conservation des préférences
- Animations fluides pour une navigation agréable
- Visualisations et arrière-plans 3D interactifs :
  - Arrière-plan 3D avec particules réactives dans la section d'accueil
  - Visualisation des compétences en bulles 3D interactives (avec option de basculer vers 2D)
  - Arrière-plan animé thématique pour la section À Propos
- Navigation interactive :
  - Défilement doux vers les sections lors des clics sur les liens
  - Bouton intelligent qui permet de remonter/descendre selon la position de l'utilisateur
  - Chatbot assistant qui répond aux questions sur mon profil et parcours
- Sections détaillées présentant :
  - Accueil avec présentation générale
  - À propos (parcours, formation, centres d'intérêt)
  - Compétences techniques
  - Expériences professionnelles
  - Projets
  - Contact
- Intégration de liens vers les réseaux sociaux et le CV
- Interface utilisateur intuitive avec boutons semi-transparents qui deviennent plus visibles au survol

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

```text
portfolio_last_version/
├── public/            # Ressources statiques (images, documents)
├── src/
│   ├── components/    # Composants React réutilisables
│   │   ├── Header.tsx           # Navigation et liens
│   │   ├── Hero.tsx             # Section d'accueil
│   │   ├── HeroBackground3D.tsx # Arrière-plan 3D pour la section d'accueil
│   │   ├── About.tsx            # Section à propos
│   │   ├── AboutBackground.tsx  # Arrière-plan animé pour la section à propos
│   │   ├── Skills.tsx           # Section compétences
│   │   ├── Skills3D.tsx         # Visualisation 3D des compétences
│   │   ├── Experience.tsx       # Section expériences
│   │   ├── Contact.tsx          # Section contact
│   │   ├── ThemeToggle.tsx      # Bouton de changement de thème
│   │   ├── ScrollButton.tsx     # Bouton de défilement intelligent
│   │   ├── ChatbotAssistant.tsx # Assistant virtuel conversationnel
│   │   └── ... 
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

## 🤖 Assistant virtuel

Le portfolio intègre un assistant virtuel conversationnel qui permet aux visiteurs de poser des questions sur mon profil, mes compétences, mes expériences et mes projets. L'assistant est accessible via un bouton flottant en bas à droite de l'écran.

Fonctionnalités de l'assistant :

- Réponses contextuelles basées sur mon CV et mon parcours
- Interface de chat conviviale et intuitive
- Possibilité de poser des questions sur ma formation, mes compétences, mes expériences professionnelles, etc.
- Disponible en permanence pour aider les recruteurs ou visiteurs à découvrir mon profil
