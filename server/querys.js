export const regUserQuery = "INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4)";
export const getDaysQuery = "SELECT * from days WHERE $1 = user_id";
export const getUserQuery = "SELECT * from users WHERE $1 = email";
