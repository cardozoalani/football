import PlayerEntity from "./PlayerEntity";

export interface PlayersRepository {
  findPlayersTeamById(teamKey: string): Promise<PlayerEntity[] | null>;
}
