import { GoalEntity } from "./GoalEntity";
import { CardEntity } from "./CardEntity";
import { SubstitutionEntity } from "./SubstitutionEntity";
import { LineupEntity } from "./LineupEntity";
import { StatEntity } from "./StatEntity";

class MatchEntity {
  matchId: string;
  countryId: string;
  countryName: string;
  leagueId: string;
  leagueName: string;
  matchDate: string;
  matchStatus: string;
  matchTime: string;
  matchHometeamId: string;
  matchHometeamName: string;
  matchHometeamScore: string;
  matchAwayteamId: string;
  matchAwayteamName: string;
  matchAwayteamScore: string;
  matchHometeamHalftimeScore: string;
  matchAwayteamHalftimeScore: string;
  matchHometeamExtraScore: string;
  matchAwayteamExtraScore: string;
  matchHometeamPenaltyScore: string;
  matchAwayteamPenaltyScore: string;
  matchHometeamFtScore: string;
  matchAwayteamFtScore: string;
  matchHometeamSystem: string;
  matchAwayteamSystem: string;
  matchLive: string;
  matchRound: string;
  matchStadium: string;
  matchReferee: string;
  teamHomeBadge: string;
  teamAwayBadge: string;
  leagueLogo: string;
  countryLogo: string;
  leagueYear: string;
  fkStageKey: string;
  stageName: string;
  goals: GoalEntity[];
  cards: CardEntity[];
  substitutions: SubstitutionEntity;
  lineup: LineupEntity;
  statistics: StatEntity[];

  constructor(data: any) {
    this.matchId = data.match_id;
    this.countryId = data.country_id;
    this.matchId = data.match_id;
    this.countryId = data.country_id;
    this.countryName = data.country_name;
    this.leagueId = data.league_id;
    this.leagueName = data.league_name;
    this.matchDate = data.match_date;
    this.matchStatus = data.match_status;
    this.matchTime = data.match_time;
    this.matchHometeamId = data.match_hometeam_id;
    this.matchHometeamName = data.match_hometeam_name;
    this.matchHometeamScore = data.match_hometeam_score;
    this.matchAwayteamId = data.match_awayteam_id;
    this.matchAwayteamName = data.match_awayteam_name;
    this.matchAwayteamScore = data.match_awayteam_score;
    this.matchHometeamHalftimeScore = data.match_hometeam_halftime_score;
    this.matchAwayteamHalftimeScore = data.match_awayteam_halftime_score;
    this.matchHometeamExtraScore = data.match_hometeam_extra_score;
    this.matchAwayteamExtraScore = data.match_awayteam_extra_score;
    this.matchHometeamPenaltyScore = data.match_hometeam_penalty_score;
    this.matchAwayteamPenaltyScore = data.match_awayteam_penalty_score;
    this.matchHometeamFtScore = data.match_hometeam_ft_score;
    this.matchAwayteamFtScore = data.match_awayteam_ft_score;
    this.matchHometeamSystem = data.match_hometeam_system;
    this.matchAwayteamSystem = data.match_awayteam_system;
    this.matchLive = data.match_live;
    this.matchRound = data.match_round;
    this.matchStadium = data.match_stadium;
    this.matchReferee = data.match_referee;
    this.teamHomeBadge = data.team_home_badge;
    this.teamAwayBadge = data.team_away_badge;
    this.leagueLogo = data.league_logo;
    this.countryLogo = data.country_logo;
    this.leagueYear = data.league_year;
    this.fkStageKey = data.fk_stage_key;
    this.stageName = data.stage_name;
    this.goals = data.goals.map((goalData: any) => new GoalEntity(goalData));
    this.cards = data.cards.map((cardData: any) => new CardEntity(cardData));
    this.substitutions = new SubstitutionEntity(data.substitutions);
    this.lineup = new LineupEntity(data.lineup);
    this.statistics = data.statistics.map(
      (statData: any) => new StatEntity(statData)
    );
  }
}

export { MatchEntity };
