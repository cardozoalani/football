export interface Team {
  team_key: string;
  team_name: string;
  team_country: string;
  team_founded: string;
  team_badge: string;
}

export interface Player {
  playerKey: number;
  playerId: string;
  playerImage: string;
  playerName: string;
  playerNumber: string;
  playerCountry: string;
  playerType: string;
  playerAge: string;
  playerMatchPlayed: string;
  playerGoals: string;
  playerYellowCards: string;
  playerRedCards: string;
  playerInjured: string;
  playerSubstituteOut: string;
  playerSubstitutesOnBench: string;
  playerAssists: string;
  playerBirthdate: string;
  playerIsCaptain: string;
  playerShotsTotal: string;
  playerGoalsConceded: string;
  playerFoulsCommitted: string;
  playerTackles: string;
  playerBlocks: string;
  playerCrossesTotal: string;
  playerInterceptions: string;
  playerClearances: string;
  playerDispossesed: string;
  playerSaves: string;
  playerInsideBoxSaves: string;
  playerDuelsTotal: string;
  playerDuelsWon: string;
  playerDribbleAttempts: string;
  playerDribbleSucc: string;
  playerPenComm: string;
  playerPenWon: string;
  playerPenScored: string;
  playerPenMissed: string;
  playerPasses: string;
  playerPassesAccuracy: string;
  playerKeyPasses: string;
  playerWoodworks: string;
  playerRating: string;
}

export interface Match {
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
  goals: Array<any>;
  cards: Array<{
    time: string;
    card: string;
    info: string;
  }>;
  substitutions: {
    home: Array<{
      time: string;
      substitution: string;
      substitutionPlayerId: string;
    }>;
    away: Array<any>;
  };
  lineup: {
    home: {
      startingLineups: Array<{
        playerKey: string;
        lineupPosition: string;
        lineupNumber: string;
        lineupPlayer: string;
      }>;
      substitutes: Array<{
        playerKey: string;
        lineupPosition: string;
        lineupNumber: string;
        lineupPlayer: string;
      }>;
      coach: Array<{
        playerKey: string;
        lineupPosition: string;
        lineupNumber: string;
        lineupPlayer: string;
      }>;
      missingPlayers: Array<any>;
    };
    away: {
      startingLineups: Array<{
        playerKey: string;
        lineupPosition: string;
        lineupNumber: string;
        lineupPlayer: string;
      }>;
      substitutes: Array<{
        playerKey: string;
        lineupPosition: string;
        lineupNumber: string;
        lineupPlayer: string;
      }>;
      coach: Array<{
        playerKey: string;
        lineupPosition: string;
        lineupNumber: string;
        lineupPlayer: string;
      }>;
      missingPlayers: Array<any>;
    };
  };
  statistics: Array<{
    type: string;
    home: string;
    away: string;
  }>;
}
