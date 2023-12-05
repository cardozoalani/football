import { LineupPlayerEntity } from "./LineupPlayerEntity";

class LineupDetailEntity {
  startingLineups: LineupPlayerEntity[];
  substitutes: LineupPlayerEntity[];
  coach: LineupPlayerEntity[];
  missingPlayers: LineupPlayerEntity[];

  constructor(data: any) {
    this.startingLineups = data.starting_lineups.map(
      (playerData: any) => new LineupPlayerEntity(playerData)
    );
    this.substitutes = data.substitutes.map(
      (playerData: any) => new LineupPlayerEntity(playerData)
    );
    this.coach = data.coach.map(
      (playerData: any) => new LineupPlayerEntity(playerData)
    );
    this.missingPlayers = data.missing_players.map(
      (playerData: any) => new LineupPlayerEntity(playerData)
    );
  }
}

export { LineupDetailEntity };