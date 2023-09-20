import { pool } from "./database.js";
import { getDaysQuery, regUserQuery } from "./querys.js";


export const getDays = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);

    pool.query(getDaysQuery, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

export const regUser = async ({
    email,
    firstName,
    lastName,
    password,
}) => {
    try {
        await pool.query(regUserQuery, [email, firstName, lastName, password]);
    } catch (error) {
        console.error('Fehler beim Einfügen des Datensatzes:', error);
    }

}