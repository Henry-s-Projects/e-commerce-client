import { MenuItem, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

function Filters() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch('');
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <TextField
          label="Filters:"
          name="category"
          select
          value={category}
          sx={{ width: '300px', marginTop: '10px' }}
          onChange={handleCategory}
        >
          <MenuItem value="" key={1}>
            All Products
          </MenuItem>
          {categories.map((item) => (
            <MenuItem key={item._id} value={'category=' + item.name}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="row">
        <TextField
          label="Sort By:"
          name="sort"
          select
          value={sort}
          sx={{ width: '300px', margin: '0 28px', marginTop: '10px' }}
          onChange={(e) => setSort(e.target.value)}
        >
          <MenuItem value="sort=-createdAt">Newest</MenuItem>
          <MenuItem value="sort=-sold">Best sales</MenuItem>
          <MenuItem value="sort=-price">Price: High - Low</MenuItem>
          <MenuItem value="sort=price">Price: Low - High</MenuItem>
        </TextField>
      </div>
      <TextField
        value={search}
        placeholder="Enter your search!"
        onChange={(e) => setSearch(e.target.value)}
        sx={{ width: '300px', marginTop: '10px' }}
      />
    </div>
  );
}

export default Filters;
