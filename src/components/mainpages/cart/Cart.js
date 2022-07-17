import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import TypoGraphy from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import axios from 'axios';
import PaypalButton from './PaypalButton';

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState({
    status: false,
    product_id: '',
  });
  const [token] = state.token;

  const handleClickOpen = (id) => {
    setOpen({ status: true, product_id: id });
  };

  const handleClose = () => {
    setOpen({ status: false, product_id: '' });
  };

  useEffect(() => {
    const getTotal = () => {
      const totalPrice = cart.reduce(
        (prev, item) => prev + item.price * item.quantity,
        0
      );
      setTotal(totalPrice);
    };

    getTotal();
  }, [cart]);

  const addToCart = async () => {
    await axios.patch(
      process.env.REACT_APP_API_URL + 'user/addCart',
      { cart },
      {
        headers: { Authorization: token },
      },
      {
        withCredentials: true,
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity++;
      }
    });
    setCart([...cart]);
    addToCart();
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : item.quantity--;
      }
    });
    setCart([...cart]);
    addToCart();
  };

  const removeProduct = () => {
    cart.forEach((item, index) => {
      if (item._id === open.product_id) {
        cart.splice(index, 1);
      }
    });
    setCart([...cart]);
    setOpen({ status: false, product_id: '' });
    addToCart();
  };

  const tranSuccess = async (payment) => {
    console.log(payment);
  };

  if (cart.length === 0) {
    return (
      <TypoGraphy variant="h2" sx={{ textAlign: 'center', marginTop: '50px' }}>
        Cart Empty
      </TypoGraphy>
    );
  }
  return (
    <div>
      {cart.map((product) => {
        return (
          <div className="detail cart" key={product._id}>
            <img
              src={product.images.url}
              alt="product image"
              className="img_container"
            />
            <div className="box-detail">
              <h2>{product.title}</h2>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                $ {product.price * product.quantity}
              </Typography>
              <p>{product.description}</p>
              <p>{product.content}</p>
              <div className="amount">
                <button onClick={() => decrement(product._id)}>
                  <RemoveIcon />
                </button>
                <TypoGraphy
                  variant="h4"
                  sx={{ display: 'inline', margin: '0 20px' }}
                >
                  {product.quantity}
                </TypoGraphy>
                <button onClick={() => increment(product._id)}>
                  <AddIcon />
                </button>
              </div>
              <button
                className="delete"
                onClick={() => handleClickOpen(product._id)}
              >
                <ClearIcon sx={{ fontSize: '40px' }} />
              </button>
              <Dialog open={open.status} onClose={handleClose}>
                <DialogTitle>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Do you want to remove this product?
                  </Typography>
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleClose} variant="text">
                    No
                  </Button>
                  <Button onClick={() => removeProduct()} variant="contained">
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        );
      })}
      <div className="total">
        <TypoGraphy variant="h4" color={'crimson'} sx={{ fontWeight: 'bold' }}>
          Total: $ {total}
        </TypoGraphy>
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  );
}

export default Cart;
