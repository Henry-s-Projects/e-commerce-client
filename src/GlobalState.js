import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import GetProducts from './services/GetProducts';
import GetUser from './services/GetUser';
import GetCategories from './services/GetCategories';

export const GlobalState = createContext();

const API_URL = process.env.REACT_APP_API_URL + 'user/refresh_token';

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    const res = await axios.get(API_URL, { withCredentials: true });
    setToken(res.data.accessToken);
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    productsAPI: GetProducts(),
    userAPI: GetUser(token),
    categoriesAPI: GetCategories(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
