import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + 'product';

function GetProducts() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get(API_URL);
    setProducts(response.data.payload);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { products: [products, setProducts] };
}

export default GetProducts;
