import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  return (
    <>
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              token={token}
              setProducts={setProducts}
            />
          );
        })}
      </div>
      {products.length === 0 && (
        <Box
          sx={{ alignItems: 'center', paddingLeft: '46%', paddingTop: '50px' }}
        >
          <CircularProgress size={'8rem'} color={'inherit'} />
        </Box>
      )}
    </>
  );
}

export default Products;
