import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

export default function Root() {
    return (
        <div className='container mx-auto font-serif text-center'>
        <h1>Timetrackerproject</h1>
        <div>
        <NavLink to="/">Login</NavLink>
        <NavLink to="/timetracker">Calendar</NavLink>
        </div>
            <Outlet />
        </div>
    )
}
