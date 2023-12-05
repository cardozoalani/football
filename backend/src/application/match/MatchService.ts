import { MatchRepositoryImpl } from "../../infrastructure/repositories/MatchRepositoryImpl";
import { MatchEntity } from "../../domains/match/MatchEntity";

class MatchService {
  private matchRepository: MatchRepositoryImpl;

  constructor() {
    this.matchRepository = new MatchRepositoryImpl();
  }

  async getMatchByTeamId(matchId: string): Promise<MatchEntity[] | null> {
    try {
      const match = await this.matchRepository.findMatchesTeamById(matchId);
      return match;
    } catch (error) {
      console.error("Error en MatchService:", error);
      throw new Error("Error en MatchService");
    }
  }
}

export default MatchService;
