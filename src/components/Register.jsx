import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <>
    <h1>Make a new Account</h1>
    <form>
        <label>e-mail: <input/></label>
        <label>password: <input/></label>
        <button>register now</button>
    </form>
    <Link to="/">back to login</Link>
    </>
  )
}
