import {pool} from "./database.js";
import { getDaysQuery } from "./querys.js";

export const getDays = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    
    pool.query(getDaysQuery, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};