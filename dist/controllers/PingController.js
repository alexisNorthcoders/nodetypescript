import PingModel from "../models/PingModel.js";
export class PingController {
    async getMessage(_req, res) {
        const model = new PingModel();
        const response = await model.getMessage();
        res.send(response);
    }
}
