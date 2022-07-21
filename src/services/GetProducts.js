import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + 'product';

function GetProducts() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(
        API_URL +
          `?itemsPerPage=${page * 9}&${category}&${sort}&title=${search}`,
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        },
        {
          withCredentials: true,
        }
      );
      setProducts(response.data.payload);
      setResult(response.data.result);
    };
    getProducts();
  }, [category, sort, search, page]);

  return {
    products: [products, setProducts],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default GetProducts;
