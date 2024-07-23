import { initializeDatabase, populateDatabase } from "./db.js";
await initializeDatabase((err) => {
    if (err) {
        console.error("Failed to initialize the database", err);
    }
    else {
        console.log("Database has been initialized successfully.");
    }
});
await populateDatabase((err) => {
    if (err) {
        console.error("Failed to initialize the database", err);
    }
    else {
        console.log("Database has been populated successfully.");
    }
});
