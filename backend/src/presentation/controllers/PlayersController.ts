import { Request, Response } from "express";
import PlayersService from "../../application/player/PlayersService";

class PlayersController {
  private playersService: PlayersService;

  constructor(playersService: PlayersService) {
    this.playersService = playersService;
  }

  getPlayersTeamById = async (req: Request, res: Response) => {
    try {
      const { teamId } = req.params;
      const players = await this.playersService.getPlayersTeamById(teamId);

      if (players) {
        res.status(200).json(players);
      } else {
        res.status(404).json({ message: "Players not found" });
      }
    } catch (error) {
      console.error("Error getting players:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
}

export default PlayersController;
