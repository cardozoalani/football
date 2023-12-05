import { QueryResult } from "pg";
import pool from "../database";
import TeamEntity from "../../domains/team/TeamEntity";
import { TeamRepository } from "../../domains/team/TeamRepository";
import { TeamApiResponse } from "../../domains/team/Team";

export class TeamRepositoryImpl implements TeamRepository {
  async findById(teamId: string): Promise<TeamEntity | null> {
    try {
      const query = {
        text: `
        SELECT * FROM teams
        LEFT JOIN venue ON teams.team_key = venue.team_key
        WHERE teams.team_key = $1;
      `,
        values: [teamId],
      };

      const result: QueryResult = await pool.query(query);

      if (result.rows.length > 0) {
        const teamData = result.rows[0];
        teamData.venue = {
          venue_name: teamData.venue_name,
          venue_address: teamData.venue_address,
          venue_city: teamData.venue_city,
          venue_capacity: teamData.venue_capacity,
          venue_surface: teamData.venue_surface,
        };
        const playersQuery = {
          text: "SELECT * FROM players WHERE team_key = $1",
          values: [teamId],
        };
        const playersResult: QueryResult = await pool.query(playersQuery);
        teamData.players = playersResult.rows;
        const coachesQuery = {
          text: "SELECT * FROM coaches WHERE team_key = $1",
          values: [teamId],
        };
        const coachesResult: QueryResult = await pool.query(coachesQuery);
        teamData.coaches = coachesResult.rows;
        const team = new TeamEntity(teamData);

        return team;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching team:", error);
      throw error;
    }
  }
  async save(team: TeamApiResponse): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const {
        team_key,
        team_name,
        team_country,
        team_founded,
        team_badge,
        venue,
        players,
        coaches,
      } = team;

      const insertTeamQuery = {
        text: `
          INSERT INTO teams(team_key, team_name, team_country, team_founded, team_badge)
          VALUES($1, $2, $3, $4, $5)
          ON CONFLICT(team_key) DO NOTHING;
        `,
        values: [team_key, team_name, team_country, team_founded, team_badge],
      };

      await client.query(insertTeamQuery);

      const insertVenueQuery = {
        text: `
          INSERT INTO venue(venue_name, venue_address, venue_city, venue_capacity, venue_surface, team_key)
          VALUES($1, $2, $3, $4, $5, $6)
          ON CONFLICT(team_key) DO NOTHING;
        `,
        values: [
          venue.venue_name,
          venue.venue_address,
          venue.venue_city,
          venue.venue_capacity,
          venue.venue_surface,
          team_key,
        ],
      };

      await client.query(insertVenueQuery);

      for (const player of players) {
        const insertPlayerQuery = {
          text: `
            INSERT INTO players(
              team_key, player_id, player_image, player_name, player_number,
              player_country, player_type, player_age, player_match_played,
              player_goals, player_yellow_cards, player_red_cards, player_injured,
              player_substitute_out, player_substitutes_on_bench, player_assists,
              player_birthdate, player_is_captain, player_shots_total,
              player_goals_conceded, player_fouls_committed, player_tackles,
              player_blocks, player_crosses_total, player_interceptions,
              player_clearances, player_dispossesed, player_saves,
              player_inside_box_saves, player_duels_total, player_duels_won,
              player_dribble_attempts, player_dribble_succ, player_pen_comm,
              player_pen_won, player_pen_scored, player_pen_missed, player_passes,
              player_passes_accuracy, player_key_passes, player_woordworks, player_rating
            )
            VALUES(
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
              $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
              $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42
            )
            ON CONFLICT(player_id) DO NOTHING;
          `,
          values: [
            team_key,
            player.player_id,
            player.player_image,
            player.player_name,
            player.player_number,
            player.player_country,
            player.player_type,
            player.player_age,
            player.player_match_played,
            player.player_goals,
            player.player_yellow_cards,
            player.player_red_cards,
            player.player_injured,
            player.player_substitute_out,
            player.player_substitutes_on_bench,
            player.player_assists,
            player.player_birthdate,
            player.player_is_captain,
            player.player_shots_total,
            player.player_goals_conceded,
            player.player_fouls_committed,
            player.player_tackles,
            player.player_blocks,
            player.player_crosses_total,
            player.player_interceptions,
            player.player_clearances,
            player.player_dispossesed,
            player.player_saves,
            player.player_inside_box_saves,
            player.player_duels_total,
            player.player_duels_won,
            player.player_dribble_attempts,
            player.player_dribble_succ,
            player.player_pen_comm,
            player.player_pen_won,
            player.player_pen_scored,
            player.player_pen_missed,
            player.player_passes,
            player.player_passes_accuracy,
            player.player_key_passes,
            player.player_woordworks,
            player.player_rating,
          ],
        };
        await client.query(insertPlayerQuery);
      }

      for (const coach of coaches) {
        const insertCoachQuery = {
          text: `
            INSERT INTO coaches(coach_name, coach_country, coach_age, team_key)
            VALUES($1, $2, $3, $4)
            ON CONFLICT(team_key) DO NOTHING;
          `,
          values: [
            coach.coach_name,
            coach.coach_country,
            coach.coach_age,
            team_key,
          ],
        };
        await client.query(insertCoachQuery);
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error saving team:", error);
      throw error;
    } finally {
      client.release();
    }
  }
  async find(): Promise<TeamEntity[] | null> {
    try {
      const query = {
        text: `SELECT * FROM teams`,
      };

      const result: QueryResult = await pool.query(query);

      if (result.rows.length > 0) {
        const teams = result.rows;
        return teams;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching team:", error);
      throw error;
    }
  }
}
