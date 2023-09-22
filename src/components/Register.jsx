import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function Register() {

  const handleRegister = (event) => {
    event.preventDefault();

    const data = {};

        for (const pair of new FormData(event.target).entries()) {
            data[pair[0]] = pair[1];
        };
        // console.log(data)
        fetch("https://tired-robe-bat.cyclic.cloud/register", { method: "POST",headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }, body: JSON.stringify(data) })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error in API-request');
            }
            return response.json().then(({token}) => {
              //console.log(token); // store date/jwt here in sessionStorage
              sessionStorage.setItem('timetracker-session', token);
              navigate('/timetracker');
            }); // convert api-response into json; // convert api-response into json
          })
          // .then((data) => {
          //   console.log(data); // work the fetch-response -> send an alert/ a modal or do whatever
          // })
          .catch((error) => {
            console.error('Error:', error); // error-handling, when request goes wrong
          });
  }

  return (
    <>

    <Card className='w-96 m-auto'>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form onSubmit={handleRegister} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 p-2">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" type="text" name="first_name" label="Firstname" required/>
          <Input size="lg" type="text" name="last_name" label="Lastname" required/>
          <Input size="lg" type="text" name="email" label="email" required/>
          <Input type="text" size="lg" name="password" label="Password" required/>
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="/" className="font-medium text-gray-900">
            Sign In
          </Link>
        </Typography>
      </form>
      </Card>
      {/* <h1>Make a new Account</h1>
      <form onSubmit={handleRegister}>
        <label>Firstname: <input type="text" name="first_name" placeholder='Max' required/></label>
        <label>Lastname: <input type="text" name="last_name" placeholder='Mustermann' required/></label>
        <label>e-mail: <input type="text" name="e-mail" placeholder='max.mustermann@mustermail.com' required/></label>
        <label>password: <input type="text" name="password" placeholder="secret password" required/></label>
        <button type="submit">register now</button>
      </form>
      <Link to="/">back to login</Link> */}
    </>
  )
}
