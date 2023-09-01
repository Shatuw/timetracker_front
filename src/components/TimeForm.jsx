import React from 'react'

export default function TimeForm({day}) {
  return (
    <form>
        <label> at: 
            <input type="time" name="start_time" defaultValue="08:00"/>
        </label>            
        <label> to: 
            <input type="time" name="end_time" defaultValue="16:06"/>
        </label>      
        <label> off: 
            <input type="time" name="break_time" defaultValue="00:30" />
        </label>                  
        <select id="entry_type" name="entry_type" >
            <option value="w">w</option>
            <option value="f">f</option>
            <option value="a">a</option>
            <option value="k">k</option>
            <option value="s">s</option>
            <option value="u">u</option>
        </select>
        
        <input type='submit'value="save"/>
        
    </form>
  )
}
