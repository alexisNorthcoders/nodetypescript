var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import sqlite3 from 'sqlite3';
const { Database } = sqlite3;
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Get, Route, Path, Post, Body, Delete, Patch } from 'tsoa';
const dbPath = resolve(dirname(fileURLToPath(import.meta.url)), '../../DB/database.sqlite');
const db = new Database(dbPath);
let UsersModel = class UsersModel {
    async createUser(requestBody) {
        const { username, name, age } = requestBody;
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO users (username, name, age) VALUES (?, ?, ?)", [username, name, age], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    db.get("SELECT * FROM users WHERE id = ?", [this.lastID], (err, row) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(row);
                        }
                    });
                }
            });
        });
    }
    async deleteUser(requestBody) {
        const { id } = requestBody;
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    if (this.changes > 0) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
            });
        });
    }
    async findByUsername(username) {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
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
    async updateUser(requestBody) {
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
                }
                else {
                    if (this.changes > 0) {
                        db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(row);
                            }
                        });
                    }
                    else {
                        resolve(undefined);
                    }
                }
            });
        });
    }
};
__decorate([
    Post("/"),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersModel.prototype, "createUser", null);
__decorate([
    Delete("/"),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersModel.prototype, "deleteUser", null);
__decorate([
    Get("{username}"),
    __param(0, Path()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersModel.prototype, "findByUsername", null);
__decorate([
    Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersModel.prototype, "allUsers", null);
__decorate([
    Patch("/"),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersModel.prototype, "updateUser", null);
UsersModel = __decorate([
    Route("users")
], UsersModel);
export default UsersModel;
