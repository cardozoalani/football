import pool from ".";

export async function createTables() {
  const client = await pool.connect();

  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS teams (
            team_key VARCHAR(255) PRIMARY KEY,
            team_name VARCHAR(255),
            team_country VARCHAR(255),
            team_founded VARCHAR(255),
            team_badge VARCHAR(255),
            CONSTRAINT unique_team_key UNIQUE (team_key)
        );

        CREATE TABLE IF NOT EXISTS venue (
            venue_id SERIAL PRIMARY KEY,
            team_key VARCHAR(255),
            venue_name VARCHAR(255),
            venue_address VARCHAR(255),
            venue_city VARCHAR(255),
            venue_capacity INTEGER,
            venue_surface VARCHAR(255),
            FOREIGN KEY (team_key) REFERENCES teams(team_key),
            CONSTRAINT unique_venue_key UNIQUE (team_key)
        );

        CREATE TABLE IF NOT EXISTS players (
            player_key SERIAL PRIMARY KEY,
            team_key VARCHAR(255),
            player_id VARCHAR(255) UNIQUE,
            player_image VARCHAR(255),
            player_name VARCHAR(255),
            player_number VARCHAR(255),
            player_country VARCHAR(255),
            player_type VARCHAR(255),
            player_age VARCHAR(255),
            player_match_played VARCHAR(255),
            player_goals VARCHAR(255),
            player_yellow_cards VARCHAR(255),
            player_red_cards VARCHAR(255),
            player_injured VARCHAR(255),
            player_substitute_out VARCHAR(255),
            player_substitutes_on_bench VARCHAR(255),
            player_assists VARCHAR(255),
            player_birthdate VARCHAR(255),
            player_is_captain VARCHAR(255),
            player_shots_total VARCHAR(255),
            player_goals_conceded VARCHAR(255),
            player_fouls_committed VARCHAR(255),
            player_tackles VARCHAR(255),
            player_blocks VARCHAR(255),
            player_crosses_total VARCHAR(255),
            player_interceptions VARCHAR(255),
            player_clearances VARCHAR(255),
            player_dispossesed VARCHAR(255),
            player_saves VARCHAR(255),
            player_inside_box_saves VARCHAR(255),
            player_duels_total VARCHAR(255),
            player_duels_won VARCHAR(255),
            player_dribble_attempts VARCHAR(255),
            player_dribble_succ VARCHAR(255),
            player_pen_comm VARCHAR(255),
            player_pen_won VARCHAR(255),
            player_pen_scored VARCHAR(255),
            player_pen_missed VARCHAR(255),
            player_passes VARCHAR(255),
            player_passes_accuracy VARCHAR(255),
            player_key_passes VARCHAR(255),
            player_woordworks VARCHAR(255),
            player_rating VARCHAR(255),
            FOREIGN KEY (team_key) REFERENCES teams(team_key)
        );

        CREATE TABLE IF NOT EXISTS coaches (
            coach_name VARCHAR(255),
            coach_country VARCHAR(255),
            coach_age VARCHAR(255),
            team_key VARCHAR(255) UNIQUE,
            FOREIGN KEY (team_key) REFERENCES teams(team_key)
        );

        CREATE TABLE IF NOT EXISTS matches (
            match_id VARCHAR(255) PRIMARY KEY,
            country_id VARCHAR(255),
            country_name VARCHAR(255),
            league_id VARCHAR(255),
            league_name VARCHAR(255),
            match_date DATE,
            match_status VARCHAR(255),
            match_time TIME,
            match_hometeam_id VARCHAR(255),
            match_hometeam_name VARCHAR(255),
            match_hometeam_score VARCHAR(255),
            match_awayteam_name VARCHAR(255),
            match_awayteam_id VARCHAR(255),
            match_awayteam_score VARCHAR(255),
            match_hometeam_halftime_score VARCHAR(255),
            match_awayteam_halftime_score VARCHAR(255),
            match_hometeam_extra_score VARCHAR(255),
            match_awayteam_extra_score VARCHAR(255),
            match_hometeam_penalty_score VARCHAR(255),
            match_awayteam_penalty_score VARCHAR(255),
            match_hometeam_ft_score VARCHAR(255),
            match_awayteam_ft_score VARCHAR(255),
            match_hometeam_system VARCHAR(255),
            match_awayteam_system VARCHAR(255),
            match_live VARCHAR(255),
            match_round VARCHAR(255),
            match_stadium VARCHAR(255),
            match_referee VARCHAR(255),
            team_home_badge VARCHAR(255),
            team_away_badge VARCHAR(255),
            league_logo VARCHAR(255),
            country_logo VARCHAR(255),
            league_year VARCHAR(255),
            fk_stage_key VARCHAR(255),
            stage_name VARCHAR(255),
            FOREIGN KEY (match_hometeam_id) REFERENCES teams(team_key),
            FOREIGN KEY (match_awayteam_id) REFERENCES teams(team_key)
        );

        CREATE TABLE IF NOT EXISTS goalscorer (
            match_id VARCHAR(255) UNIQUE,
            time VARCHAR(255),
            home_scorer VARCHAR(255),
            home_scorer_id VARCHAR(255),
            home_assist VARCHAR(255),
            home_assist_id VARCHAR(255),
            score VARCHAR(255),
            away_scorer VARCHAR(255),
            away_scorer_id VARCHAR(255),
            away_assist VARCHAR(255),
            away_assist_id VARCHAR(255),
            info VARCHAR(255),
            score_info_time VARCHAR(255),
            FOREIGN KEY (match_id) REFERENCES matches(match_id)
        );

        CREATE TABLE IF NOT EXISTS cards (
            match_id VARCHAR(255) UNIQUE,
            time VARCHAR(255),
            home_fault VARCHAR(255),
            card VARCHAR(255),
            away_fault VARCHAR(255),
            info VARCHAR(255),
            home_player_id VARCHAR(255),
            away_player_id VARCHAR(255),
            score_info_time VARCHAR(255),
            FOREIGN KEY (match_id) REFERENCES matches(match_id)
        );

        CREATE TABLE IF NOT EXISTS substitutions (
            match_id VARCHAR(255) UNIQUE,
            time VARCHAR(255),
            substitution VARCHAR(255),
            substitution_player_id VARCHAR(255),
            type VARCHAR(255),
            FOREIGN KEY (match_id) REFERENCES matches(match_id)
        );

        CREATE TABLE IF NOT EXISTS starting_lineups (
            lineup_id SERIAL PRIMARY KEY,
            match_id VARCHAR(255) REFERENCES matches(match_id),
            team_type VARCHAR(255) CHECK (team_type IN ('home', 'away')),
            lineup_player VARCHAR(255),
            lineup_number VARCHAR(255),
            lineup_position VARCHAR(255),
            player_key VARCHAR(255) UNIQUE
        );

        CREATE TABLE IF NOT EXISTS substitutes (
            substitute_id SERIAL PRIMARY KEY,
            match_id VARCHAR(255) REFERENCES matches(match_id),
            team_type VARCHAR(255) CHECK (team_type IN ('home', 'away')),
            lineup_player VARCHAR(255),
            lineup_number VARCHAR(255),
            lineup_position VARCHAR(255),
            player_key VARCHAR(255) UNIQUE
        );

        CREATE TABLE IF NOT EXISTS coaches_lineup (
            coach_id SERIAL PRIMARY KEY,
            match_id VARCHAR(255) REFERENCES matches(match_id),
            team_type VARCHAR(255) CHECK (team_type IN ('home', 'away')),
            lineup_player VARCHAR(255),
            lineup_number VARCHAR(255),
            lineup_position VARCHAR(255),
            player_key VARCHAR(255) UNIQUE
        );

        CREATE TABLE IF NOT EXISTS missing_players (
            missing_player_id SERIAL PRIMARY KEY,
            match_id VARCHAR(255) REFERENCES matches(match_id),
            team_type VARCHAR(255) CHECK (team_type IN ('home', 'away')),
            player_key VARCHAR(255) UNIQUE
        );

        CREATE TABLE IF NOT EXISTS statistics (
            match_id VARCHAR(255) UNIQUE,
            type VARCHAR(255),
            home VARCHAR(255),
            away VARCHAR(255),
            FOREIGN KEY (match_id) REFERENCES matches(match_id)
        );

        CREATE TABLE IF NOT EXISTS statistics_1half (
            match_id VARCHAR(255) UNIQUE,
            type VARCHAR(255),
            home VARCHAR(255),
            away VARCHAR(255),
            FOREIGN KEY (match_id) REFERENCES matches(match_id)
        );
        `);
  } finally {
    client.release();
  }
}
