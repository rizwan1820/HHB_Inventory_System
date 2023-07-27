import React, { useState }  from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the hook
import './Login.css';

const Login = ({ isLogin, setIsLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Get the navigate function from the hook

  

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/users/login', { username, password });
      // Assuming your backend returns a success message and a token
      const { success, token } = response.data;
      console.log('Response Data: ', response.data);

      if (success) {
        console.log('Success trigger');
        // Save the token to local storage or Redux store for authentication
        localStorage.setItem('token', token);
        setIsLogin(true);

        // Use the navigate function to redirect the user to the home page after successful login
        navigate('/home');
      } else {
        console.log('else trigger');
        // Handle login error (e.g., show an error message)
        console.log('Login failed. Invalid credentials.');
      }
    } catch (error) {
      // Handle API error (e.g., show an error message)
      console.error('Login failed:', error.message);
    }
  };

  return (
    <>
      <div className="header-login">
        <h1 className="main-heading-login">
          PureLastic - A Project of HHB TRADERS
        </h1>
        <h2 className="secondary-heading-login">.</h2>
        <h3 className="third-heading-login">
          Mobile No. Qadeer Jutt 0343-4573908 M. Habib 0301-4128554
        </h3>
      </div>
      <div className="container">
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
