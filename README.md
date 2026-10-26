# Résilience

> **« Ouvrir un paquet de cartes ne vous procurera jamais autant de sensations. »**

**Résilience** est un projet indépendant d'expérience web interactive, en français, destiné à un public adulte (18+) issu notamment de la communauté BDSM/Kinky et aux couples ou groupes qui souhaitent construire ensemble une consigne à partir d'un tirage de cartes virtuelles. Son esthétique s'inspire des jeux de cartes à collectionner (TCG), avec une ouverture de booster immersive, des cartes illustrées et un jeton mystère.

> **Statut :** conception finalisée, développement à démarrer. Ce dépôt public contiendra le code et les ressources du projet, mais jamais de secrets de configuration.

## Concept

Chaque booster contient trois cartes, révélées dans l'ordre choisi par les participants :

1. **Nombre de coups** : une valeur de 1 à 10.
2. **Zone du corps** : choisie dans une liste prédéfinie excluant les zones sensibles.
3. **Accessoire** : choisi dans une liste prédéfinie, comprenant **« Sans accessoire »**.

Les trois cartes composent une proposition commune. Après leur révélation, un **jeton mystère** dévoile une courte phrase neutre indépendante des cartes. Il peut être relancé si les participants souhaitent une autre phrase. Les tirages sont aléatoires, les valeurs d'une même catégorie étant équiprobables. Les cartes n'ont pas de rareté, ne se modifient pas entre elles et ne comportent pas de règles d'incompatibilité.

**Le consentement prévaut toujours sur le tirage :** chacun peut refuser, adapter ou interrompre une proposition, sans justification. L'application n'impose ni rôle, ni durée, ni nombre de participants.

## Expérience utilisateur

- Écran d'accueil bref, avec slogan et bouton de démarrage.
- Avertissement 18+ et accès aux règles et informations de sécurité.
- Booster unique, centré et légèrement animé, ouvert par clic ou toucher.
- Animation de déchirure et apparition des trois cartes, puis du jeton ; séquence d'ouverture visée de 3 à 5 secondes.
- Cartes présentées en éventail, avec dos commun ; chaque carte s'agrandit, se retourne et revient face visible à sa place.
- Jeton accessible après révélation des trois cartes, avec rotation et effets lumineux.
- Récapitulatif final et possibilité d'ouvrir un nouveau booster, consulter l'historique ou quitter.
- Option pour passer les animations ; niveaux **complètes / réduites / désactivées**, ainsi qu'un réglage du son.
- Interface **mobile-first**, prioritairement en portrait, adaptée aussi aux tablettes et ordinateurs.

Le tirage en cours n'est pas repris après actualisation de la page. Les tirages terminés peuvent en revanche être enregistrés dans l'historique local et rejoués à l'identique depuis celui-ci, sans nouveau hasard.

## Direction artistique

- Ambiance sensuelle et immersive, palette **noir et rouge**, fond **galaxie**.
- Cartes de style TCG classique et booster à l'aspect métallisé premium.
- Animations spectaculaires, avec alternatives accessibles et respect de `prefers-reduced-motion`.
- Illustrations créées à l'aide de l'IA, harmonisées visuellement et stockées dans le projet par catégorie.
- **Style définitif des illustrations à choisir ultérieurement** à partir de références visuelles. Des visuels temporaires pourront être utilisés pendant le prototype.
- Images optimisées, notamment en formats modernes tels que WebP lorsque pertinent.

## Pile technique prévue

| Domaine | Choix |
| --- | --- |
| Interface | React + TypeScript |
| Outil de développement et compilation | Vite |
| Style | CSS personnalisé, avec utilitaires ou bibliothèque si utile |
| Animations | CSS et bibliothèque spécialisée (Motion pour React envisagée) |
| Données de jeu | Fichiers JSON versionnés |
| Tirage aléatoire | Côté navigateur |
| Historique et préférences | `localStorage` |
| Tests | Vitest et tests manuels multi-navigateurs |
| Versionnement | Git / GitHub, dépôt public |
| Hébergement | Vercel |
| Hors ligne | PWA et mise en cache des ressources essentielles, à mettre en place après stabilisation du parcours principal |

L'architecture sera modulaire pour séparer les données, les règles de tirage, les composants d'interface, les animations, les préférences et l'historique. L'ajout de contenu doit pouvoir se faire principalement en modifiant les fichiers JSON et les illustrations associées.

### Structure envisagée

La structure exacte pourra évoluer pendant l'initialisation du projet :

```text
resilience/
├── public/
│   └── images/
│       ├── cards/
│       ├── booster/
│       └── token/
├── src/
│   ├── components/
│   ├── features/
│   │   ├── booster/
│   │   ├── cards/
│   │   ├── token/
│   │   ├── history/
│   │   └── settings/
│   ├── data/
│   │   ├── hits.json
│   │   ├── body-zones.json
│   │   ├── accessories.json
│   │   └── token-phrases.json
│   ├── lib/
│   ├── styles/
│   └── main.tsx
├── api/                 # Fonction serveur Vercel pour les retours anonymes
├── tests/
└── README.md
```

Les cartes seront identifiées par un `id` stable et décrites, selon leur type, par des champs tels que `name`, `category`, `description`, `image` et `value`. Leur structure sera vérifiée automatiquement et leur contenu relu manuellement. Aucun champ de rareté n'est prévu.

## Confidentialité, sécurité et accessibilité

- Pas de compte utilisateur ni de stockage distant de l'historique de jeu.
- Conservation locale des **50 derniers tirages terminés**, du plus récent au plus ancien, avec date et heure.
- Préférences mémorisées localement ; suppression de l'historique avec confirmation, indépendamment des préférences.
- Explication claire des données stockées et choix d'une mesure d'audience respectueuse de la vie privée, sans cookies de suivi si la solution retenue le permet.
- Formulaire de contact séparé du formulaire de retours anonymes.
- Retours anonymes transmis via une **fonction serveur Vercel** vers un **webhook Discord privé** ; validation des entrées et limitation des abus à prévoir. L'URL du webhook et les autres secrets ne doivent **jamais** être exposés dans le code client, dans les commits ou dans le dépôt public.
- HTTPS, dépendances maintenues, en-têtes de sécurité et contrôles appropriés.
- Objectif d'accessibilité **WCAG AA** et prise en charge des navigateurs récents : Chrome, Safari, Firefox et Edge.
- Métadonnées SEO et de partage : titre, description, favicon, aperçu social et structure sémantique.

### Public adulte et consentement

Le projet s'adresse exclusivement aux personnes majeures. Un écran d'entrée permettra de confirmer sa majorité pour la session, d'entrer ou de quitter le site. Les règles et informations de sécurité resteront accessibles pendant l'utilisation. Les participants restent libres de refuser ou d'arrêter toute proposition.

**Avant une ouverture publique**, les obligations juridiques applicables devront être vérifiées, notamment celles relatives à l'accès des mineurs, au contenu diffusé, aux formulaires et au stockage local. Une simple déclaration de majorité ne garantit pas à elle seule la conformité. La première bêta sera privée et réservée à des adultes.

Les pages prévues comprennent les mentions légales, la politique de confidentialité, les règles, l'avertissement 18+ et les informations de sécurité.

## Feuille de route

L'objectif est de disposer rapidement d'un parcours jouable, puis d'atteindre une première version complète. Aucune date de livraison fixe n'est annoncée.

### Phase 1 — Prototype

- [ ] Initialiser React, TypeScript, Vite et le dépôt GitHub.
- [ ] Définir les types de données, les JSON initiaux et leur validation.
- [ ] Implémenter le tirage aléatoire et les règles de révélation.
- [ ] Construire le parcours accueil → booster → trois cartes → jeton → récapitulatif.
- [ ] Utiliser des illustrations temporaires en attendant le choix artistique définitif.

### Phase 2 — Version jouable

- [ ] Finaliser les interactions au clic/toucher et les animations.
- [ ] Ajouter le jeton relançable et les commandes de passage d'animation.
- [ ] Mettre en place l'historique local (50 tirages) et sa relecture à l'identique.
- [ ] Ajouter les préférences d'animation et de son, ainsi que la gestion des données locales.
- [ ] Intégrer les rappels de consentement et les écrans de règles/sécurité.
- [ ] Couvrir la logique essentielle par des tests Vitest.

### Phase 3 — Finitions et bêta privée

- [ ] Choisir et harmoniser le style final des illustrations ; compléter le premier jeu de cartes.
- [ ] Optimiser les médias, les performances, l'accessibilité et l'affichage mobile.
- [ ] Ajouter la PWA et préciser les fonctionnalités disponibles hors ligne.
- [ ] Intégrer les pages légales, le contact et le formulaire de retours anonymes sécurisé vers Discord.
- [ ] Effectuer des tests manuels sur les navigateurs et appareils ciblés.
- [ ] Ouvrir une bêta privée réservée à des adultes, recueillir les retours et corriger les problèmes.

### Phase 4 — Lancement public

- [ ] Vérifier les obligations juridiques applicables et adapter les mécanismes d'accès si nécessaire.
- [ ] Valider le contenu initial, les tests et l'absence de bugs bloquants.
- [ ] Déployer sur Vercel (sous-domaine Vercel dans un premier temps).
- [ ] Préparer, si souhaité, le domaine personnalisé, le logo et une identité visuelle enrichie.
- [ ] Maintenir le projet et ajouter progressivement de nouvelles cartes via JSON et illustrations.

Les versions seront identifiées simplement (`v1`, `v2`, `v3`, etc.).

## Démarrage du développement

Le dépôt ne contient pas encore nécessairement l'application. Une fois Vite initialisé, les commandes habituelles seront :

```bash
npm install
npm run dev
npm run build
npm run preview
```

La commande de test (`npm run test`) sera disponible après configuration de Vitest. Ne pas publier de fichier `.env` contenant des secrets ; utiliser les variables d'environnement de Vercel pour les fonctions serveur.

## Contribution et statut

Le dépôt est public, mais le projet reste indépendant. Les modalités de contribution et la licence seront précisées ultérieurement : **la mise à disposition du code sur GitHub n'accorde pas, à elle seule, une licence de réutilisation**.

---

*Résilience — projet en cours de développement. Réservé aux adultes ; le consentement et la sécurité priment sur toute consigne de jeu.*
