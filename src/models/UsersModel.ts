import sqlite3 from 'sqlite3'
const { Database } = sqlite3
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Get, Route, Path, Post, Body, Delete, Patch } from 'tsoa';
import { CreateUserRequest, DeleteUserRequest, UpdateUserRequest, User } from '../types.js';

const dbPath = resolve(dirname(fileURLToPath(import.meta.url)), '../../DB/database.sqlite');
const db = new Database(dbPath);

@Route("users")
export default class UsersModel {
    @Post("/")
    public async createUser(@Body() requestBody: CreateUserRequest): Promise<User | undefined> {
        const { username, name, age } = requestBody;
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO users (username, name, age) VALUES (?, ?, ?)", [username, name, age], function (err) {
                if (err) {
                    reject(err)
                } else {
                    db.get("SELECT * FROM users WHERE id = ?", [this.lastID], (err, row) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(row as User);
                        }
                    });
                }
            })
        });
    }
    @Delete("/")
    public async deleteUser(@Body() requestBody: DeleteUserRequest): Promise<boolean> {
        const { id } = requestBody;

        return new Promise((resolve, reject) => {
            db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    if (this.changes > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }
    @Get("{username}")
    public async findByUsername(@Path() username: string): Promise<User | undefined> {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row as User);
                }
            })
        })
    }
    @Get("/")
    public async allUsers(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            db.all("SELECT id, * FROM users", [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows as User[]);
                }
            });
        });
    }
    @Patch("/")
    public async updateUser(@Body() requestBody: UpdateUserRequest): Promise<User | undefined> {
        const { id, username, name, age } = requestBody;

        return new Promise((resolve, reject) => {

            db.run(`
                UPDATE users
                SET username = COALESCE(?, username),
                    name = COALESCE(?, name),
                    age = COALESCE(?, age)
                WHERE id = ?
            `, [username, name, age, id], function (err) {
                if (err) {
                    reject(err);
                } else {

                    if (this.changes > 0) {

                        db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(row as User);
                            }
                        });
                    } else {

                        resolve(undefined);
                    }
                }
            });
        });
    }
}