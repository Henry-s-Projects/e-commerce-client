import axios from 'axios';
import { useEffect, useState } from 'react';

function GetCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(process.env.REACT_APP_API_URL + 'category', {
        withCredentials: true,
      });
      setCategories(res.data.payload);
    };
    getCategories();
  }, []);

  return {
    categories: [categories, setCategories],
  };
}

export default GetCategories;
