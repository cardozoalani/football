class GoalEntity {
  time: string;
  homeScorer: string;
  homeScorerId: string;
  homeAssist: string;
  homeAssistId: string;
  score: string;
  awayScorer: string;
  awayScorerId: string;
  awayAssist: string;
  awayAssistId: string;
  info: string;
  scoreInfoTime: string;

  constructor(data: any) {
    this.time = data.time;
    this.homeScorer = data.home_scorer;
    this.homeScorerId = data.home_scorer_id;
    this.homeAssist = data.home_assist;
    this.homeAssistId = data.home_assist_id;
    this.score = data.score;
    this.awayScorer = data.away_scorer;
    this.awayScorerId = data.away_scorer_id;
    this.awayAssist = data.away_assist;
    this.awayAssistId = data.away_assist_id;
    this.info = data.info;
    this.scoreInfoTime = data.score_info_time;
  }
}
export { GoalEntity };