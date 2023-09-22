import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from './components/Root.jsx';
import Welcome from "./components/Welcome.jsx";
import ReactCalendar from './components/ReactCalender';
import Register from './components/Register.jsx';
import { ThemeProvider } from "@material-tailwind/react";

function App() {
  
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />} >
    <Route index element={<Welcome />}/>
    <Route path='/register' element={<Register />}/>
    <Route path='/timetracker' element={<ReactCalendar />} />
  </Route>
))
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
