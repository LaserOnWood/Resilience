# Installation — Phase 1 de Résilience

Cette archive est un **ajout** au dépôt existant : elle ne contient ni `README.md` ni `LICENSE`. Conserver ces fichiers existants.

## Prérequis
- Git et Node.js 22.12+ (ou une version LTS compatible avec Vite 7), npm.
- Accès en écriture au dépôt GitHub.

## Installation dans le dépôt existant

```bash
git clone https://github.com/LaserOnWood/Resilience.git
cd Resilience
```

Décompresser le ZIP et **copier son contenu** dans ce dossier `Resilience` (pas dans un sous-dossier `resilience-phase1`). Ne pas remplacer `README.md` ni `LICENSE`.

```bash
npm install
npm run typecheck
npm run test
npm run build
npm run dev
```

Ouvrir l'URL locale affichée par Vite (habituellement http://localhost:5173).

## Premier envoi GitHub

```bash
git status
git add .
git commit -m "feat: initialiser le prototype React de Résilience"
git push origin main
```

Vérifier que `node_modules`, `dist` et les éventuels `.env` ne sont pas inclus. Le `package-lock.json` généré par `npm install` doit, lui, être versionné.

## Déploiement Vercel
1. Vercel > Add New > Project > importer `LaserOnWood/Resilience`.
2. Framework : Vite ; Build Command : `npm run build` ; Output Directory : `dist`.
3. Déployer. Aucun secret n'est requis en phase 1.
4. Conserver l'URL de prévisualisation privée : l'écran de majorité actuel est un avertissement provisoire, pas une vérification réglementaire d'âge. Ne pas promouvoir comme lancement public.

## Portée de cette livraison
Parcours prototype : majorité de session → accueil → règles → booster → trois cartes révélées librement → jeton relançable → récapitulatif. JSON et tests initiaux inclus. Pas encore d'historique persistant, de formulaire Discord, de PWA ni d'illustrations définitives.

## Attention
Le dépôt contient déjà une licence MIT. Le README actuel indique à tort que la licence reste à préciser : corriger cette phrase ultérieurement si souhaité. Les zones et accessoires JSON sont des exemples temporaires à relire avant la bêta.
