import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Typography } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL + 'user/register';

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerSubmit = async (e) => {
    e.preventDefault();
    if (user.name === '' || user.email === '' || user.password === '') {
      toast.warn('Please fill in all fields');
    } else {
      try {
        const res = await axios.post(API_URL, { ...user });
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
          gutterBottom
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
          Register
        </Typography>
        <TextField
          required
          value={user.name}
          label="Name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          size="small"
          sx={{ width: '80%', paddingBottom: '10px', marginLeft: '10%' }}
        />
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
          autoComplete="current-password"
          size="small"
          sx={{ width: '80%', paddingBottom: '30px', marginLeft: '10%' }}
        />
        <div className="row">
          <Button type="submit" onClick={registerSubmit} variant="contained">
            Register
          </Button>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
