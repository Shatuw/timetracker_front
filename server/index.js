import express from "express";


const app = express();
const port = 3000;

app.get("/health", (req, res) => {
    res.send("ok");
});

app.use(express.json());

app.post("/days", (req, res) => {
    console.log(req.body);
    res.end();
});

app.listen(port, () => console.log(`Server listening on port: ${port}`));