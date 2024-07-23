import sqlite3 from 'sqlite3'
const { Database } = sqlite3
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../DB/database.sqlite');

type DatabaseCallback = (err: Error | null) => void;

const users = [
    {
        username: "tippyBoy",
        name: "John",
        age: 24
    },
    {
        username: "MisteriousWoman",
        name: "Kate",
        age: 35
    },
    {
        username: "KillerX",
        name: "Manoel",
        age: 75
    },
]

async function initializeDatabase(callback: DatabaseCallback) {
    const db = new Database(dbPath, (err) => {
        if (err) {
            console.error("Error opening database", err.message);
            if (callback) callback(err);
            return;
        }

        db.serialize(() => {
            db.run("DROP TABLE IF EXISTS users", (err) => {
                if (err) {
                    console.error("Error dropping users table", err.message);
                    if (callback) callback(err);
                    return;
                }
                db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, name TEXT, age NUMBER)", (err) => {
                    if (err) {
                        console.error("Error creating users table", err.message);
                        if (callback) callback(err);
                        return;
                    }

                    if (callback) callback(null);
                });
            });

        });
    });
}
async function populateDatabase(callback: DatabaseCallback) {
    const db = new Database(dbPath, (err) => {
        if (err) {
            console.error("Error opening database", err.message);
            if (callback) callback(err);
            return;
        }

        db.serialize(() => {
            users.forEach(({ username, name, age }) => {

                db.run("INSERT INTO users (username, name, age) VALUES (?, ?, ?)", [username, name, age], callback);
            })
        });

    });
}



export { populateDatabase, initializeDatabase };