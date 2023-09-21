export const regUserQuery = "INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4)";
export const getUserQuery = "SELECT email,first_name,last_name,time_balance,default_start_time,default_end_time,default_break_time,default_working_time,id from users WHERE $1 = email";
export const verifyUserQuery ="SELECT email FROM users WHERE email = $1 AND password = $2";

export const getDaysQuery = "SELECT * from days WHERE $1 = user_id AND day LIKE $2 || '___' ";
export const setDayQuery = "INSERT INTO days (day,start_time,end_time,working_time,break_time,entry_type,user_id,id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)"; 