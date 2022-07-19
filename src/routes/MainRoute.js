import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/mainpages/auth/Login';
import Register from '../components/mainpages/auth/Register';
import Cart from '../components/mainpages/cart/Cart';
import DetailProduct from '../components/mainpages/detailProduct/DetailProduct';
import Products from '../components/mainpages/products/Products';
import NotFound from '../components/mainpages/utils/notFound/NotFound';
import { GlobalState } from '../GlobalState';
import OrderHistory from '../components/mainpages/history/OrderHistory';
import OrderDetail from '../components/mainpages/history/OrderDetail';
import Categories from '../components/mainpages/categories/Categories';
import CreateProduct from '../components/mainpages/createProduct/CreateProduct';

function MainRoute() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

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
      <Route
        path="/history"
        element={isLogged ? <OrderHistory /> : <NotFound />}
      />
      <Route
        path="/category"
        element={isAdmin ? <Categories /> : <NotFound />}
      />
      <Route
        path="/create_product"
        element={isAdmin ? <CreateProduct /> : <NotFound />}
      />
      <Route
        path="/edit_product/:id"
        element={isAdmin ? <CreateProduct /> : <NotFound />}
      />
      <Route
        path="/history/:id"
        element={isLogged ? <OrderDetail /> : <NotFound />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default MainRoute;
