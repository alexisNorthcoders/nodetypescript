import { app } from "./index.js";
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
