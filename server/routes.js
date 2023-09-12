import express from 'express'
import { getDays } from './controllers.js';

const router = express.Router();

//register a new user in the database
// router.post("/register", ....);

//check/display user in database -to do: authentification-logic
// router.get("/login", ...);

//display or manage the timetracking/monthly-view
router.get("/timetracking/:id", getDays);
// router.post("/timetracking/:id", ....);
// router.put("/timetracking/:id", ....)

// //display or change the user-settings
// router.get("/settings/:id", ...);
// router.put("/settings/:id", ...);

// //delete the user and the timetracker-entries
// router.delete("/settings/:id", ...)

export default router;