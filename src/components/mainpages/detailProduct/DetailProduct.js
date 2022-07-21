import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [detailProduct, setDetailProduct] = useState([]);
  const addCart = state.userAPI.addCart;

  useEffect(() => {
    if (params.id) {
      const product = products.find((product) => product._id === params.id);
      if (typeof product !== 'undefined') {
        setDetailProduct(product);
      }
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  return (
    <React.Fragment>
      <div className="detail">
        <img src={detailProduct.images.url} alt="product image" />
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.title}</h2>
            <h6>#id: {detailProduct.product_id}</h6>
          </div>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            $ {detailProduct.price}
          </Typography>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Sold: {detailProduct.sold}</p>
          <Link
            to="/cart"
            className="cart"
            onClick={() => addCart(detailProduct)}
          >
            Buy Now
          </Link>
        </div>
      </div>
      <div style={{ marginTop: '25px' }}>
        <h2>Related products</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default DetailProduct;
