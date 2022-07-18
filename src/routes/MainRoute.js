import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/mainpages/auth/Login';
import Register from '../components/mainpages/auth/Register';
import Cart from '../components/mainpages/cart/Cart';
import DetailProduct from '../components/mainpages/detailProduct/DetailProduct';
import Products from '../components/mainpages/products/Products';
import NotFound from '../components/mainpages/utils/notFound/NotFound';
import { GlobalState } from '../GlobalState';

function MainRoute() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;

  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/detail/:id" element={<DetailProduct />}></Route>
      <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
      <Route
        path="/register"
        element={isLogged ? <NotFound /> : <Register />}
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default MainRoute;
