import { Request, Response } from "express";
import TeamService from "../../application/team/TeamService";

class TeamController {
  private teamService: TeamService;

  constructor(teamService: TeamService) {
    this.teamService = teamService;
  }
  getTeamById = async (req: Request, res: Response) => {
    try {
      const { teamId } = req.params;
      const team = await this.teamService.getTeamById(teamId);

      if (team) {
        res.status(200).json(team);
      } else {
        res.status(404).json({ message: "Team not found" });
      }
    } catch (error) {
      console.error("Error obtaining team:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  getTeams = async (req: Request, res: Response) => {
    try {
      const teams = await this.teamService.getTeams();

      if (teams) {
        res.status(200).json(teams);
      } else {
        res.status(404).json({ message: "Teams not found" });
      }
    } catch (error) {
      console.error("Error obtaining team:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
}

export default TeamController;
