import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    const data = {};

    for (const [key, value] of new FormData(event.target).entries()) {
      data[key] = value;
    };

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error in API-request');
        }
        return response.json();
      })
      .then(({ token }) => {
        console.log(token); // store date/jwt here in sessionStorage
        sessionStorage.setItem('timetracker-session', token);

        navigate("/timetracker");
      })
      .catch((error) => {
        console.error('Error:', error);
      });


  }

  return (
    <>
      <h1>Make a new Account</h1>
      <form onSubmit={handleRegister}>
        <label>Firstname: <input type="text" name="firstName" placeholder='Max' required /></label>
        <label>Lastname: <input type="text" name="lastName" placeholder='Mustermann' required /></label>
        <label>e-mail: <input type="text" name="email" placeholder='max.mustermann@mustermail.com' required /></label>
        <label>password: <input type="text" name="password" placeholder="secret password" required /></label>
        <button type="submit">register now</button>
      </form>
      <Link to="/">back to login</Link>
    </>
  )
}
