import axios from "axios";
import { MatchRepositoryImpl } from "../repositories/MatchRepositoryImpl";
import { createTables } from "../database/createTablesFunction";
import { MatchApiResponse } from "../../domains/match/Match";
import dotenv from "dotenv";
dotenv.config();
createTables();

const matchRepository = new MatchRepositoryImpl();

export async function fetchMatchesAndSave() {
  const apiKey = process.env.API_KEY;
  const apiUrl = `https://apiv3.apifootball.com/?action=get_events&from=2023-04-02&to=2023-04-05&league_id=152&APIkey=${apiKey}`;
  
  try {
    const response = await axios.get(apiUrl);
    const matches = response.data;
    
    for (const match of matches) {
      await saveMatchData(match);
    }
    
    console.log("Game data successfully saved to the database.");
  } catch (error) {
    console.error(`Error getting games: ${error}`);
  }
}

async function saveMatchData(matchData: MatchApiResponse) {
  try {
    await matchRepository.save(matchData);

    console.log(`Game data ${matchData.match_id} saved successfully.`);
  } catch (error) {
    console.error(`Error saving game data ${matchData.match_id}: ${error}`);
  }
}
