import sqlite3 from 'sqlite3';
const { Database } = sqlite3;
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../../DB/database.sqlite');
const db = new Database(dbPath);
export class UserModel {
    createUser(username, name, age) {
        db.run("INSERT INTO users (username, name, age) VALUES (?, ?, ?)", [username, name, age]);
    }
    async findByUsername(username) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE username = ?", [username], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
    async allUsers() {
        return new Promise((resolve, reject) => {
            db.all("SELECT id, * FROM users", [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
}
