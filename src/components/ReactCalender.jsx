import React, { useState } from 'react';
import Calendar from 'react-calendar';
import TimeForm from './TimeForm';
import { format } from 'date-fns';
//import 'react-calendar/dist/Calendar.css';


function tileClassName(){
  //set clasName for all tiles/days to "tileBgc" ->custom class in App.css
  return "tileBgc";
}

export default function ReactCalendar() {
  
  const [value, setValue] = useState(new Date());
  //value.getMonth() equals the actual shown month 
  
  function tileContent({date, view}){
    if (view === 'month') {
    //check if month of the day/tile is the same as displayed month/actual value.getMonth()       
      if (date.getMonth() === value.getMonth()) {
        //create an ISO 8601 date-"string"
        const dayTile = format(date, 'yyyy-MM-dd');
        //give the ISO-day to TimeForm-component to work with 
        return <TimeForm day={dayTile} />;
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