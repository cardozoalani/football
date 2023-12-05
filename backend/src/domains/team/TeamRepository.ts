import { TeamApiResponse } from "./Team";
import TeamEntity from "./TeamEntity";

export interface TeamRepository {
  findById(teamKey: string): Promise<TeamEntity | null>;
  save(team: TeamApiResponse): Promise<void>;
}
