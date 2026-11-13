# Pêche Express

Jeu de pêche web mobile, installable comme PWA. Le jeu fonctionne localement dans le navigateur ; le classement mondial utilise une fonction Supabase séparée.

## Démarrage local

Le projet est statique et ne nécessite pas de compilation ni de dépendances npm.

Depuis la racine du dépôt :

```bash
python3 -m http.server 8000
```

Ouvrir ensuite `http://localhost:8000`. Le service worker et l'installation PWA nécessitent un contexte sécurisé : HTTPS ou localhost.

## Vérifications

Node.js 20 ou supérieur est recommandé.

```bash
npm test
npm run test:skins
```

Les tests vérifient les 100 textures PNG embarquées, les dimensions attendues par le Canvas, les skins Canard en SVG, les 3 465 combinaisons d'équipement et la cohérence des numéros de version.

## Architecture

- `index.html` : structure de l'interface et chargement des scripts.
- `css/style.css` : styles de l'application.
- `js/game.js` : gameplay, progression, inventaire, sauvegarde locale et rendu Canvas.
- `js/sprites.js` : catalogue de 100 textures PNG embarquées dans `window.SPRITES`.
- `js/leaderboard.js` et `js/config.js` : classement et configuration Supabase.
- `js/changelog.js` et `changelog.json` : notes de version.
- `js/pwa.js` et `sw.js` : plein écran adaptatif, cache hors connexion et mises à jour PWA.
- `manifest.webmanifest` : métadonnées d'installation.
- `supabase/` et `db/` : fonction serveur, validation et schéma du classement.

Les skins `char_duck`, `boat_duck` et `rod_duck` sont dessinés en SVG dans `js/game.js`, puis chargés comme images Canvas. Les autres skins utilisent les textures PNG.

Voir aussi [la procédure de maintenance et de publication](docs/maintenance-et-publication.md) et [la recette de vérification des skins](docs/skins-et-recette.md).

## Publier une mise à jour

1. Incrémenter le même numéro de version dans `index.html`, `js/game.js` (`APP_VERSION`), `sw.js` (`VERSION`), `manifest.webmanifest` et `package.json`.
2. Ajouter une entrée en tête de `changelog.json` avec la version, la date et les nouveautés.
3. Exécuter `npm test`.
4. Ouvrir une PR et vérifier le workflow GitHub Actions.
5. Après déploiement HTTPS, le service worker détecte la nouvelle version. L'application affiche un bandeau ; le joueur choisit quand recharger. La progression locale reste dans `localStorage`.

Le bouton de mise à jour active le service worker en attente ; le rechargement se fait ensuite automatiquement. Les anciennes caches PWA sont nettoyées à l'activation du nouveau service worker.

## Documentation de maintenance

- [Matrice et recette des skins](docs/skins-et-recette.md)
- [Maintenance technique, modules et mises à jour PWA](docs/maintenance.md)

## Données et limites

- La progression du jeu est sauvegardée dans le stockage local du navigateur. Elle n'est pas une sauvegarde cloud multi-appareils.
- Le classement en ligne est distinct de la sauvegarde de progression.
- Les tests de sprites sont statiques : ils valident les références, les fichiers PNG, les dimensions et les combinaisons, mais ne remplacent pas un contrôle visuel dans les navigateurs mobiles.
