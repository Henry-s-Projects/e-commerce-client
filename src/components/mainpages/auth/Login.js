import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Typography } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL + 'user/login';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (user.email === '' || user.password === '') {
      toast.warn('Please fill in all fields');
    } else {
      try {
        const res = await axios.post(
          API_URL,
          { ...user, headers: { 'Access-Control-Allow-Origin': '*' } },
          { withCredentials: true }
        );
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('firstLogin', true);
        window.location.href = '/';
      } catch (error) {
        toast.warn(error.response.data.msg, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="login-page">
      <form>
        <Typography
          variant="h5"
          component="div"
          sx={{
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#555',
            fontWeight: 'bold',
            marginLeft: '10%',
            padding: '20px 0',
          }}
        >
          Login
        </Typography>
        <div style={{ display: 'block' }}>
          <TextField
            required
            value={user.email}
            label="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            size="small"
            sx={{ width: '80%', paddingBottom: '10px', marginLeft: '10%' }}
          />
          <TextField
            required
            value={user.password}
            label="Password"
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            size="small"
            autoComplete="current-password"
            sx={{ width: '80%', paddingBottom: '30px', marginLeft: '10%' }}
          />
        </div>
        <div className="row">
          <Button type="submit" onClick={loginSubmit} variant="contained">
            Login
          </Button>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
