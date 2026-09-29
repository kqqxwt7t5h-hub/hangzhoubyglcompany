# Hangzhou BYGL Global Trading Company — site vitrine

Site one-page (HTML5 / CSS3 / JavaScript vanilla), sans framework et sans serveur Node.js.
Le formulaire de contact envoie un vrai email via **EmailJS**, directement depuis le
navigateur du visiteur — rien à héberger côté serveur pour l'envoi des messages.

## Sommaire

1. [Présentation du projet](#1-présentation-du-projet)
2. [Structure des fichiers](#2-structure-des-fichiers)
3. [Modifier les textes](#3-modifier-les-textes)
4. [Modifier les couleurs](#4-modifier-les-couleurs)
5. [Remplacer le logo](#5-remplacer-le-logo)
6. [Remplacer l'image de la Terre](#6-remplacer-limage-de-la-terre)
7. [Remplacer le QR code WeChat](#7-remplacer-le-qr-code-wechat)
8. [Modifier l'e-mail](#8-modifier-le-mail)
9. [Modifier le téléphone](#9-modifier-le-téléphone)
10. [Modifier le numéro WhatsApp](#10-modifier-le-numéro-whatsapp)
11. [Ajouter les profils sociaux](#11-ajouter-les-profils-sociaux)
12. [Créer un compte EmailJS](#12-créer-un-compte-emailjs)
13. [Connecter Gmail à EmailJS](#13-connecter-gmail-à-emailjs)
14. [Créer le service EmailJS](#14-créer-le-service-emailjs)
15. [Créer le modèle d'e-mail](#15-créer-le-modèle-de-mail)
16. [Récupérer les identifiants EmailJS](#16-récupérer-les-identifiants-emailjs)
17. [Configurer script.js](#17-configurer-scriptjs)
18. [Tester le formulaire](#18-tester-le-formulaire)
19. [Déployer sur GitHub et Vercel](#19-déployer-sur-github-et-vercel)
20. [Connecter un domaine personnalisé](#20-connecter-un-domaine-personnalisé)
21. [Résoudre les erreurs courantes](#21-résoudre-les-erreurs-courantes)

---

## 1. Présentation du projet

Ce dépôt contient le site officiel de **Hangzhou BYGL Global Trading Company**. C'est un
site **one-page** : Accueil, Services, Sourcing, Partenariats, Projets, À propos et Contact
sont des sections d'un seul fichier `index.html`, reliées par des ancres (`#services`, etc.).

Le formulaire de contact utilise **EmailJS** : la bibliothèque officielle, chargée depuis
un CDN, envoie le message directement depuis le navigateur du visiteur vers votre boîte
mail, sans passer par un serveur que vous auriez à maintenir.

Aucun framework (pas de React, Vue, Next.js, Tailwind) : uniquement du HTML, du CSS et du
JavaScript purs, faciles à ouvrir et modifier dans PyCharm.

## 2. Structure des fichiers

```
BYGL/
│
├── index.html      → tout le contenu du site (une seule page, sections ancrées)
├── style.css       → tout le design (variables de couleurs en haut du fichier)
├── script.js       → toutes les interactions : menu, formulaire, EmailJS,
│                     réseaux sociaux, animations. La CONFIGURATION (clés
│                     EmailJS, réseaux sociaux, WhatsApp) est tout en haut.
├── README.md       → ce document
├── .gitignore
│
└── images/
    ├── logo.png         → logo BYGL (déjà en place)
    ├── earth-map.png    → globe animé du Hero (déjà en place)
    └── wechat-qr.png    → QR code WeChat (à ajouter, voir section 7)
```

Il n'y a **pas de `package.json`** : sans backend Node.js, aucune dépendance à installer.
Vous pouvez ouvrir `index.html` directement dans un navigateur, ou utiliser l'extension
« Live Server » de PyCharm/VS Code pour un rechargement automatique pendant l'édition.

## 3. Modifier les textes

Tous les textes sont dans `index.html`, dans les sections `<section id="...">`. Chaque
section est commentée (`<!-- ===== SERVICES ===== -->`, etc.) pour la repérer facilement.
Modifiez directement le texte entre les balises.

## 4. Modifier les couleurs

Toutes les couleurs sont définies **une seule fois**, en haut de `style.css` :

```css
:root{
  --navy: #0F1B2D;
  --gold: #C9A96A;
  --ivory: #F7F4EE;
  ...
}
```

Changez une valeur ici et elle se répercute automatiquement partout sur le site (boutons,
titres, fonds, icônes). **Ne changez rien d'autre** dans le fichier pour les couleurs.

## 5. Remplacer le logo

Remplacez `images/logo.png` par votre fichier (même nom). Il apparaît dans le menu, le
Hero et le footer, à des tailles différentes gérées automatiquement par le CSS.

## 6. Remplacer l'image de la Terre

Remplacez `images/earth-map.png` (même nom). Les lignes lumineuses qui partent de
Hangzhou sont dessinées en SVG directement dans `index.html`, section `.globe-wrap` :

```html
<circle class="globe-origin" cx="345" cy="185" r="4.5"/>
...
<path class="globe-route" d="M345,185 Q290,120 210,110"/>
```

`cx="345" cy="185"` est la position de Hangzhou sur l'image actuelle (500×500 px). Si votre
nouvelle image cadre le globe différemment, ajustez ces coordonnées pour que le point d'or
reste bien sur Hangzhou, et déplacez les points d'arrivée (`globe-target`) en conséquence.

## 7. Remplacer le QR code WeChat

Déposez votre image dans `images/wechat-qr.png` (même nom). Si le fichier est absent, le
site affiche automatiquement un encadré « QR Code WeChat à ajouter » à la place — jamais
d'image cassée.

## 8. Modifier l'e-mail

Dans `index.html`, remplacez `hangzhoubyglcompany@gmail.com` aux **deux** endroits où il
apparaît (section Contact et footer) — pensez à mettre à jour le lien `mailto:` en plus du
texte visible :

```html
<a class="placeholder" href="mailto:votre.email@domaine.com">votre.email@domaine.com</a>
```

## 9. Modifier le téléphone

Même principe, aux deux endroits où `+86 18516298726` apparaît :

```html
<a class="placeholder" href="tel:+86XXXXXXXXXX">+86 XX XXXX XXXX</a>
```

Le lien `tel:` doit rester sans espace ni tiret pour fonctionner sur tous les téléphones.

## 10. Modifier le numéro WhatsApp

Tout se passe dans **`script.js`**, tout en haut du fichier, dans l'objet `CONFIG` :

```js
var CONFIG = {
  ...
  social: {
    ...
    whatsappNumber: "8618516298726", // format international, sans + ni espace
  },
};
```

Tant que ce champ reste vide (`""`), le bouton « Contacter sur WhatsApp » et l'icône
WhatsApp du footer restent **masqués automatiquement** — aucun bouton mort n'est affiché.
Dès que vous renseignez le numéro, ils apparaissent tous les deux.

## 11. Ajouter les profils sociaux

Toujours dans `CONFIG.social`, en haut de `script.js` :

```js
social: {
  facebook: "https://facebook.com/VotrePage",
  x: "https://x.com/VotreCompte",
  instagram: "https://instagram.com/VotreCompte",
  tiktok: "https://www.tiktok.com/@VotreCompte",
  whatsappNumber: "",
},
```

Comme pour WhatsApp, un champ laissé vide masque automatiquement l'icône correspondante
(section Contact et footer). N'inventez jamais une URL : laissez vide tant que vous n'avez
pas le vrai lien.

## 12. Créer un compte EmailJS

1. Allez sur [emailjs.com](https://www.emailjs.com) et cliquez sur **Sign Up** (gratuit
   jusqu'à 200 emails/mois).
2. Confirmez votre adresse e-mail depuis le lien reçu.

## 13. Connecter Gmail à EmailJS

1. Dans le tableau de bord EmailJS, allez dans **Email Services > Add New Service**.
2. Choisissez **Gmail** dans la liste.
3. Cliquez sur **Connect Account** et autorisez EmailJS à envoyer des e-mails depuis votre
   compte Gmail (fenêtre de connexion Google standard).

## 14. Créer le service EmailJS

C'est l'étape précédente qui crée le service. Une fois connecté, EmailJS lui attribue un
identifiant du type `service_xxxxxxx` : c'est votre **Service ID** (section 16).

## 15. Créer le modèle d'e-mail

1. Allez dans **Email Templates > Create New Template**.
2. Donnez-lui un nom, par exemple `BYGL - Contact site`.
3. Dans le corps du modèle, utilisez les variables suivantes (elles correspondent
   exactement à ce que `script.js` envoie) :

```
Nom : {{nom}}
Entreprise : {{entreprise}}
E-mail : {{email}}
Téléphone : {{telephone}}
Pays : {{pays}}
Type de demande : {{type_demande}}

Message :
{{message}}

Date de la demande : {{date_demande}}
```

4. Dans les réglages du modèle (**Settings**), champ **To Email**, mettez votre propre
   adresse (celle qui doit recevoir les demandes).
5. Champ **Reply To**, mettez `{{reply_to}}` : cela vous permettra de répondre au visiteur
   d'un clic depuis votre boîte mail, sans copier son adresse manuellement.
6. Enregistrez : EmailJS attribue un identifiant `template_xxxxxxx`, votre **Template ID**.

## 16. Récupérer les identifiants EmailJS

Vous avez besoin de trois valeurs :

| Valeur | Où la trouver |
|---|---|
| **Public Key** | **Account > General** |
| **Service ID** | **Email Services**, sous le nom de votre service Gmail |
| **Template ID** | **Email Templates**, sous le nom de votre modèle |

## 17. Configurer script.js

Ouvrez `script.js` dans PyCharm, tout en haut du fichier, et remplacez les trois
placeholders par vos vraies valeurs :

```js
emailjs: {
  publicKey: "votre_public_key",
  serviceId: "service_xxxxxxx",
  templateId: "template_xxxxxxx",
},
```

Tant que ces valeurs commencent par `YOUR_`, le formulaire refuse d'envoyer et affiche un
message clair au lieu de faire semblant que ça a fonctionné.

**Sécurité :** la Public Key est faite pour être visible côté navigateur (ce n'est pas un
secret) — ne placez en revanche jamais de mot de passe Gmail ou de clé privée ici. Dans le
tableau de bord EmailJS, **Account > Security**, activez la liste blanche de domaines et
ajoutez votre domaine Vercel (`https://votre-projet.vercel.app`) ainsi que votre futur
domaine personnalisé, pour qu'aucun autre site ne puisse utiliser votre compte EmailJS. La
même page propose aussi un reCAPTCHA optionnel contre le spam automatisé, en complément du
champ piège (honeypot) déjà présent dans le formulaire.

## 18. Tester le formulaire

1. Ouvrez `index.html` avec Live Server (ou déployez d'abord sur Vercel, section 19).
2. Remplissez le formulaire de contact et cliquez sur **Envoyer ma demande**.
3. Le bouton doit passer en état « Envoi en cours… », puis :
   - le message de succès apparaît si EmailJS confirme l'envoi ;
   - un message d'erreur apparaît sinon, et vos informations saisies restent affichées.
4. Vérifiez la boîte e-mail configurée à l'étape 15 : le message doit y arriver avec
   « Répondre » pointant directement vers l'adresse du visiteur.

**Tant que vous n'avez pas terminé les sections 12 à 17, l'envoi ne peut pas fonctionner —
c'est normal et volontaire : le site ne doit jamais afficher un faux message de succès.**

## 19. Déployer sur GitHub et Vercel

```bash
git init
git add .
git commit -m "Site BYGL — EmailJS + réseaux sociaux"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/bygl.git
git push -u origin main
```

Sur [vercel.com](https://vercel.com) : **Add New > Project**, importez le dépôt GitHub.
Framework : **Other**, aucune commande de build, dossier racine par défaut. Vercel déploie
automatiquement à chaque `git push` sur `main`.

## 20. Connecter un domaine personnalisé

1. Dans le projet Vercel : **Settings > Domains > Add**, saisissez votre domaine.
2. Chez votre registrar, créez les enregistrements DNS indiqués par Vercel (en général un
   enregistrement `A` vers `76.76.21.21` pour la racine, et un `CNAME` vers
   `cname.vercel-dns.com` pour `www`).
3. Attendez la validation : le certificat HTTPS est généré automatiquement.
4. N'oubliez pas d'ajouter ce nouveau domaine dans la liste blanche EmailJS (section 17).

## 21. Résoudre les erreurs courantes

- **« Le formulaire n'est pas encore configuré (EmailJS) »** : les identifiants en haut de
  `script.js` contiennent encore `YOUR_...`. Suivez les sections 12 à 17.
- **Erreur 403 / « origin not allowed » côté EmailJS** : le domaine depuis lequel vous
  testez n'est pas dans la liste blanche (**Account > Security** sur EmailJS). Ajoutez-le,
  y compris `http://127.0.0.1` ou l'URL Live Server si vous testez en local.
- **L'e-mail n'arrive jamais mais aucune erreur ne s'affiche** : vérifiez le dossier spam,
  puis dans EmailJS le champ **To Email** du modèle (section 15).
- **Les icônes sociales ou le bouton WhatsApp restent invisibles** : c'est normal tant que
  les URL/le numéro correspondants sont vides dans `CONFIG.social` (`script.js`) — le site
  masque volontairement tout lien non configuré plutôt que d'afficher un bouton mort.
- **Le logo, la Terre ou le QR code ne s'affichent pas** : vérifiez que le nom du fichier
  dans `images/` correspond exactement (sensible à la casse sur GitHub/Vercel, contrairement
  à Windows).

---

**Avant de rendre le site public**, remplacez les coordonnées temporaires (e-mail,
téléphone) par les vraies, ajoutez votre QR code WeChat, vos profils sociaux réels et votre
numéro WhatsApp — le site les masque tant qu'ils ne sont pas renseignés.
