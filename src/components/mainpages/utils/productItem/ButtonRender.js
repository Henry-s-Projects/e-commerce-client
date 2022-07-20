import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GlobalState } from '../../../../GlobalState';

function ButtonRender({ product, deleteProduct, isAdmin }) {
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpen = () => {
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleDelete = async () => {
    try {
      if (!isAdmin) return toast.warn('You are not admin');
      setOpenPopup(false);
      await deleteProduct(product._id, product.images.public_id);
      toast.success('Product deleted');
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <Link id="btn_buy" to="#!" onClick={handleOpen}>
            Delete
          </Link>
          <Dialog open={openPopup} onClose={handleClose}>
            <DialogTitle>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Do you want to delete this product?
              </Typography>
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose} variant="text">
                No
              </Button>
              <Button onClick={handleDelete} variant="contained">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Link id="btn_view" to={`/edit_product/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
            Buy
          </Link>
          <Link id="btn_view" to={`/detail/${product._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
}

export default ButtonRender;
