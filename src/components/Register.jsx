import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {

  const handleRegister = (event) => {
    event.preventDefault();

    const data = {};

        for (const pair of new FormData(event.target).entries()) {
            data[pair[0]] = pair[1];
        };
        console.log(data)
        fetch("localhost:3000/register", { method: "post", body: JSON.stringify(data) })
  }

  return (
    <>
      <h1>Make a new Account</h1>
      <form onSubmit={handleRegister}>
        <label>Firstname: <input type="text" name="first_name" placeholder='Max' required/></label>
        <label>Lastname: <input type="text" name="last_name" placeholder='Mustermann' required/></label>
        <label>e-mail: <input type="text" name="e-mail" placeholder='max.mustermann@mustermail.com' required/></label>
        <label>password: <input type="text" name="password" placeholder="secret password" required/></label>
        <button type="submit">register now</button>
      </form>
      <Link to="/">back to login</Link>
    </>
  )
}
