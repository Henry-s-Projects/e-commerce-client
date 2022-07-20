import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material';
import axios from 'axios';

function Categories() {
  const state = useContext(GlobalState);
  const [categories, setCategories] = state.categoriesAPI.categories;
  const [token] = state.token;
  const [category, setCategory] = useState('');
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState('');
  const [openPopup, setOpenPopup] = useState(false);

  const submitCategory = async (e) => {
    e.preventDefault();
    if (category === '') {
      toast.warn('Please fill in all fields');
    } else if (onEdit) {
      await axios.put(
        process.env.REACT_APP_API_URL + 'category/' + id,
        {
          name: category,
        },
        {
          headers: { Authorization: token },
        },
        {
          withCredentials: true,
        }
      );
      toast.success('Category updated');
      const newCategories = [...categories];
      newCategories.forEach((item) => {
        if (item._id === id) {
          item.name = category;
        }
      });
      setCategories(newCategories);
      setOnEdit(false);
      setId('');
      setCategory('');
    } else {
      try {
        const res = await axios.post(
          process.env.REACT_APP_API_URL + 'category',
          {
            name: category,
          },
          {
            headers: { Authorization: token },
          },
          {
            withCredentials: true,
          }
        );
        toast.success('Category added');
        setCategories([...categories, res.data.payload]);
        setCategory('');
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const editCategory = async (category) => {
    setCategory(category.name);
    setOnEdit(true);
    setId(category._id);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleOpenPopup = (category) => {
    setId(category._id);
    setOpenPopup(true);
  };

  const deleteCategory = async () => {
    try {
      await axios.delete(
        process.env.REACT_APP_API_URL + 'category/' + id,
        {
          headers: { Authorization: token },
        },
        {
          withCredentials: true,
        }
      );
      toast.success('Category deleted');
      const newCategories = [...categories];
      newCategories.forEach((item, index) => {
        if (item._id === id) {
          newCategories.splice(index, 1);
        }
      });
      setCategories(newCategories);
      setOpenPopup(false);
      setId('');
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="categories">
      <form>
        <TextField
          label="Category"
          variant="standard"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Button type="submit" onClick={submitCategory} variant="contained">
          {onEdit ? 'Update' : 'Save'}
        </Button>
      </form>
      <div className="col">
        {categories.map((item) => (
          <div className="row" key={item._id}>
            <p>{item.name}</p>
            <div>
              <Button
                variant="outlined"
                sx={{ marginRight: '10px' }}
                onClick={() => editCategory(item)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() => handleOpenPopup(item)}
                sx={{ ':hover': { background: 'red' }, background: 'red' }}
              >
                Delete
              </Button>
              <Dialog open={openPopup} onClose={handleClose}>
                <DialogTitle>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Do you want to delete this category?
                  </Typography>
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleClose} variant="text">
                    No
                  </Button>
                  <Button onClick={() => deleteCategory()} variant="contained">
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
