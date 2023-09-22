import { pool } from "./database.js";
import { getDaysQuery, regUserQuery, setDayQuery } from "./querys.js";
import { v4 as uuid } from "uuid" 


export const getDays = async (user_id, actualmonth) => {
    
    try {
        const { rows } = await pool.query(getDaysQuery,[user_id, actualmonth] );
        return rows;
    } catch (error) {
        console.error("Failed to get the day-entries for user: ", error);
    }    
};
export const setDay = async ({
    day,
    start_time,
    end_time,
    working_time,
    break_time,
    entry_type,
    user_id,
}) => {
    try {
        const id = uuid();
        await pool.query(setDayQuery, [day,start_time,end_time,working_time,break_time,entry_type,user_id,id])
    } catch (error) {
        console.error("Failed to insert new time-record in database: ", error);
    }
};

export const regUser = async ({
    email,
    first_name,
    last_name,
    password,
}) => {
    try {
        await pool.query(regUserQuery, [email, first_name, last_name, password]);
    } catch (error) {
        console.error('Failed to insert new user in database:', error);
    }

}