import React from 'react';
import { Link } from 'react-router-dom';



export default function Welcome() {

  const handleLogin = (event) =>{
    event.preventDefault();
  }

  return (
    <>
    <h1>Login</h1>
    <from onSubmit={handleLogin}>
      <label>e-mail: <input /></label>
      <label>password: <input /></label>
      <button>Login</button>
    </from>
    <Link to="/register">register</Link>
    </>
  )
}
