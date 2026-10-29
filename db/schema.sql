-- Pêche Express 1.0.12 — base de données du classement pour SUPABASE.
-- À exécuter UNE SEULE FOIS : Supabase > SQL Editor > New query > colle ce fichier > Run.
-- Les tables sont protégées : RLS activée SANS aucune règle, donc la clé publique (anon) de Supabase ne peut ni lire ni écrire dedans.
-- Seule la fonction « leaderboard » y accède (connexion serveur). C'est important : la colonne id est l'identifiant PRIVÉ des joueurs.
CREATE TABLE IF NOT EXISTS leaderboard_players (
  id UUID PRIMARY KEY,
  pseudo VARCHAR(16) NOT NULL DEFAULT 'Pêcheur',
  level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1 AND level <= 100000),
  xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0 AND xp < 5000000),
  total_fish BIGINT NOT NULL DEFAULT 0 CHECK (total_fish >= 0),
  biggest_fish_cm INTEGER NOT NULL DEFAULT 0 CHECK (biggest_fish_cm >= 0 AND biggest_fish_cm <= 1000),
  last_catch_at TIMESTAMPTZ,
  public_id UUID NOT NULL DEFAULT gen_random_uuid(),
  profile JSONB NOT NULL DEFAULT '{}'::jsonb,
  profile_updated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS leaderboard_players_public_id_idx ON leaderboard_players (public_id);
CREATE INDEX IF NOT EXISTS leaderboard_players_level_idx ON leaderboard_players (level DESC, total_fish DESC);
CREATE INDEX IF NOT EXISTS leaderboard_players_fish_idx ON leaderboard_players (total_fish DESC);
CREATE INDEX IF NOT EXISTS leaderboard_players_biggest_idx ON leaderboard_players (biggest_fish_cm DESC);

CREATE TABLE IF NOT EXISTS leaderboard_weekly (
  player_id UUID NOT NULL REFERENCES leaderboard_players(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  pseudo VARCHAR(16) NOT NULL DEFAULT 'Pêcheur',
  level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1 AND level <= 100000),
  fish_count INTEGER NOT NULL DEFAULT 0 CHECK (fish_count >= 0),
  biggest_fish_cm INTEGER NOT NULL DEFAULT 0 CHECK (biggest_fish_cm >= 0 AND biggest_fish_cm <= 1000),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (player_id, week_start)
);
CREATE INDEX IF NOT EXISTS leaderboard_weekly_week_level_idx ON leaderboard_weekly (week_start, level DESC, fish_count DESC);
CREATE INDEX IF NOT EXISTS leaderboard_weekly_week_fish_idx ON leaderboard_weekly (week_start, fish_count DESC);
CREATE INDEX IF NOT EXISTS leaderboard_weekly_week_biggest_idx ON leaderboard_weekly (week_start, biggest_fish_cm DESC);

-- Protection : aucune lecture/écriture directe via l'API de données de Supabase (PostgREST).
ALTER TABLE leaderboard_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_weekly ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE leaderboard_players FROM anon, authenticated;
REVOKE ALL ON TABLE leaderboard_weekly FROM anon, authenticated;
