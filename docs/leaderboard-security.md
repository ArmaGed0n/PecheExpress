# Classement Supabase — sécurité et publication

## Configuration canonique

- L'URL publique existante est `/functions/v1/bright-api`.
- Le code source reste dans `supabase/functions/leaderboard/index.ts`.
- `supabase/config.toml` relie le slug `bright-api` à cet entrypoint via `entrypoint`.
- Ne pas déployer sous le slug `leaderboard` : cela créerait une deuxième URL et ne remplacerait pas le service utilisé par le jeu.
- Le projet configuré est `sczeztgjbzgefnwiysla`.

La fonction reste en `verify_jwt = false` pour conserver le mode sans compte. Cela signifie que son endpoint est public. CORS ne constitue pas une authentification et `ALLOWED_ORIGINS` n'empêche pas les appels directs hors navigateur.

## Protection ajoutée

- Le serveur ignore les niveaux et XP transmis par le navigateur.
- Le serveur valide le format de l'identifiant joueur, l'espèce, la taille entière et les limites propres à chaque espèce.
- Les paramètres de classement sont validés strictement.
- Le corps JSON est limité à 2 048 octets et les actions inconnues sont rejetées.
- Une capture par identifiant joueur est acceptée au maximum toutes les 3 secondes.
- Chaque événement client possède un identifiant stable. Le serveur conserve les 200 derniers identifiants dans la clé privée `__catch_ids` du JSONB de profil, ce qui évite de compter deux fois une capture renvoyée après une coupure réseau. Cette clé n'est pas exposée dans les profils publics et les mises à jour de profil la préservent.
- La file hors ligne valide ses éléments, conserve les identifiants d'événement et applique une temporisation progressive en cas d'erreur réseau.

## Limites connues

Le jeu n'utilise pas de compte authentifié. Un visiteur peut donc fabriquer un nouvel identifiant d'appareil et envoyer des captures qui respectent les plages autorisées. Le délai de 3 secondes et la validation des tailles ralentissent les abus mais ne prouvent pas qu'une capture a réellement eu lieu.

Le niveau du classement est volontairement indépendant de la progression locale du jeu : il attribue 25 XP de classement par capture validée. Le bonus local des poissons boss n'est pas repris, car le serveur ne peut pas vérifier un événement boss envoyé par un navigateur non fiable.

Pour un classement réellement résistant à la falsification, il faudra introduire une identité Supabase Auth et des règles de limitation par compte, puis faire valider les événements de jeu par une logique serveur. Ne jamais présenter le classement actuel comme inviolable.

## Tests

En local, avec Deno installé :

```sh
deno test supabase/functions/tests
deno check supabase/functions/leaderboard/index.ts
```

Le workflow GitHub Actions exécute ces deux commandes à chaque pull request touchant la fonction.

Les tests unitaires couvrent les identifiants, les espèces et tailles, le nettoyage du pseudo et les paramètres de lecture. Ils ne remplacent pas un test d'intégration contre une base de staging.

## Déploiement contrôlé

Après validation de la PR, déployer d'abord sur un projet Supabase de staging séparé. Utiliser explicitement sa référence :

```sh
supabase functions deploy bright-api --project-ref <STAGING_PROJECT_REF>
```

Le fichier de configuration contient actuellement la référence du projet de production comme valeur par défaut. Ne jamais lancer un déploiement sans `--project-ref`. Le déploiement de production, uniquement après validation et autorisation explicite, serait :

```sh
supabase functions deploy bright-api --project-ref sczeztgjbzgefnwiysla
```

Aucune migration de schéma n'est nécessaire pour cette correction. Aucune donnée existante n'est supprimée.

## Retour arrière

1. Identifier la version de code précédemment déployée et son commit Git.
2. Revenir à ce commit dans un environnement de travail séparé.
3. Redéployer le même slug `bright-api` depuis cette ancienne révision.
4. Vérifier le GET du classement, le profil et une capture de test.
5. Ne pas restaurer aveuglément les anciens droits SQL : les tables doivent rester inaccessibles directement à `anon` et `authenticated`.

Les identifiants d'événement privés ajoutés dans le JSONB sont ignorés par l'ancien code. Ils peuvent rester en place sans supprimer les profils. Aucun retour arrière de base de données n'est requis.
