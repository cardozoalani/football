import { createTables } from "./createTablesFunction"; 

async function run() {
  try {
    await createTables();
    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

run();
