import React from 'react';

export default function TimeForm({ entry }) {
    //submit-button-press:
    function handleSubmit(e) {
        e.preventDefault();

        // fetch("http://localhost:3000/days" ).then((response)=> response.json).then((data)=>console.log(data));
        const data = {};

        for (const pair of new FormData(e.target).entries()) {
            data[pair[0]] = pair[1];
        };
        // console.log(data)

        fetch("http://localhost:3000/days", {
            method: "POST", headers: {
                "Content-Type": "application/json",
                authorization: sessionStorage.getItem("timetracker-session"),
            }, body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error in api-request');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
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
            <select id="entry_type" name="entry_type" defaultValue={entry.entry_type} >
                <option value="w">w</option>
                <option value="f">f</option>
                <option value="a">a</option>
                <option value="k">k</option>
                <option value="s">s</option>
                <option value="v">v</option>
            </select>

            <input type='submit' value="save" />

        </form>
    )
}
