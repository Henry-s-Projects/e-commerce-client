import React, { useState } from 'react';
import ButtonRender from './ButtonRender';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';

function ProductItem({
  product,
  isAdmin,
  token,
  products,
  setProducts,
  deleteProduct,
  loading,
  setCheck,
}) {
  const handleChecked = async () => {
    const newProducts = [...products];
    const index = newProducts.findIndex((item) => item._id === product._id);
    newProducts[index].checked = !newProducts[index].checked;
    setProducts(newProducts);
    setCheck(newProducts[index].checked);
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
