class CardEntity {
  time: string;
  homeFault: string;
  card: string;
  awayFault: string;
  info: string;
  homePlayerId: string;
  awayPlayerId: string;
  scoreInfoTime: string;

  constructor(data: any) {
    this.time = data.time;
    this.homeFault = data.home_fault;
    this.card = data.card;
    this.awayFault = data.away_fault;
    this.info = data.info;
    this.homePlayerId = data.home_player_id;
    this.awayPlayerId = data.away_player_id;
    this.scoreInfoTime = data.score_info_time;
  }
}

export { CardEntity };