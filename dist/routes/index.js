import express from 'express';
import { PingController } from '../controllers/PingController.js';
import { UsersController } from '../controllers/UsersController.js';
const router = express.Router();
router.get("/ping", async (req, res) => {
    const controller = new PingController();
    await controller.getMessage(req, res);
});
const users = new UsersController();
router.get("/users", async (req, res) => {
    await users.getUsers(req, res);
});
router.get("/users/:username", async (req, res) => {
    await users.getUserByUsername(req, res);
});
router.post("/users", async (req, res) => {
    await users.insertUser(req, res);
});
router.delete("/users", async (req, res) => {
    await users.removeUser(req, res);
});
router.patch("/users", async (req, res) => {
    await users.patchUser(req, res);
});
export default router;
