import { PlayersRepositoryImpl } from "../../infrastructure/repositories/PlayersRepositoryImpl";

class PlayersService {
  private teamRepository: PlayersRepositoryImpl;

  constructor() {
    this.teamRepository = new PlayersRepositoryImpl();
  }

  async getPlayersTeamById(teamId: string) {
    const team = await this.teamRepository.findPlayersTeamById(teamId);
    return team;
  }
}

export default PlayersService;
