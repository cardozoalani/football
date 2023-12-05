import cron from "node-cron";
import { fetchTeamsAndSave } from "../api/fetchTeams";
import { fetchMatchesAndSave } from "../api/fetchMatches";

export function startFetchDataCron() {
  cron.schedule("0 0 * * *", async () => {
    try {
      await fetchTeamsAndSave();
      await fetchMatchesAndSave();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  });
}
