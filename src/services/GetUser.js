import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + 'user/getInfo';

function GetUser(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);

  const addCart = async (product) => {
    if (!isLogged) {
      toast.warn('You must be logged in to add to cart');
      return;
    }

    const check = cart.every((item) => item._id !== product._id);

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      toast.success('Product added to cart');

      await axios.patch(
        process.env.REACT_APP_API_URL + 'user/addCart',
        { cart: [...cart, { ...product, quantity: 1 }] },
        { headers: { Authorization: token } },
        { withCredentials: true }
      );
    } else {
      toast.warn('Product already in cart');
      return;
    }
  };

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get(
            process.env.REACT_APP_API_URL + 'payment',
            {
              headers: { Authorization: token },
            },
            {
              withCredentials: true,
            }
          );
          setHistory(res.data.payload);
        } else {
          const res = await axios.get(
            process.env.REACT_APP_API_URL + 'user/history',
            { headers: { Authorization: token } },
            { withCredentials: true }
          );
          setHistory(res.data.payload);
        }
      };
      getHistory();
    }
  }, [token, callback, isAdmin]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get(
            API_URL,
            { headers: { Authorization: token } },
            { withCredentials: true }
          );

          setIsLogged(true);
          res.data.payload.role === 'admin'
            ? setIsAdmin(true)
            : setIsAdmin(false);

          setCart(res.data.payload.cart);
        } catch (error) {
          toast.error(error.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
    callback: [callback, setCallback],
  };
}

export default GetUser;
