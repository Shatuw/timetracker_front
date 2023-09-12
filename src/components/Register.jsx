import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <>
      <h1>Make a new Account</h1>
      <form>
        <label>Firstname: <input type="text" name="first_name" placeholder='Max' required/></label>
        <label>Lastname: <input type="text" name="last_name" placeholder='Mustermann' required/></label>
        <label>e-mail: <input type="text" name="e-mail" placeholder='max.mustermann@mustermail.com' required/></label>
        <label>password: <input type="text" name="password" required/></label>
        <label>password again: <input type="text" name="check_password" required/></label>
        <button type="submit">register now</button>
      </form>
      <Link to="/">back to login</Link>
    </>
  )
}
