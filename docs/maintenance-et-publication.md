# Maintenance et publication

## Cycle de mise à jour actuel

Le projet possède déjà un système de mise à jour PWA :

1. `js/pwa.js` enregistre `./sw.js` lorsque l'application est servie en HTTP(S).
2. Le navigateur installe le nouveau service worker en arrière-plan.
3. Lorsque le nouveau worker est en attente et qu'une ancienne version contrôle déjà la page, le bandeau de mise à jour est affiché.
4. Le bouton envoie `SKIP_WAITING` au worker en attente.
5. L'événement `controllerchange` recharge la page une seule fois.
6. Une vérification est aussi déclenchée au chargement, au retour au premier plan, à la reconnexion et périodiquement.

Le service worker pré-télécharge les ressources critiques avant d'activer la nouvelle version. S'il ne peut pas récupérer une ressource critique, son installation échoue et l'ancienne version reste active. Les fichiers sont servis depuis le cache pour permettre le mode hors connexion.

## Publier une version sans incohérence

À chaque publication, utiliser un seul numéro de version et l'aligner dans ces emplacements :

- `package.json` → `version`
- `index.html` → `<meta name="app-version">`
- `js/game.js` → `APP_VERSION`
- `sw.js` → `VERSION`
- `changelog.json` → première entrée du tableau

Le bandeau et la fenêtre des nouveautés lisent maintenant la version courante depuis la métadonnée HTML. La première entrée de `changelog.json` doit décrire la version publiée.

## Procédure conseillée

1. Créer une branche de maintenance.
2. Modifier le code et les tests.
3. Incrémenter les cinq références de version.
4. Ajouter les notes dans `changelog.json`.
5. Lancer `npm test`.
6. Vérifier les fichiers servis sur une prévisualisation HTTPS.
7. Tester une mise à jour depuis la version précédente, y compris avec une connexion lente et en mode hors ligne.
8. Ouvrir une pull request et fusionner après validation.

## Points de vigilance

- Ne pas appeler `skipWaiting()` automatiquement : le bouton laisse le joueur choisir le moment du rechargement.
- Ne pas supprimer l'ancien cache avant que le nouveau worker soit activé.
- Garder `CORE` et `SIG_FILES` dans `sw.js` cohérents avec les ressources réellement chargées.
- Lorsqu'un nouveau fichier JavaScript critique est ajouté, l'ajouter au cache critique et à la liste de signature.
- Après publication, contrôler les mises à jour sur une installation PWA existante : un simple rechargement dans un onglet neuf ne couvre pas tous les cas.
