import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + 'user/logout';

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const logoutUser = async () => {
    await axios.get(API_URL, { withCredentials: true });
    localStorage.clear();
    window.location.href = '/';
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <div className="menu">
        <MenuIcon />
      </div>
      <div className="logo">
        <h1>
          <a href="/">{isAdmin ? 'Admin' : 'HENRY SHOP'}</a>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link>
        </li>
        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login / Register </Link>
          </li>
        )}

        <li className="menu">
          <CloseIcon />
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
