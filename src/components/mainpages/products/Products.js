import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpen = () => {
    if (!check) return toast.warn('Please select at least one product');
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const deleteProduct = async (id, public_id) => {
    await axios.post(
      process.env.REACT_APP_API_URL + 'product/destroy',
      {
        public_id: public_id,
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
      process.env.REACT_APP_API_URL + `product/${id}`,
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
    setProducts(deleteProduct.data.payload);
  };

  const checkAll = () => {
    products.forEach((item) => {
      item.checked = true;
    });
    setProducts([...products]);
    setCheck(true);
  };

  const unCheckAll = () => {
    products.forEach((item) => {
      item.checked = false;
    });
    setProducts([...products]);
    setCheck(false);
  };

  const deleteAll = async () => {
    setOpenPopup(false);
    try {
      if (!isAdmin) return toast.warn('You are not admin');
      if (!check) return toast.warn('Please select at least one product');
      setLoading(true);
      await products.forEach(async (item) => {
        if (item.checked) {
          await deleteProduct(item._id, item.images.public_id);
        }
      });
      const remainProducts = await products.filter((item) => !item.checked);
      setLoading(false);
      setProducts(remainProducts);
      toast.success('Seleted products deleted');
      setCheck(false);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      {isAdmin && (
        <div className="delete-all">
          <Button
            variant="outlined"
            onClick={checkAll}
            sx={{ margin: '0 10px' }}
          >
            Select All
          </Button>
          <Button
            variant="outlined"
            onClick={unCheckAll}
            sx={{ margin: '0 10px' }}
          >
            Uncheck All
          </Button>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              margin: '0 10px',
              background: 'red',
              ':hover': {
                background: 'red',
              },
              color: 'white',
            }}
          >
            <DeleteIcon />
          </Button>
          <Dialog open={openPopup} onClose={handleClose}>
            <DialogTitle>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Do you want to delete these seleted products?
              </Typography>
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose} variant="text">
                No
              </Button>
              <Button onClick={deleteAll} variant="contained">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              token={token}
              products={products}
              setProducts={setProducts}
              deleteProduct={deleteProduct}
              loading={loading}
              setCheck={setCheck}
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
