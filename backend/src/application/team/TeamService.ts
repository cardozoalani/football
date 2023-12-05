import { TeamRepositoryImpl } from "../../infrastructure/repositories/TeamRepositoryImpl";

class TeamService {
  private teamRepository: TeamRepositoryImpl;

  constructor() {
    this.teamRepository = new TeamRepositoryImpl();
  }

  async getTeamById(teamId: string) {
    try {
      console.log("Calling getTeamById in TeamService");
      const team = await this.teamRepository.findById(teamId);
      console.log("Team retrieved:", team);
      return team;
    } catch (error) {
      console.error("Error in getTeamById in TeamService:", error);
      throw error;
    }
  }
}

export default TeamService;
