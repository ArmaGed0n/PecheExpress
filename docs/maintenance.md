# Maintenance technique

## Matrice des skins

Le jeu expose quatre catégories indépendantes :

| Catégorie | Skins |
|---|---:|
| Personnages | 5 |
| Bateaux | 11 |
| Cannes | 9 |
| Leurres | 7 |
| **Combinaisons possibles** | **3 465** |

Les combinaisons sont indépendantes : personnage × bateau × canne × leurre. Le test automatise le produit cartésien et vérifie qu'un rendu existe pour chaque élément.

### Textures

Le catalogue `js/sprites.js` contient 100 PNG encodés en data URI. Dimensions attendues par le moteur :

- Personnages PNG : 176 × 224.
- Bateaux PNG : 448 × 200.
- Cannes PNG : 512 × 112.

`boat_classic` est un alias de la texture `boat`.

### Skins Canard

Ces trois skins ne sont pas des PNG :

- `char_duck` : SVG intégré, rendu à 176 × 224.
- `boat_duck` : SVG intégré, rendu à 448 × 200.
- `rod_duck` : SVG intégré, rendu à 512 × 112.

`getSprite()` les charge comme des images afin de conserver le rendu Canvas commun. Le rendu vectoriel de secours reste disponible si une texture n'est pas encore chargée. Les tests actuels valident la présence du rendu et les dimensions déclarées, pas la qualité visuelle de chaque combinaison.

## Modules retirés

Les modules `js/home.js`, `js/mobile-ui.js` et `js/performance.js` n'étaient référencés ni par `index.html`, ni par le service worker, et leurs points d'entrée DOM (`home-screen`, `nav-bar`, `mobile-nav`) n'existaient pas dans la page. Leurs fonctions étaient donc inactives dans la version publiée ; ils ont été retirés plutôt que de laisser croire que ces fonctionnalités étaient disponibles.

## Mises à jour PWA

1. `js/pwa.js` enregistre `sw.js` sur HTTPS ou localhost.
2. Le service worker met les fichiers essentiels en cache pendant son installation.
3. Lorsqu'une nouvelle version est installée alors qu'une ancienne contrôle déjà la page, le bandeau de mise à jour apparaît.
4. Le joueur choisit « Mettre à jour » ; la page envoie `SKIP_WAITING`.
5. Le nouveau service worker prend le contrôle et la page se recharge une seule fois.
6. Le service worker supprime les anciens caches versionnés à l'activation.

Une vérification est déclenchée à l'ouverture, au retour dans l'application, au retour du réseau et toutes les heures lorsque la page est visible. L'installation initiale ne provoque pas de rechargement forcé.

Les notes du bandeau proviennent de `changelog.json`. La progression est conservée dans `localStorage` ; le rechargement ne doit pas effacer ces données.

## Contrôle de version

La version doit être identique dans cinq emplacements : métadonnée HTML, constante du jeu, constante du service worker, manifeste PWA et `package.json`. Le test de version échoue si l'un diverge.

## Contrôles non automatisés

Une vérification visuelle reste à faire dans au moins un navigateur Chromium et Safari iOS : trois skins Canard ensemble, chacun isolément, puis les mélanges Canard/classiques. Tester aussi le parcours de mise à jour sur une PWA déjà installée. Les tests Node ne simulent pas le navigateur ni le cycle de vie réel du service worker.
