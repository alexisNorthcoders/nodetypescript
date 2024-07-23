import express from 'express';
import morgan from "morgan";
import router from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
export const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
    },
}));
app.use(router);
