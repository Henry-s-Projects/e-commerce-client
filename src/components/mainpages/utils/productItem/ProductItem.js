import React, { useState } from 'react';
import ButtonRender from './ButtonRender';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Box } from '@mui/system';
import { Checkbox, CircularProgress } from '@mui/material';
import { blue, pink } from '@mui/material/colors';

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
        <Checkbox
          checked={product.checked}
          onChange={handleChecked}
          sx={{
            position: 'absolute',
            right: '15px',
            top: '15px',
            width: '25px',
            height: '25px',
            '& .MuiSvgIcon-root': { fontSize: 30 },
          }}
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
