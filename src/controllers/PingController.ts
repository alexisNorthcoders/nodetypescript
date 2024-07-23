import { Request, Response } from "express";
import PingModel from "../models/PingModel.js";



export class PingController {

    public async getMessage(_req: Request, res: Response): Promise<void> {
        const model = new PingModel();
        const response = await model.getMessage();
        res.send(response);
    }
}