import axios from "axios";
import { TeamRepositoryImpl } from "../repositories/TeamRepositoryImpl";
import { createTables } from "../database/createTablesFunction";
import { TeamApiResponse } from "../../domains/team/Team";
import dotenv from "dotenv";
dotenv.config();
createTables();

const teamRepository = new TeamRepositoryImpl();

export async function fetchTeamsAndSave() {
  const apiKey = process.env.API_KEY;
  const apiUrl = `https://apiv3.apifootball.com/?action=get_teams&league_id=152&APIkey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const teams = response.data;

    for (const team of teams) {
      await saveTeamData(team);
    }

    console.log("Equipment data successfully saved in the database.");
  } catch (error) {
    console.error(`Error getting equipment: ${error}`);
  }
}

async function saveTeamData(teamData: TeamApiResponse) {
  try {
    await teamRepository.save(teamData);

    console.log(`Team data ${teamData.team_name} saved successfully.`);
  } catch (error) {
    console.error(`Error saving team data ${teamData.team_name}: ${error}`);
  }
}
