import express, { Request, Response } from 'express';
import { PingController } from '../controllers/PingController.js';
import { UsersController } from '../controllers/UsersController.js';
const router = express.Router()


router.get("/ping", async (req: Request, res: Response) => {
    const controller = new PingController();
    await controller.getMessage(req, res);
});

const users = new UsersController();
router.get("/users", async (req: Request, res: Response) => {
    await users.getUsers(req, res)
});
router.get("/users/:username", async (req: Request, res: Response) => {
    await users.getUserByUsername(req, res)
});
router.post("/users", async (req: Request, res: Response) => {
    await users.insertUser(req, res)
})
router.delete("/users",async (req:Request,res:Response)=>{
    await users.removeUser(req,res)
})
router.patch("/users",async (req:Request,res:Response)=>{
    await users.patchUser(req,res)
})
export default router