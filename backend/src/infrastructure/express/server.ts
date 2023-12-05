import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import TeamController from "../../presentation/controllers/TeamController";
import MatchController from "../../presentation/controllers/MatchController";
import TeamService from "../../application/team/TeamService";
import PlayersController from "../../presentation/controllers/PlayersController";
import PlayersService from "../../application/player/PlayersService";
import MatchService from "../../application/match/MatchService";

dotenv.config();

const app: Application = express();
app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.send({ status: "success", message: "Football API" });
});
const teamService = new TeamService();
const teamController = new TeamController(teamService);
app.get("/teams/:teamId", teamController.getTeamById);
app.get("/teams", teamController.getTeams);

const playersService = new PlayersService()
const playersController = new PlayersController(playersService);
app.get("/teams/:teamId/players", playersController.getPlayersTeamById);

const matchService = new MatchService();
const matchController = new MatchController(matchService);
app.get("/matches/:teamId/matches", matchController.getMatchByTeamId);

export { app };