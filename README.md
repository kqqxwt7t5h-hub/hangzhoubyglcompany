# Hangzhou BYGL Global Trading Company — Site + API de contact Gmail

Site vitrine one-page (HTML5 / CSS3 / JavaScript vanilla) avec formulaire de contact envoyant
un email réel via l'API Gmail (Node.js + OAuth 2.0), déployable sur Vercel.

## Sommaire

1. [Présentation](#1-présentation)
2. [Structure du projet](#2-structure-du-projet)
3. [Modifier le texte](#3-modifier-le-texte)
4. [Modifier les couleurs](#4-modifier-les-couleurs)
5. [Modifier le logo](#5-modifier-le-logo)
6. [Modifier la Terre](#6-modifier-la-terre)
7. [Modifier le QR code](#7-modifier-le-qr-code)
8. [Modifier email / téléphone / WeChat](#8-modifier-email--téléphone--wechat)
9. [Installer Node.js](#9-installer-nodejs)
10. [npm install](#10-npm-install)
11. [Gmail API](#11-gmail-api)
12. [OAuth 2.0](#12-oauth-20)
13. [Variables d'environnement](#13-variables-denvironnement)
14. [Tester localement](#14-tester-localement)
15. [GitHub](#15-github)
16. [Vercel](#16-vercel)
17. [Domaine personnalisé](#17-domaine-personnalisé)
18. [Dépannage](#18-dépannage)
19. [Sécurité](#19-sécurité)

---

## 1. Présentation

Ce projet est le site officiel de **Hangzhou BYGL Global Trading Company**. C'est un site
**one-page** : tout le contenu (Accueil, Services, Sourcing, Partenariats, Projets, À propos,
Contact) se trouve dans un seul fichier `index.html`, avec une navigation par ancres.

Le formulaire de contact envoie une vraie demande par email, directement dans une boîte Gmail,
via l'API Gmail officielle (Node.js + OAuth 2.0), grâce à une fonction serverless déployée sur
Vercel (`api/contact.js`).

**Aucun framework frontend** (pas de React/Next.js/Vue/Tailwind) : HTML, CSS et JavaScript
purs, pour rester simple à ouvrir et modifier dans PyCharm.

## 2. Structure du projet

```
BYGL/
│
├── index.html          → tout le contenu du site (une page, sections ancrées)
├── style.css             → tout le design (variables de couleurs en haut du fichier)
├── script.js               → toutes les interactions (menu, formulaire, animations)
├── package.json
├── package-lock.json        → généré automatiquement par npm, ne pas modifier à la main
├── README.md
├── .gitignore
├── .env.example              → noms des variables d'environnement (sans vraies valeurs)
│
├── api/
│   └── contact.js              → fonction serverless Vercel : reçoit le formulaire,
│                                  valide les données, envoie l'email via l'API Gmail
│
└── images/
    ├── logo.png                 → logo (header, hero, footer)
    ├── earth-map.png              → globe utilisé dans le Hero
    └── wechat-qr.png               → QR Code WeChat (à ajouter, voir section 7)
```

Sections de `index.html` (avec leurs ancres) :

```html
<section id="accueil">      <!-- Hero -->
<section id="services">
<section id="sourcing">
<section id="partenariats">
<section id="projets">
<section id="a-propos">
<section id="contact">
```

## 3. Modifier le texte

Tout le texte est dans `index.html`, découpé en sections commentées
(`<!-- ===== ACCUEIL / HERO ===== -->`, etc.). Ouvrez le fichier, repérez la section avec
Ctrl+F, et modifiez le texte directement entre les balises. Ne supprimez pas les balises
elles-mêmes.

## 4. Modifier les couleurs

Toutes les couleurs sont centralisées en haut de `style.css`, dans `:root { ... }` :

```css
:root{
  --navy: #0F1B2D;     /* bleu marine profond */
  --navy-dark: #0A121F;  /* bleu très sombre */
  --gold: #C9A96A;         /* or / champagne */
  --ivory: #F7F4EE;          /* blanc cassé */
  --gray-700: #57534A;         /* gris clair (texte) */
  --black: #14181D;              /* noir */
  ...
}
```

Modifiez une valeur ici : le changement s'applique automatiquement partout sur le site.

## 5. Modifier le logo

Remplacez `images/logo.png` par votre fichier (même nom). Il est utilisé dans le header, le
hero et le footer — un seul remplacement suffit.

## 6. Modifier la Terre

Le visuel de la section Hero est composé de **deux couches superposées** :

1. `images/earth-map.png` — l'image statique du globe (fond bleu nuit, grille, continents
   stylisés). C'est un fichier image classique : vous pouvez le remplacer par votre propre
   visuel (même nom de fichier, idéalement carré et centré comme l'original).
2. Un **SVG animé par-dessus** (directement dans `index.html`, bloc `.globe-wrap__overlay`) qui
   dessine les lignes lumineuses partant de Hangzhou. C'est du SVG (pas une image) pour que les
   lignes restent nettes et puissent être animées en CSS.

Pour ajuster les lignes de connexion :
- Le point d'origine (Hangzhou) : `<circle class="globe-origin">`, coordonnées `cx`/`cy`.
- Chaque ligne : un `<path class="globe-route">` — modifiez la courbe pour changer sa forme, ou
  dupliquez-en une pour ajouter une région.
- Chaque région ciblée a un point (`globe-target`) et une étiquette (`globe-label`) à mettre à
  jour ensemble.

Si vous changez `images/earth-map.png` pour une image de dimensions différentes, gardez un
ratio 1:1 (carré) pour que la superposition des lignes reste alignée avec le globe.

## 7. Modifier le QR code

Déposez votre image dans `images/wechat-qr.png` (même nom de fichier). Elle s'affichera
automatiquement dans l'encadré de la section Contact.

**Tant qu'aucune image n'est présente à cet emplacement**, le script affiche automatiquement un
cadre de remplacement « QR Code WeChat à ajouter » — le site reste donc toujours propre.

## 8. Modifier email / téléphone / WeChat

Ces informations sont actuellement des **placeholders explicites** (`@@@@@@@@@`,
`+86 0000000000`), à remplacer par les vraies coordonnées. Ils apparaissent à deux endroits
dans `index.html` : la section Contact et le footer. Recherchez ces valeurs avec Ctrl+F et
remplacez-les.

Ces coordonnées sont uniquement **affichées** sur le site ; elles ne sont pas utilisées par le
formulaire, qui envoie ses données vers votre Gmail via l'API (voir sections suivantes).

## 9. Installer Node.js

Le site lui-même (HTML/CSS/JS) ne nécessite rien pour être affiché. Node.js est requis
uniquement pour :
- exécuter `npm install` (installer la dépendance `googleapis`) ;
- tester l'API de contact en local ;
- utiliser la CLI Vercel.

Téléchargez et installez Node.js (version 18 ou supérieure recommandée) depuis
[nodejs.org](https://nodejs.org/). Vérifiez l'installation :
```bash
node --version
npm --version
```

## 10. npm install

Depuis le dossier du projet :
```bash
cd BYGL
npm install
```

Cela installe la seule dépendance nécessaire : `googleapis` (client officiel Google pour
Node.js, qui inclut l'API Gmail et OAuth 2.0).

## 11. Gmail API

Pour que le formulaire envoie réellement des emails, vous devez activer l'API Gmail sur un
projet Google Cloud et autoriser votre adresse Gmail.

**Étape 1 — Créer un projet Google Cloud**
1. Allez sur [console.cloud.google.com](https://console.cloud.google.com/).
2. Créez un nouveau projet (ou utilisez un projet existant).

**Étape 2 — Activer l'API Gmail**
1. Dans le menu, allez dans « APIs & Services » → « Library ».
2. Cherchez « Gmail API » et cliquez sur « Enable ».

**Étape 3 — Configurer l'écran de consentement OAuth**
1. « APIs & Services » → « OAuth consent screen ».
2. Type d'utilisateur : « External » (suffisant si seule votre propre adresse Gmail utilise
   l'application) ou « Internal » si vous avez un Google Workspace.
3. Renseignez un nom d'application (ex. « BYGL Contact Form ») et votre email de contact.
4. Ajoutez le scope `https://www.googleapis.com/auth/gmail.send`.
5. Dans « Test users » (si l'app reste en mode « Testing »), ajoutez l'adresse Gmail que vous
   utiliserez pour envoyer les emails.

## 12. OAuth 2.0

**Étape 4 — Créer les identifiants OAuth**
1. « APIs & Services » → « Credentials » → « Create Credentials » → « OAuth client ID ».
2. Type d'application : « Web application ».
3. Ajoutez `https://developers.google.com/oauthplayground` dans « Authorized redirect URIs »
   (nécessaire pour l'étape suivante).
4. Notez le **Client ID** et le **Client Secret** générés : ce sont `GOOGLE_CLIENT_ID` et
   `GOOGLE_CLIENT_SECRET`.

**Étape 5 — Obtenir le refresh token**
La façon la plus simple, sans écrire de code, est d'utiliser l'outil officiel Google
[OAuth 2.0 Playground](https://developers.google.com/oauthplayground/) :
1. Ouvrez la page, cliquez sur l'icône ⚙️ (en haut à droite) et cochez « Use your own OAuth
   credentials ». Renseignez votre Client ID et Client Secret.
2. Dans la liste de gauche, trouvez « Gmail API v1 » et sélectionnez le scope
   `https://www.googleapis.com/auth/gmail.send`.
3. Cliquez sur « Authorize APIs », connectez-vous avec l'adresse Gmail qui enverra/recevra les
   emails, et acceptez.
4. Cliquez sur « Exchange authorization code for tokens ».
5. Notez le **Refresh token** affiché : c'est `GOOGLE_REFRESH_TOKEN`.

**Étape 6 — Autoriser l'adresse Gmail**
`GMAIL_USER` est simplement l'adresse Gmail complète que vous avez utilisée pour autoriser
l'application à l'étape 5 (ex. `contact.bygl@gmail.com`). C'est cette adresse qui envoie et
reçoit les demandes du formulaire.

## 13. Variables d'environnement

Le fichier `.env.example` liste les variables nécessaires, **sans valeurs réelles** :

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GMAIL_USER=
```

**Pour le développement local :**
```bash
cp .env.example .env
```
Puis ouvrez `.env` et renseignez les 4 valeurs obtenues à la section 12.

**Pour Vercel (production)**, voir section 16 — les variables se configurent dans le dashboard
Vercel, jamais dans un fichier commité sur GitHub.

⚠️ Le fichier `.env` est déjà listé dans `.gitignore` : il ne sera jamais envoyé sur GitHub.
Ne le renommez pas et ne retirez pas cette ligne du `.gitignore`.

## 14. Tester localement

**Option A — Frontend seul (sans formulaire fonctionnel)**
Ouvrez simplement `index.html` dans un navigateur, ou lancez un serveur statique :
```bash
npx serve .
```
Le formulaire s'affichera mais l'appel à `/api/contact` échouera (404), puisqu'aucune fonction
serverless ne tourne sans Vercel.

**Option B — Frontend + API, avec la CLI Vercel (recommandé)**
```bash
npm install -g vercel
vercel dev
```
`vercel dev` sert `index.html` **et** exécute `api/contact.js` exactement comme en production,
en lisant les variables du fichier `.env`. Ouvrez l'URL affichée (ex.
`http://localhost:3000`), remplissez le formulaire, et vérifiez que l'email arrive bien dans
la boîte `GMAIL_USER`.

## 15. GitHub

1. Créez un dépôt sur [github.com](https://github.com) (bouton « New repository »), laissez-le
   vide.
2. Depuis le dossier du projet :
   ```bash
   git init
   git add .
   git commit -m "Version initiale du site BYGL"
   git branch -M main
   git remote add origin https://github.com/VOTRE-UTILISATEUR/bygl-website.git
   git push -u origin main
   ```
3. Pour la suite, à chaque modification :
   ```bash
   git add .
   git commit -m "Description de la modification"
   git push
   ```

Le `.gitignore` exclut déjà `node_modules/`, `.env` et les fichiers temporaires : vos secrets
Google ne seront jamais envoyés sur GitHub tant que vous ne les copiez pas ailleurs.

## 16. Vercel

1. Créez un compte sur [vercel.com](https://vercel.com) (le plus simple : connectez-vous avec
   votre compte GitHub).
2. Cliquez sur « Add New... » → « Project », puis sélectionnez le dépôt GitHub du projet.
3. Vercel détecte automatiquement un projet statique + une fonction serverless dans `/api` :
   aucune configuration de build n'est nécessaire (laissez les champs par défaut).
4. **Avant de déployer** (ou juste après), ajoutez les variables d'environnement : dans les
   réglages du projet Vercel → « Settings » → « Environment Variables », ajoutez une par une :
   `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, `GMAIL_USER`, avec leurs
   vraies valeurs (jamais commitées sur GitHub).
5. Cliquez sur « Deploy ».
6. Si vous avez ajouté les variables **après** un premier déploiement, redéployez : onglet
   « Deployments » → menu ⋮ sur le dernier déploiement → « Redeploy ».
7. **Tester l'envoi d'un email** : ouvrez l'URL fournie par Vercel (ex.
   `https://bygl-website.vercel.app`), remplissez le formulaire de contact avec de vraies
   informations de test, envoyez, et vérifiez que l'email arrive dans la boîte `GMAIL_USER`
   (pensez à regarder aussi le dossier Spam la première fois).

## 17. Domaine personnalisé

1. Dans le dashboard Vercel du projet, allez dans « Settings » → « Domains ».
2. Entrez votre domaine, par exemple `www.mon-domaine.com` ou `mon-domaine.com`.
3. Vercel affiche les enregistrements DNS exacts à configurer chez votre registrar (chez qui
   vous avez acheté le domaine) : généralement un enregistrement `A` ou `CNAME` selon le cas.
4. Ajoutez ces enregistrements dans l'interface de gestion DNS de votre registrar.
5. Attendez la propagation DNS (de quelques minutes à quelques heures). Vercel affiche un
   statut « Valid Configuration » une fois que tout est en ordre, et génère automatiquement le
   certificat HTTPS.

Une fois connecté, le site est accessible avec votre propre nom de domaine, en plus de l'URL
`.vercel.app` fournie par défaut.

## 18. Dépannage

**Le formulaire affiche « Le service d'envoi n'est pas encore configuré »**
→ Une ou plusieurs variables d'environnement Gmail manquent sur Vercel. Vérifiez les 4
variables dans Settings → Environment Variables, puis redéployez.

**Le formulaire affiche « Une erreur est survenue lors de l'envoi »**
→ Consultez les logs de la fonction dans le dashboard Vercel (onglet « Logs » ou « Functions »)
pour voir le détail exact de l'erreur (jamais affiché au visiteur, pour la sécurité). Causes
fréquentes : refresh token expiré ou révoqué (recommencez l'étape 12), scope Gmail non
autorisé, ou adresse `GMAIL_USER` différente de celle utilisée pour générer le refresh token.

**Erreur 429 « Trop de demandes envoyées »**
→ Limitation de débit normale (voir section 19). Attendez une minute avant de réessayer.

**Le formulaire semble fonctionner en local mais pas sur Vercel**
→ Vérifiez que les variables d'environnement sont bien renseignées sur Vercel (elles sont
séparées de votre fichier `.env` local) et qu'un redéploiement a eu lieu après leur ajout.

**Le globe ou les images ne s'affichent pas**
→ Vérifiez que les fichiers existent bien dans `images/` avec exactement les noms attendus
(`logo.png`, `earth-map.png`, `wechat-qr.png`) et que la casse correspond (sensible à la casse
sur GitHub/Vercel, contrairement à Windows).

**Le site fonctionne en local mais les chemins d'image sont cassés en ligne**
→ Vérifiez qu'aucun chemin ne commence par `/` suivi d'un dossier local à votre machine
(`images/...` sans slash initial est correct et déjà utilisé partout dans ce projet).

## 19. Sécurité

- **Aucun secret dans le frontend** : `index.html`, `style.css` et `script.js` ne contiennent
  ni Client Secret, ni Refresh Token, ni aucune clé — tout reste côté serveur dans
  `api/contact.js`, lu depuis les variables d'environnement.
- **`.env` jamais versionné** : exclu par `.gitignore`. Seul `.env.example` (sans valeurs) est
  commité, pour documenter les noms de variables attendus.
- **Validation double** : côté navigateur (retour immédiat, meilleure expérience) ET côté
  serveur dans `api/contact.js` (la seule qui compte réellement, puisqu'un visiteur malveillant
  peut contourner le JavaScript du navigateur).
- **Honeypot anti-spam** : un champ invisible (`website`) piège les robots qui remplissent tous
  les champs d'un formulaire automatiquement. S'il est rempli, le serveur répond un faux succès
  (pour ne pas alerter le robot) mais n'envoie aucun email.
- **Limites de taille** : chaque champ a une longueur maximale vérifiée côté serveur, pour
  éviter les abus (emails géants, attaques par déni de service basique).
- **Limitation de débit (rate limiting)** : `api/contact.js` limite à 5 requêtes par minute par
  adresse IP, en mémoire. **Limite connue** : sur Vercel, chaque fonction serverless peut
  tourner sur plusieurs instances éphémères (cold starts), donc cette protection est une
  première barrière simple mais pas une garantie absolue à grande échelle. Pour une limitation
  fiable en production à fort trafic, la solution recommandée est un store externe partagé
  entre toutes les instances, par exemple [Upstash Redis](https://upstash.com/) (qui propose un
  plan gratuit et s'intègre nativement à Vercel) avec le package `@upstash/ratelimit`.
- **Reply-To plutôt que From falsifié** : l'email envoyé provient toujours de `GMAIL_USER`
  (jamais falsifié, ce qui serait rejeté par Gmail de toute façon), avec l'adresse du visiteur
  placée dans l'en-tête `Reply-To` — vous pouvez donc cliquer « Répondre » directement dans
  Gmail pour contacter le client.
- **Erreurs sans fuite d'information** : en cas d'erreur (variables manquantes, échec Gmail),
  le message renvoyé au visiteur reste générique ; le détail technique va uniquement dans les
  logs serveur (visibles dans le dashboard Vercel), jamais dans la réponse HTTP.
- **CORS** : non nécessaire ici, le frontend et l'API étant servis depuis le même domaine
  Vercel. Si vous séparez un jour frontend et backend sur des domaines différents, ajoutez les
  en-têtes `Access-Control-Allow-Origin` appropriés dans `api/contact.js`.

---

## Ce qui n'a volontairement pas été inventé

- Email, téléphone : placeholders explicites `@@@@@@@@@` et `+86 0000000000` (section 8).
- WeChat ID `BYGL_Global` et QR Code : à ajouter par vos soins (section 7).
- Identifiants Google (Client ID, Client Secret, Refresh Token) : à générer vous-même
  (sections 11-12), jamais fournis ni inventés dans ce projet.
- Réalisation effective des projets d'accès à l'eau potable : présentés comme un exemple de
  domaine de projet potentiel, à l'étude — jamais comme un projet déjà réalisé.

---

© 2026 Hangzhou BYGL Global Trading Company. Tous droits réservés.
