import { app } from "./infrastructure/express/server";
import { startFetchDataCron } from "./infrastructure/cron/fetchDataCron.ts";
import dotenv from "dotenv";
import { fetchTeamsAndSave } from "./infrastructure/api/fetchTeams";
import { fetchMatchesAndSave } from "./infrastructure/api/fetchMatches";
dotenv.config();
const start = async () => {
  console.log("Starting application...\n");
  if (!process.env.DB_USER) {
    throw new Error("DB_USER must be defined");
  }
  if (!process.env.DB_HOST) {
    throw new Error("DB_HOST must be defined");
  }
  if (!process.env.DB_NAME) {
    throw new Error("DB_NAME must be defined");
  }
  if (!process.env.DB_PASSWORD) {
    throw new Error("DB_PASSWORD must be defined");
  }
  if (!process.env.DB_PORT) {
    throw new Error("DB_PORT must be defined");
  }
  if (!process.env.API_KEY) {
    throw new Error("API_KEY must be defined");
  }

  try {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Listening on port number ${process.env.PORT || 3000}`);
    });
    await fetchTeamsAndSave();
    await fetchMatchesAndSave();
    startFetchDataCron();
  } catch (err) {
    console.error(err);
  }
};

start();
