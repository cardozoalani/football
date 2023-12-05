import { TeamRepositoryImpl } from "../../infrastructure/repositories/TeamRepositoryImpl";

class TeamService {
  private teamRepository: TeamRepositoryImpl;

  constructor() {
    this.teamRepository = new TeamRepositoryImpl();
  }

  async getTeamById(teamId: string) {
    try {
      const team = await this.teamRepository.findById(teamId);
      return team;
    } catch (error) {
      console.error("Error in getTeamById in TeamService:", error);
      throw error;
    }
  }
  async getTeams() {
    try {
      const team = await this.teamRepository.find();
      return team;
    } catch (error) {
      console.error("Error in getTeamById in TeamService:", error);
      throw error;
    }
  }
}

export default TeamService;
