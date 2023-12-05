import { QueryResult } from "pg";
import pool from "../database";
import PlayerEntity from "../../domains/player/PlayerEntity";
import { PlayersRepository } from "../../domains/player/PlayerRepository";

export class PlayersRepositoryImpl implements PlayersRepository {
  async findPlayersTeamById(teamId: string): Promise<PlayerEntity[] | null> {
    try {
      const playersQuery = {
        text: "SELECT * FROM players WHERE team_key = $1",
        values: [teamId],
      };
      const result: QueryResult = await pool.query(playersQuery);

      if (result.rows.length > 0) {
        const playersData = result.rows;
        const players = playersData.map(
          (playerData) => new PlayerEntity(playerData)
        );
        return players;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching players:", error);
      throw error;
    }
  }
}
