import React from 'react';
import fake_entries from "../mock_files/fake_entries.json";
import fake_user from "../mock_files/fake_user.json";

const weekend_days = [0, 6]


export default function TimeForm({ day, date }) {
    //tile-content:
    const entry = fake_entries.find(entry => entry.day === day) ?? {
        "id": null,
        "user_id": fake_user[0].id,
        "day": day,
        "start_time": fake_user[0].default_start_time,
        "end_time": fake_user[0].default_end_time,
        "working_time": fake_user[0].default_working_time,
        "break_time": fake_user[0].default_break_time,
        "entry_type": weekend_days.includes(date.getDay()) ? "f" : "w"
    }

    //submit-button-press:
    function handleSubmit(e) {
        e.preventDefault();
        const data = {};

        for (const pair of new FormData(e.target).entries()) {
            data[pair[0]] = pair[1];
        };
        console.log(data)
        
        fetch("localhost:3000/days", { method: "POST",headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }, body: JSON.stringify(data) })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Fehler bei der API-Anfrage');
            }
            return response.json(); // Die API-Antwort in JSON umwandeln
          })
          .then((data) => {
            console.log(data); // Mit den Daten aus der API-Antwort arbeiten
          })
          .catch((error) => {
            console.error('Fehler:', error); // Fehlerbehandlung, falls die Anfrage fehlschlägt
          });
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <label> at:
                <input type="time" name="start_time" defaultValue={entry.start_time} />
            </label>
            <label> to:
                <input type="time" name="end_time" defaultValue={entry.end_time} />
            </label>
            <label> off:
                <input type="time" name="break_time" defaultValue={entry.break_time} />
            </label>
            <select id="entry_type" name="entry_type" >
                <option value="w" selected={entry.entry_type === "w"}>w</option>
                <option value="f" selected={entry.entry_type === "f"}>f</option>
                <option value="a">a</option>
                <option value="k">k</option>
                <option value="s">s</option>
                <option value="v">v</option>
            </select>

            <input type='submit' value="save" />

        </form>
    )
}
