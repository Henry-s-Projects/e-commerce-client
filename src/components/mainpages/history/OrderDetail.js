import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';

function OrderDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetails, setOrderDetails] = useState([]);
  let totalPrice = 0;

  useEffect(() => {
    if (params.id) {
      const historyItem = history.find((item) => item._id === params.id);
      if (typeof historyItem !== 'undefined') {
        setOrderDetails(historyItem);
      }
    }
  }, [params.id, history]);

  if (orderDetails.length === 0) return null;

  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetails.address.recipient_name}</td>
            <td>
              {orderDetails.address.line1 + ' - ' + orderDetails.address.city}
            </td>
            <td>{orderDetails.address.postal_code}</td>
            <td>{orderDetails.address.country_code}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ margin: '50px 0' }}>
        <thead>
          <tr>
            <th>Ordinal Number</th>
            <th>Product Image</th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.cart.map((item, index) => {
            totalPrice += item.price * item.quantity;
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <img src={item.images.url} alt="Product image" />
                </td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>$ {item.price * item.quantity}</td>
              </tr>
            );
          })}
          <tr>
            <td style={{ fontWeight: 'bold', color: 'crimson' }}>Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ color: 'crimson' }}>$ {totalPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetail;
