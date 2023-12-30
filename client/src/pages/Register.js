import React, { useState } from 'react';
import '../pagesStyle/Register.css'; // Import the styles
import axios from 'axios'
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const handle_Data_Register = ()=>{
 axios.post('http://localhost:8080/register',{
    username:username,
    password:password,
    age:age,
    email:email
 })
 .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="button" onClick={handle_Data_Register}>Register</button>
      </form>
    </div>
  );
};

export default Register;
