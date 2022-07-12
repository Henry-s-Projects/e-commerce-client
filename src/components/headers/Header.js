import React, { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

function Header() {
  const value = useContext(GlobalState);

  console.log(value);
  return (
    <header>
      <div className="menu">
        <MenuIcon />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">HENRY SHOP</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/login">Login / Register </Link>
        </li>
        <li>
          <CloseIcon />
        </li>
      </ul>
      <div className="cart-icon">
        <span>0</span>
        <ShoppingCartIcon />
      </div>
    </header>
  );
}

export default Header;
