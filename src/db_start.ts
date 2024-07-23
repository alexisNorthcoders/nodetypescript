import {initializeDatabase,populateDatabase} from "./db.js";

await initializeDatabase((err: Error | null) => {
    if (err) {
        console.error("Failed to initialize the database", err);
    } else {
        console.log("Database has been initialized successfully.");
    }
});
await populateDatabase((err: Error | null) => {
    if (err) {
        console.error("Failed to initialize the database", err);
    } else {
        console.log("Database has been initialized successfully.");
    }
});