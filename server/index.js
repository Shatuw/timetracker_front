import express from "express";
import dotenv from "dotenv";
import backendRoutes from "./routes.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import fake_user from "./mock_files/fake_user.json" assert { type: "json" };
import fake_entries from "./mock_files/fake_entries.json" assert { type: "json" };

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;
const secret = process.env.jwt_secret;

app.use(cors({origin : "http://localhost:5173"}));

app.get("/health", (req, res) => {
    res.send("ok");
});

app.use(express.json());

app.post("/login", (req, res, next) => {
    //some testing-variables
    const right_email ="max@mustermann.fake"
    const right_password = "12345"
    //check if email + password matches 
    if (req.body.email === right_email && req.body.password === right_password){
        
        // then create jwt
        const new_token = (data, secret) => jwt.sign(data, secret, {expiresIn : '600s'});
        // and send it back
        res.status(200).json({token : new_token({email: req.body.email}, secret)});
    }
    else{
        res.status(401).send("That's not the right login.");
    }
});

app.post("/register", (req, res) => {
    console.log("register-log");
    console.log(req.body);
    res.end();
});
//check for jwt /otherwise block all following routes
app.use((req, res, next) => {
    try {
        const { email } = jwt.verify(req.headers.authorization, secret);
        const user = fake_user.find((user) => user.email === email)
        if (!user){
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
    res.json(user);
});

app.post("/days", (req, res) => {
    console.log("days-log");
    console.log(req.body);
    res.json(req.body)
});

app.use("/", backendRoutes)

app.listen(port, () => console.log(`Server listening on port: ${port}`));
