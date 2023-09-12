import express from "express";
import dotenv from "dotenv";
import backendRoutes from "./routes.js";
import cors from "cors";


dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors({origin : "http://localhost:5173"}));

app.get("/health", (req, res) => {
    res.send("ok");
});

app.use(express.json());

app.get("/days", (req, res) => res.json({"key" : "jez ???"}));

app.post("/days", (req, res) => {
    console.log("days-log");
    console.log(req.body);
    res.json(req.body)
});


app.post("/register", (req, res) => {
    console.log("register-log");
    console.log(req.body);
    res.end();
});

app.use("/", backendRoutes)

app.listen(port, () => console.log(`Server listening on port: ${port}`));