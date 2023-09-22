import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function Welcome() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const login_data = {}
    for (const pair of new FormData(event.target).entries()) {
      login_data[pair[0]] = pair[1];
    };

    fetch("http://localhost:3000/login", { method: "POST",headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }, body: JSON.stringify(login_data) })
          .then((response) => {
            if (response.status === 401){
              return response.text().then((errorMessage) => alert("Error: " + errorMessage ));
            }
            if (!response.ok) {
              throw new Error('Error in API-request');
            }
            return response.json().then(({token}) => {
              //console.log(token); // store date/jwt here in sessionStorage
              sessionStorage.setItem('timetracker-session', token);
              navigate('/timetracker');
            }); // convert api-response into json
          })
          .catch((error) => {
            alert("Something went wrong.");
            console.error('Error:', error); // error-handling, when request goes wrong
          });
  }

  return (
    <>
<Card className='w-96 m-auto'>
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your email and password.
      </Typography>
      <form onSubmit={handleLogin} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 p-2">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" type="text" name="email" label="email" required/>
          <Input type="password" name="password" size="lg" label="Password" required/>
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Sign In
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-gray-900">
            Sign Up
          </Link>
        </Typography>
      </form>
      </Card>


      {/* <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>e-mail: <input type="text" name='email' placeholder='max@mustermann.fake' required /></label>
        <label>password: <input type="text" name='password' placeholder='MySecretPassword' required /></label>
        <button type='submit'>Login</button>
      </form>
      <Link to="/register">register</Link> */}
    </>
  )
}
