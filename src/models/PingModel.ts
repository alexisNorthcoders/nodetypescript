import { Get, Route } from 'tsoa';
import { PingResponse } from '../types.js';


@Route("ping")
export default class PingModel {
    @Get("/")
    public async getMessage(): Promise<PingResponse> {
        return {
            message: "pong",
        };
    }
}