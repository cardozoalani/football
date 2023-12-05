class LineupPlayerEntity {
  playerKey: string;
  lineupPosition: string;
  lineupNumber: string;
  lineupPlayer: string;

  constructor(data: any) {
    this.playerKey = data.player_key;
    this.lineupPosition = data.lineup_position;
    this.lineupNumber = data.lineup_number;
    this.lineupPlayer = data.lineup_player;
  }
}

export { LineupPlayerEntity };