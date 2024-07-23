import UsersModel from "../models/UsersModel.js";
import { Request, Response } from "express";
const users = new UsersModel();
export class UsersController {

    public async getUsers(_req: Request, res: Response): Promise<void> {
        const response = await users.allUsers()
        res.send(response);
    }
    public async getUserByUsername(req: Request, res: Response): Promise<void> {
        const { username } = req.params
        const response = await users.findByUsername(username)
        res.send(response)

    }
    public async insertUser(req: Request, res: Response): Promise<void> {
        const requestBody = req.body
        try {
            const response = await users.createUser(requestBody)
            res.status(201).send(response)
        }
        catch (err) {
            res.status(400).send(err)

        }
    }
    public async removeUser(req: Request, res: Response): Promise<void> {
        const requestBody = req.body
        try {
            const response = await users.deleteUser(requestBody)
            if (response) {
                res.status(200).send({ message: "User deleted!" })
            }
            else{
                res.status(400).send({ message: "Error deleting user!" })
            }
        }
        catch (err) {
            res.status(400).send(err)

        }
    }
    public async patchUser(req: Request, res: Response): Promise<void> {
        const requestBody = req.body
        try {
            const response = await users.updateUser(requestBody)
            if (response) {
                res.status(200).send(response)
            }
            else{
                res.status(400).send({ message: "Error updating user!" })
            }
        }
        catch (err) {
            res.status(400).send(err)

        }
    }

}