import UsersModel from "../models/UsersModel.js";
const users = new UsersModel();
export class UsersController {
    async getUsers(_req, res) {
        const response = await users.allUsers();
        res.send(response);
    }
    async getUserByUsername(req, res) {
        const { username } = req.params;
        const response = await users.findByUsername(username);
        res.send(response);
    }
    async insertUser(req, res) {
        const requestBody = req.body;
        try {
            const response = await users.createUser(requestBody);
            res.status(201).send(response);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    async removeUser(req, res) {
        const requestBody = req.body;
        try {
            const response = await users.deleteUser(requestBody);
            if (response) {
                res.status(200).send({ message: "User deleted!" });
            }
            else {
                res.status(400).send({ message: "Error deleting user!" });
            }
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
    async patchUser(req, res) {
        const requestBody = req.body;
        try {
            const response = await users.updateUser(requestBody);
            if (response) {
                res.status(200).send(response);
            }
            else {
                res.status(400).send({ message: "Error updating user!" });
            }
        }
        catch (err) {
            res.status(400).send(err);
        }
    }
}
