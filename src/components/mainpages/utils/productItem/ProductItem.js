import React, { useState } from 'react';
import ButtonRender from './ButtonRender';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';

function ProductItem({ product, isAdmin, token, setProducts }) {
  const [loading, setLoading] = useState(false);

  const handleChecked = (e) => {};

  const deleteProduct = async () => {
    try {
      if (!isAdmin) return toast.warn('You are not admin');
      setLoading(true);

      const destroyImg = await axios.post(
        process.env.REACT_APP_API_URL + 'product/destroy',
        {
          public_id: product.images.public_id,
        },
        {
          headers: {
            Authorization: token,
            'Access-Control-Allow-Origin': '*',
          },
        },
        {
          withCreditentials: true,
        }
      );

      const deleteProduct = await axios.delete(
        process.env.REACT_APP_API_URL + 'product/' + product._id,
        {
          headers: {
            Authorization: token,
            'Access-Control-Allow-Origin': '*',
          },
        },
        {
          withCreditentials: true,
        }
      );
      setLoading(false);
      toast.success(deleteProduct.data.msg);
      setProducts(deleteProduct.data.payload);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          alignItems: 'center',
          textAlign: 'center',
          marginTop: '50px',
        }}
      >
        <CircularProgress size={'6rem'} color={'info'} />
      </Box>
    );

  return (
    <div className="product_card">
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={handleChecked}
        />
      )}
      <img src={product.images.url} alt="product img" />
      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>

      <ButtonRender
        product={product}
        deleteProduct={deleteProduct}
        isAdmin={isAdmin}
      />
    </div>
  );
}

export default ProductItem;
