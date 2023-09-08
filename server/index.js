import express from "express";
import dotenv from "dotenv";
import backendRoutes from "./routes.js"

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.get("/health", (req, res) => {
    res.send("ok");
});

app.use(express.json());

app.post("/days", (req, res) => {
    console.log(req.body);
    res.end();
});

app.use("/", backendRoutes)

app.listen(port, () => console.log(`Server listening on port: ${port}`));