import React, { useState } from 'react';
import '../pagesStyle/Login.css'; // Import the styles
import axios from 'axios'
import { useNavigate ,Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate ();

  const handleProtectedRequest = async () => {
    try {
      const token = localStorage.getItem('authToken');
        console.log(token)
      const response = await axios.get('http://localhost:8080/protected', {
        headers: {
          Authorization: token,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error accessing protected route:', error.response ? error.response.data : error.message);
    }
  };

  const handle_Data_login = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password,
      });

      const token = response.data.token;
      console.log(`Bearer ${token}`);
      localStorage.setItem('authToken', token);

      await handleProtectedRequest();

      navigate('/home')
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
   
  return (
    <div className="auth-container">
      <h2>Login</h2>
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
        <button type="button" onClick={handle_Data_login}>Login</button>
      </form>
    </div>
  );
};

export default Login;
