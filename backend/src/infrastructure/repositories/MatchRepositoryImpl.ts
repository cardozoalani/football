import pool from "../database";
import { MatchesRepository } from "../../domains/match/MatchesRepository";
import { MatchApiResponse } from "../../domains/match/Match";
import { MatchEntity } from "../../domains/match/MatchEntity";
import { QueryResult } from "pg";
import { StatEntity } from "../../domains/match/StatEntity";
import { GoalEntity } from "../../domains/match/GoalEntity";
import { CardEntity } from "../../domains/match/CardEntity";

export class MatchRepositoryImpl implements MatchesRepository {
  async save(match: MatchApiResponse): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const {
        match_id,
        country_id,
        country_name,
        league_id,
        league_name,
        match_date,
        match_status,
        match_time,
        match_hometeam_id,
        match_hometeam_name,
        match_hometeam_score,
        match_awayteam_name,
        match_awayteam_id,
        match_awayteam_score,
        match_hometeam_halftime_score,
        match_awayteam_halftime_score,
        match_hometeam_extra_score,
        match_awayteam_extra_score,
        match_hometeam_penalty_score,
        match_awayteam_penalty_score,
        match_hometeam_ft_score,
        match_awayteam_ft_score,
        match_hometeam_system,
        match_awayteam_system,
        match_live,
        match_round,
        match_stadium,
        match_referee,
        team_home_badge,
        team_away_badge,
        league_logo,
        country_logo,
        league_year,
        fk_stage_key,
        stage_name,
        goalscorer,
        cards,
        substitutions,
        lineup,
        statistics,
        statistics_1half,
      } = match;
      const insertMatchQuery = {
        text: `
          INSERT INTO matches(match_id,
              country_id,
              country_name,
              league_id,
              league_name,
              match_date,
              match_status,
              match_time,
              match_hometeam_id,
              match_hometeam_name,
              match_hometeam_score,
              match_awayteam_name,
              match_awayteam_id,
              match_awayteam_score,
              match_hometeam_halftime_score,
              match_awayteam_halftime_score,
              match_hometeam_extra_score,
              match_awayteam_extra_score,
              match_hometeam_penalty_score,
              match_awayteam_penalty_score,
              match_hometeam_ft_score,
              match_awayteam_ft_score,
              match_hometeam_system,
              match_awayteam_system,
              match_live,
              match_round,
              match_stadium,
              match_referee,
              team_home_badge,
              team_away_badge,
              league_logo,
              country_logo,
              league_year,
              fk_stage_key,
              stage_name)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35)
          ON CONFLICT(match_id) DO NOTHING;
        `,
        values: [
          match_id,
          country_id,
          country_name,
          league_id,
          league_name,
          match_date,
          match_status,
          match_time,
          match_hometeam_id,
          match_hometeam_name,
          match_hometeam_score,
          match_awayteam_name,
          match_awayteam_id,
          match_awayteam_score,
          match_hometeam_halftime_score,
          match_awayteam_halftime_score,
          match_hometeam_extra_score,
          match_awayteam_extra_score,
          match_hometeam_penalty_score,
          match_awayteam_penalty_score,
          match_hometeam_ft_score,
          match_awayteam_ft_score,
          match_hometeam_system,
          match_awayteam_system,
          match_live,
          match_round,
          match_stadium,
          match_referee,
          team_home_badge,
          team_away_badge,
          league_logo,
          country_logo,
          league_year,
          fk_stage_key,
          stage_name,
        ],
      };
      await client.query(insertMatchQuery);

      for (const goal of goalscorer) {
        const insertGoalscorerQuery = {
          text: `INSERT INTO goalscorer(
          match_id,
          time,
          home_scorer,
          home_scorer_id,
          home_assist,
          home_assist_id,
          score,
          away_scorer,
          away_scorer_id,
          away_assist,
          away_assist_id,
          info,
          score_info_time
          ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) ON CONFLICT(match_id) DO NOTHING;`,
          values: [
            match_id,
            goal.time,
            goal.home_scorer,
            goal.home_scorer_id,
            goal.home_assist,
            goal.home_assist_id,
            goal.score,
            goal.away_scorer,
            goal.away_scorer_id,
            goal.away_assist,
            goal.away_assist_id,
            goal.info,
            goal.score_info_time,
          ],
        };

        await client.query(insertGoalscorerQuery);
      }

      for (const card of cards) {
        const insertCardsQuery = {
          text: `INSERT INTO cards(
            match_id,
            time,
            home_fault,
            card,
            away_fault,
            info,
            home_player_id,
            away_player_id,
            score_info_time
          ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT(match_id) DO NOTHING;`,
          values: [
            match_id,
            card.time,
            card.home_fault,
            card.card,
            card.away_fault,
            card.info,
            card.home_player_id,
            card.away_player_id,
            card.score_info_time,
          ],
        };

        await client.query(insertCardsQuery);
      }

      for (const substitution of substitutions.home) {
        const insertSubstitutionsQuery = {
          text: `INSERT INTO substitutions(match_id, time, substitution, substitution_player_id, type) VALUES($1, $2, $3, $4, 'home') ON CONFLICT(match_id) DO NOTHING;`,
          values: [
            match.match_id,
            substitution.time,
            substitution.substitution,
            substitution.substitution_player_id,
          ],
        };

        await client.query(insertSubstitutionsQuery);
      }

      for (const substitution of substitutions.away) {
        const insertSubstitutionsQuery = {
          text: `INSERT INTO substitutions(match_id, time, substitution, substitution_player_id, type) VALUES($1, $2, $3, $4, 'away') ON CONFLICT(match_id) DO NOTHING;`,
          values: [
            match.match_id,
            substitution.time,
            substitution.substitution,
            substitution.substitution_player_id,
          ],
        };

        await client.query(insertSubstitutionsQuery);
      }
      const { home, away } = lineup;

      for (const startingLineup of home.starting_lineups) {
        const insertStartingLineupQuery = {
          text: `
            INSERT INTO starting_lineups(match_id, team_type, lineup_player, lineup_number, lineup_position, player_key)
            VALUES($1, $2, $3, $4, $5, $6)
            ON CONFLICT(player_key) DO NOTHING;
          `,
          values: [
            match_id,
            "home",
            startingLineup.lineup_player,
            startingLineup.lineup_number,
            startingLineup.lineup_position,
            startingLineup.player_key,
          ],
        };

        await client.query(insertStartingLineupQuery);
      }

      for (const substitute of home.substitutes) {
        const insertSubstituteQuery = {
          text: `
          INSERT INTO substitutes(match_id, team_type, lineup_player, lineup_number, lineup_position, player_key)
          VALUES($1, $2, $3, $4, $5, $6)
          ON CONFLICT(player_key) DO NOTHING;
        `,
          values: [
            match_id,
            "home",
            substitute.lineup_player,
            substitute.lineup_number,
            substitute.lineup_position,
            substitute.player_key,
          ],
        };

        await client.query(insertSubstituteQuery);
      }

      for (const coach of home.coach) {
        const insertCoachQuery = {
          text: `
          INSERT INTO coaches_lineup(match_id, team_type, lineup_player, lineup_number, lineup_position, player_key)
          VALUES($1, $2, $3, $4, $5, $6)
          ON CONFLICT(player_key) DO NOTHING;
        `,
          values: [
            match_id,
            "home",
            coach.lineup_player,
            coach.lineup_number,
            coach.lineup_position,
            coach.player_key,
          ],
        };

        await client.query(insertCoachQuery);
      }

      for (const playerKey of home.missing_players) {
        const insertMissingPlayerQuery = {
          text: `
          INSERT INTO missing_players(match_id, team_type, player_key)
          VALUES($1, $2, $3)
          ON CONFLICT(player_key) DO NOTHING;
        `,
          values: [match_id, "home", playerKey],
        };

        await client.query(insertMissingPlayerQuery);
      }

      for (const startingLineup of away.starting_lineups) {
        const insertStartingLineupQuery = {
          text: `
            INSERT INTO starting_lineups(match_id, team_type, lineup_player, lineup_number, lineup_position, player_key)
            VALUES($1, $2, $3, $4, $5, $6)
            ON CONFLICT(player_key) DO NOTHING;
          `,
          values: [
            match_id,
            "away",
            startingLineup.lineup_player,
            startingLineup.lineup_number,
            startingLineup.lineup_position,
            startingLineup.player_key,
          ],
        };

        await client.query(insertStartingLineupQuery);
      }

      for (const substitute of away.substitutes) {
        const insertSubstituteQuery = {
          text: `
          INSERT INTO substitutes(match_id, team_type, lineup_player, lineup_number, lineup_position, player_key)
          VALUES($1, $2, $3, $4, $5, $6)
          ON CONFLICT(player_key) DO NOTHING;
        `,
          values: [
            match_id,
            "away",
            substitute.lineup_player,
            substitute.lineup_number,
            substitute.lineup_position,
            substitute.player_key,
          ],
        };

        await client.query(insertSubstituteQuery);
      }

      for (const coach of away.coach) {
        const insertCoachQuery = {
          text: `
          INSERT INTO coaches_lineup(match_id, team_type, lineup_player, lineup_number, lineup_position, player_key)
          VALUES($1, $2, $3, $4, $5, $6)
          ON CONFLICT(player_key) DO NOTHING;
        `,
          values: [
            match_id,
            "away",
            coach.lineup_player,
            coach.lineup_number,
            coach.lineup_position,
            coach.player_key,
          ],
        };

        await client.query(insertCoachQuery);
      }

      for (const playerKey of away.missing_players) {
        const insertMissingPlayerQuery = {
          text: `
          INSERT INTO missing_players(match_id, team_type, player_key)
          VALUES($1, $2, $3)
          ON CONFLICT(player_key) DO NOTHING;
        `,
          values: [match_id, "home", playerKey],
        };

        await client.query(insertMissingPlayerQuery);
      }

      for (const stat of statistics) {
        const insertStatisticsQuery = {
          text: `INSERT INTO statistics(match_id, type, home, away) VALUES($1, $2, $3, $4) ON CONFLICT(match_id) DO NOTHING;`,
          values: [match_id, stat.type, stat.home, stat.away],
        };

        await client.query(insertStatisticsQuery);
      }

      for (const stat of statistics_1half) {
        const insertStatistics1HalfQuery = {
          text: `INSERT INTO statistics_1half(match_id, type, home, away) VALUES($1, $2, $3, $4) ON CONFLICT(match_id) DO NOTHING;`,
          values: [match_id, stat.type, stat.home, stat.away],
        };

        await client.query(insertStatistics1HalfQuery);
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error saving match:", error);
      throw error;
    } finally {
      client.release();
    }
  }
  async findMatchesTeamById(teamId: string): Promise<MatchEntity[] | null> {
    try {
      const matchesQuery = {
        text: "SELECT * FROM matches WHERE match_hometeam_id = $1 OR match_awayteam_id = $1",
        values: [teamId],
      };
      const result: QueryResult = await pool.query(matchesQuery);

      if (result.rows.length > 0) {
        const matchesData = result.rows;
        const matches: MatchEntity[] = [];
        for (const matchData of matchesData) {
          const matchId = matchData.match_id;
          const matchEntities = await this.getMatchData(matchId);
          console.log(matchEntities, "matchEntities");
          console.log(matchEntities?.lineup, "matchEntities?.lineup");
          console.log(matchEntities?.lineup.home, "matchEntities?.lineup.home");
          if (matchEntities) matches.push(new MatchEntity(matchEntities));
        }

        return matches;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw error;
    }
  }

  private async getMatchData(matchId: string): Promise<MatchEntity|null> {
    const matchDataQuery = {
      text: `SELECT * FROM matches WHERE match_id = $1`,
      values: [matchId],
    };
    const match: QueryResult = await pool.query(matchDataQuery);

    const statistics1halfDataQuery = {
      text: `SELECT * FROM statistics_1half WHERE match_id = $1`,
      values: [matchId],
    };
    const statistics1halfDataResult: QueryResult = await pool.query(
      statistics1halfDataQuery
    );

    const goalsDataQuery = {
      text: `SELECT * FROM goalscorer WHERE match_id = $1`,
      values: [matchId],
    };
    const goalsDataResult: QueryResult = await pool.query(goalsDataQuery);

    const substitutionsDataQuery = {
      text: `SELECT * FROM substitutions WHERE match_id = $1`,
      values: [matchId],
    };
    const substitutionsDataResult: QueryResult = await pool.query(
      substitutionsDataQuery
    );

    const cardsDataQuery = {
      text: `SELECT * FROM cards WHERE match_id = $1`,
      values: [matchId],
    };
    const cardsDataResult: QueryResult = await pool.query(cardsDataQuery);

    const startingLineupsDataQuery = {
      text: `SELECT * FROM starting_lineups WHERE match_id = $1`,
      values: [matchId],
    };
    const startingLineupsDataResult: QueryResult = await pool.query(
      startingLineupsDataQuery
    );
    const substitutesDataQuery = {
      text: `SELECT * FROM substitutes WHERE match_id = $1`,
      values: [matchId],
    };
    const substitutesDataResult: QueryResult = await pool.query(
      substitutesDataQuery
    );
    const coachesLineupDataQuery = {
      text: `SELECT * FROM coaches_lineup WHERE match_id = $1`,
      values: [matchId],
    };
    const coachesLineupDataResult: QueryResult = await pool.query(
      coachesLineupDataQuery
    );
    const missingPlayersDataQuery = {
      text: `SELECT * FROM missing_players WHERE match_id = $1`,
      values: [matchId],
    };
    const missingPlayersDataResult: QueryResult = await pool.query(
      missingPlayersDataQuery
    );
    match.rows[0].statistics = statistics1halfDataResult.rows.map(
      (stat) => new StatEntity(stat)
    );
    match.rows[0].goals = goalsDataResult.rows.map(
      (goal) => new GoalEntity(goal)
    );
    match.rows[0].cards = cardsDataResult.rows.map(
      (card) => new CardEntity(card)
    );
    match.rows[0].substitutions = {
      home: [],
      away: [],
    };
    match.rows[0].lineup = {
      home: {
        starting_lineups: [],
        substitutes: [],
        coach: [],
        missing_players: [],
      },
      away: {
        starting_lineups: [],
        substitutes: [],
        coach: [],
        missing_players: [],
      },
    };

    match.rows[0].lineup.home.starting_lineups =
      startingLineupsDataResult.rows.filter(
        (line) => line.team_type === "home"
      );
    match.rows[0].lineup.away.starting_lineups =
      startingLineupsDataResult.rows.filter(
        (line) => line.team_type === "away"
      );

    match.rows[0].lineup.home.substitutes = substitutesDataResult.rows.filter(
      (line) => line.team_type === "home"
    );
    match.rows[0].lineup.away.substitutes = substitutesDataResult.rows.filter(
      (line) => line.team_type === "away"
    );
    match.rows[0].lineup.home.coach = coachesLineupDataResult.rows.filter(
      (line) => line.team_type === "home"
    );
    match.rows[0].lineup.away.coach = coachesLineupDataResult.rows.filter(
      (line) => line.team_type === "away"
    );
    match.rows[0].lineup.home.missing_players =
      missingPlayersDataResult.rows.filter((line) => line.team_type === "home");
    match.rows[0].lineup.away.missing_players =
      missingPlayersDataResult.rows.filter((line) => line.team_type === "away");

    match.rows[0].substitutions.home = substitutionsDataResult.rows
      .filter((sub) => sub.type === "home")
      .map((subHome) => (subHome));
    match.rows[0].substitutions.away = substitutionsDataResult.rows
      .filter((sub) => sub.type === "away")
      .map((subAway) => (subAway));

    if (match.rows.length > 0) {
      return match.rows[0];
    } else {
      return null;
    }
  }
}
