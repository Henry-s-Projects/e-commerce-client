import React, { useContext, useInsertionEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, MenuItem, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'react-toastify';
import { Box } from '@mui/system';

const initialProduct = {
  product_id: '',
  title: '',
  description: '',
  price: '',
  content: '',
  category: '',
};

function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialProduct);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [products, setProducts] = state.productsAPI.products;

  const styleUpload = {
    display: images ? 'block' : 'none',
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return toast.warn('You are not admin');
      if (!images) return toast.warn('Please upload images');
      const res = await axios.post(
        process.env.REACT_APP_API_URL + 'product',
        { ...product, images },
        {
          headers: { Authorization: token, 'Access-Control-Allow-Origin': '*' },
        },
        {
          withCreditentials: true,
        }
      );
      console.log(res.data.payload);
      setProduct(initialProduct);
      setImages(false);
      setProducts([...products, res.data.payload]);
      toast.success('Product created');
      setTimeout(() => {
        window.location.href = '/';
      }, 2500);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return toast.warn('You are not admin');

      const file = e.target.files[0];

      if (!file) return toast.warn('File not found');

      if (file.size > 1024 * 1024 * 5)
        return toast.warn('File size is bigger than 5mb');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return toast.warn('File type is not supported');

      const formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      const res = await axios.post(
        process.env.REACT_APP_API_URL + 'product/upload',
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
          },
        },
        {
          withCreditentials: true,
        }
      );
      setLoading(false);
      setImages(res.data);
      toast.success('Image uploaded');
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleDestroy = async (e) => {
    try {
      if (!isAdmin) return toast.warn('You are not admin');
      setLoading(true);
      const res = await axios.post(
        process.env.REACT_APP_API_URL + 'product/destroy',
        { public_id: images.public_id },
        {
          headers: { Authorization: token, 'Access-Control-Allow-Origin': '*' },
        },
        {
          withCreditentials: true,
        }
      );
      setLoading(false);
      setImages(false);
      toast.success(res.data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          marginTop: '40px',
        }}
      >
        Create Product
      </Typography>
      <div className="create_product">
        <div className="upload">
          <input type="file" name="file" id="file_up" onChange={handleUpload} />
          {loading ? (
            <Box
              sx={{
                position: 'absolute',
                top: '32%',
                left: '35%',
              }}
            >
              <CircularProgress id="file_img" size={'9rem'} color={'info'} />
            </Box>
          ) : (
            <div id="file_img" style={styleUpload}>
              <img src={images ? images.url : ''} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
          )}
        </div>

        <form>
          <div className="row">
            <TextField
              label="Product ID"
              name="product_id"
              value={product.product_id}
              required
              sx={{ width: '500px' }}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <TextField
              label="Title"
              name="title"
              value={product.title}
              required
              sx={{ width: '500px' }}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <TextField
              label="Price"
              name="price"
              value={product.price}
              required
              sx={{ width: '500px' }}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <TextField
              label="Description"
              name="description"
              value={product.description}
              required
              rows={5}
              multiline
              sx={{ width: '500px' }}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <TextField
              label="Content"
              name="content"
              value={product.content}
              required
              rows={5}
              multiline
              sx={{ width: '500px' }}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <TextField
              label="Categories:"
              name="category"
              select
              value={product.category}
              required
              helperText="Please select a category"
              sx={{ width: '500px' }}
              onChange={handleChangeInput}
            >
              {categories.map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <Button
            type="submit"
            onClick={createProduct}
            variant="contained"
            sx={{ float: 'right' }}
          >
            Create
          </Button>
        </form>
      </div>
    </>
  );
}

export default CreateProduct;
