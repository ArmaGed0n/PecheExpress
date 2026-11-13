# Skins et recette visuelle

## Emplacements de skins

Le jeu compose indépendamment quatre éléments équipés : personnage, bateau, canne et leurre. Les trois éléments du thème Canard concernés par le rendu Canvas sont :

- `char_duck` — personnage / Capitaine Canard ;
- `boat_duck` — bateau / Bateau Canard ;
- `rod_duck` — canne / Canne Bec Doré.

Le leurre `lure_duck` est un élément distinct : il ne fait pas partie des trois SVG chargés par `duckSkinSvg()`.

## Règles de rendu

- `getSprite(id)` renvoie une texture déjà présente dans `window.SPRITES`, ou crée et met en cache une image SVG pour l'un des trois identifiants Canard.
- Le rendu principal utilise les images lorsque le bateau, le personnage et la canne sont chargés.
- Tant qu'une image n'est pas prête, le jeu utilise son rendu Canvas vectoriel de secours.
- L'aperçu d'inventaire attend le chargement des images SVG avant de dessiner la composition ; un rendu emoji de secours reste prévu après plusieurs tentatives.

## Matrice des huit combinaisons

Chaque colonne est indépendante. Tester chaque ligne dans le jeu, dans la scène de pêche ET dans l'aperçu d'inventaire.

| # | Personnage | Bateau | Canne |
|---:|---|---|---|
| 1 | Classique | Classique | Bois |
| 2 | Canard | Classique | Bois |
| 3 | Classique | Canard | Bois |
| 4 | Classique | Classique | Canard |
| 5 | Canard | Canard | Bois |
| 6 | Canard | Classique | Canard |
| 7 | Classique | Canard | Canard |
| 8 | Canard | Canard | Canard |

Ajouter ensuite des essais avec les variantes non-Canard (pirate, cyber, marin, bateaux spéciaux, cannes spéciales) pour repérer d'éventuelles régressions.

## Contrôles manuels à faire

- Le bateau, le personnage et la canne sont visibles ensemble.
- Aucun élément ne disparaît pendant le chargement des SVG.
- La canne se plie pendant la phase de combat et son extrémité reste attachée à la main.
- Le bateau reste à la bonne échelle et ne se déforme pas de façon inattendue.
- L'aperçu d'inventaire correspond aux éléments équipés.
- Changer de spot, ouvrir/fermer l'inventaire et recharger la page ne casse pas le rendu.
- Vérifier sur Chrome Android et Safari iOS, en orientation portrait et paysage.

## Portée des tests automatisés

`npm run test:skins` vérifie la présence des identifiants, le branchement de chargement SVG, les dimensions attendues et les chemins de rendu de secours dans le code. Ce contrôle est statique : il ne prouve pas le résultat graphique. La matrice ci-dessus doit encore être exécutée visuellement sur les navigateurs cibles.
