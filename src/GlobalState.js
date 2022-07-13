import React, { createContext, useState } from 'react';
import GetProducts from './services/GetProducts';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const state = {
    token: [token, setToken],
    productsAPI: GetProducts(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
