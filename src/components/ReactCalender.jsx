import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import TimeForm from './TimeForm';
import { format } from 'date-fns';
//import 'react-calendar/dist/Calendar.css';

const weekend_days = [0, 6]

function tileClassName() {
  //set clasName for all tiles/days to "tileBgc" ->custom class in App.css
  return "tileBgc";
}

export default function ReactCalendar() {
  const [value, setValue] = useState(new Date());
  //value.getMonth() equals the actual shown month 
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //todo: fetch with useLoader on the Route
  const fetchData = async () => {
    const [entriesResponse, userRepsonse] = await Promise.all([
      fetch("http://localhost:3000/days", {
        headers: {
          authorization: sessionStorage.getItem("timetracker-session")
        }
      }),
      fetch("http://localhost:3000/user", {
        headers: {
          authorization: sessionStorage.getItem("timetracker-session")
        }
      }),
    ])

    setUser(await userRepsonse.json());
    setEntries(await entriesResponse.json())
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, []);

  if (isLoading) {
    return null;
  }

  function tileContent({ date, view }) {
    if (view === 'month') {
      //check if month of the day/tile is the same as displayed month/actual value.getMonth()       
      if (date.getMonth() === value.getMonth()) {
        //create an ISO 8601 date-"string" with format() from datefns
        const day = format(date, 'yyyy-MM-dd');
        const default_entry = {
          "id": null,
          "user_id": user.id,
          "day": day,
          "start_time": user.default_start_time,
          "end_time": user.default_end_time,
          "working_time": user.default_working_time,
          "break_time": user.default_break_time,
          "entry_type": weekend_days.includes(date.getDay()) ? "f" : "w"
        }
        const entry = entries.find((entry) => entry.day === day) ?? default_entry;
        //give the ISO-day to TimeForm-component to work with 
        return <TimeForm entry={entry} />;
      }
    }
    return null;
  }
  function handleActiveStartDateChange({ activeStartDate }) {
    //change valueState to the actual shown date/month
    setValue(activeStartDate);
  }

  function onChange(nextValue) {
    //dont know what this is doing but lets keep it 
    setValue(nextValue);
  }

  return (
    <Calendar
      onChange={onChange}
      value={value}
      onActiveStartDateChange={handleActiveStartDateChange}
      tileClassName={tileClassName}
      tileContent={tileContent}
      maxDetail='month'
      minDetail='year'
    />
  );
}