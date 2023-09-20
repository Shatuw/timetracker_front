import express from "express";
import dotenv from "dotenv";
import backendRoutes from "./routes.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import fake_user from "./mock_files/fake_user.json" assert { type: "json" };
import fake_entries from "./mock_files/fake_entries.json" assert { type: "json" };
import { regUser } from "./controllers.js";
import { pool } from "./database.js";
import { getUserQuery } from "./querys.js";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;
const secret = process.env.jwt_secret;

app.use(cors({origin : "http://localhost:5173"}));

//test server is live on route: "/health"?
app.get("/health", (req, res) => {
    res.send("ok");
});

app.use(express.json());

const generateJwt = (email) => jwt.sign({ email }, secret, { expiresIn : '600s' });

//login-route to create a JWT and send it back
app.post("/login", (req, res) => {
    //some testing-login-validation-vars
    const right_email ="max@mustermann.fake"
    const right_password = "12345"

    //check if email + password matches 
    if (req.body.email === right_email && req.body.password === right_password) {
        
        // then create jwt
        const token = generateJwt(req.body.email);
        // and send it back
        res.status(200).json({ token });
    } else {
        res.status(401).send("That's not the right login.");
    }
});
// - Registrierung route 
app.post("/register", async (req, res) => {       
    await regUser(req.body);
    const token = generateJwt(req.body.email);

    res.status(201).json({ token });
});

//check for jwt /otherwise block all following routes
app.use(async (req, res, next) => {
    try {
        const { email } = jwt.verify(req.headers.authorization, secret);
        const { rows } = await pool.query(getUserQuery, [email])
        
        if (!rows.length){
            return res.status(404).send("No valid login");
        }
    } catch (error) {
        console.error(error);
        return res.status(401).end();
    }
    next();
})

app.get("/days", (_req, res) => {
  res.json(fake_entries);  
});

app.get("/user", (_req, res) => {
    res.json(fake_user);
});

app.post("/days", (req, res) => {
    console.log("days-log");
    console.log(req.body);
    res.json(req.body)
});

app.use("/", backendRoutes)

app.listen(port, () => console.log(`Server listening on port: ${port}`));
