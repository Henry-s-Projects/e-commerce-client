import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import TypoGraphy from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

function Cart() {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);

  if (cart.length === 0) {
    return (
      <TypoGraphy variant="h2" sx={{ textAlign: 'center' }}>
        Cart Empty
      </TypoGraphy>
    );
  }
  return (
    <div>
      {cart.map((product) => {
        return (
          <div className="detail cart">
            <img
              src={product.images.url}
              alt="product image"
              className="img_container"
            />
            <div className="box-detail">
              <h2>{product.title}</h2>
              <span>$ {product.price * product.quantity}</span>
              <p>{product.description}</p>
              <p>{product.content}</p>
              <div className="amount">
                <button>
                  <RemoveIcon />
                </button>
                <TypoGraphy
                  variant="h4"
                  sx={{ display: 'inline', margin: '0 10px' }}
                >
                  {product.quantity}
                </TypoGraphy>
                <button>
                  <AddIcon />
                </button>
              </div>
              <div className="delete">
                <ClearIcon />
              </div>
            </div>
          </div>
        );
      })}
      <div className="total">
        <TypoGraphy variant="h5" color={'crimson'} sx={{ fontWeight: 'bold' }}>
          Total: $ {total}
        </TypoGraphy>
        <Link to="#!">Payment</Link>
      </div>
    </div>
  );
}

export default Cart;
