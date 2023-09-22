import express from "express";
import dotenv from "dotenv";
import backendRoutes from "./routes.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import { getDays, regUser, setDay } from "./controllers.js";
import { pool } from "./database.js";
import { getUserQuery, verifyUserQuery } from "./querys.js";


//basic preperation-stuff:
dotenv.config();
const app = express();
const port = process.env.PORT ?? 3000;
const secret = process.env.jwt_secret;
app.use(cors({origin : "http://localhost:5173"}));
app.get("/health", (_req, res) => {
    res.send("ok");
});
app.use(express.json());

const generateJwt = (email) => jwt.sign({ email }, secret, { expiresIn : '1800s' });

//login-route to create a JWT and send it back
app.post("/login", async (req, res) => {
    //check if email + password matches 
    
    const { rows } = await pool.query(verifyUserQuery, [req.body.email, req.body.password]);
    
    if (rows.length === 1) {
        // then create jwt and send it back
        const token = generateJwt(req.body.email);
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
        
        //extend req-object with extra data for next routes
        req.currentUser =  rows[0]; 

    } catch (error) {
        console.error(error);
        return res.status(401).end();
    }
    next();
})

app.get("/days", async (req, res) => {
    const entries = await getDays(req.currentUser.id, req.headers.actualmonth);
    res.json(entries);    
});

app.get("/user", (req, res) => {
    //send the to "req" added currentUser-object to frontend
   res.json(req.currentUser);
    
});

app.post("/days", async (req, res) => {
    // store req.body along with req.headers.user_id in database
    const dayData = req.body;
    dayData['user_id'] = req.headers.user_id;
    dayData[`day`]= req.headers.day;
    dayData[`working_time`]= req.headers.working_time;
    setDay(dayData)
    res.json("Data stored.")
});

app.use("/", backendRoutes)

app.listen(port, () => console.log(`Server listening on port: ${port}`));
