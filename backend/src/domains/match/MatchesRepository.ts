import { MatchApiResponse } from "./Match";
import { MatchEntity } from "./MatchEntity";

export interface MatchesRepository {
  save(team: MatchApiResponse): Promise<void>;
  findMatchesTeamById(teamKey: string): Promise<MatchEntity[] | null>;
}
