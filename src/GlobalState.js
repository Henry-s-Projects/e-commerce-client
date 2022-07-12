import React, { createContext } from 'react';

export const GlobalState = createContext();

export const DateProvider = ({ children }) => {
  return (
    <GlobalState.Provider value={'value'}>{children}</GlobalState.Provider>
  );
};
