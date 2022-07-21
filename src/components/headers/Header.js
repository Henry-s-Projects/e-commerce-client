import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL + 'user/logout';

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get(API_URL, { withCredentials: true });
    localStorage.clear();
    window.location.href = '/';
  };

  const adminRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/history">History</Link>
        </li>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const toggleMenu = () => setMenu(!menu);
  const styleMenu = {
    left: menu ? 0 : '-100%',
  };

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <MenuIcon />
      </div>
      <div className="logo">
        <h1>
          <a href="/">{isAdmin ? 'Admin' : 'HENRY SHOP'}</a>
        </h1>
      </div>
      <ul style={styleMenu}>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link>
        </li>
        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li onClick={() => setMenu(!menu)}>
            <Link to="/login">Login / Register </Link>
          </li>
        )}

        <li className="menu" onClick={() => setMenu(!menu)}>
          <Button sx={{ position: 'absolute', right: '15px', top: '15px' }}>
            <CloseIcon sx={{ color: 'black' }} />
          </Button>
        </li>
      </ul>
      {!isAdmin && (
        <Link to="/cart">
          <div className="cart-icon">
            <span>{cart.length}</span>
            <ShoppingCartIcon />
          </div>
        </Link>
      )}
    </header>
  );
}

export default Header;
