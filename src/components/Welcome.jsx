import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
              console.log(token); // store date/jwt here in sessionStorage
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
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>e-mail: <input type="text" name='email' placeholder='max@mustermann.fake' required /></label>
        <label>password: <input type="text" name='password' placeholder='MySecretPassword' required /></label>
        <button type='submit'>Login</button>
      </form>
      <Link to="/register">register</Link>
    </>
  )
}
