import { Request, Response } from "express";
import MatchService from "../../application/match/MatchService";

class MatchController {
  private matchService: MatchService;
  constructor(matchService: MatchService) {
    this.matchService = matchService;
  }

  getMatchByTeamId = async (req: Request, res: Response) => {
    try {
      const { teamId } = req.params;
      const match = await this.matchService.getMatchByTeamId(teamId);

      if (match) {
        res.status(200).json(match);
      } else {
        res.status(404).json({ message: "Matches not found" });
      }
    } catch (error) {
      console.error("Error obtaining match:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
}

export default MatchController;
