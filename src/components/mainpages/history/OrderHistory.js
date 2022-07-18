import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import TypoGraphy from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function OrderHistory() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <div className="history-page">
      <TypoGraphy
        variant="h3"
        sx={{
          textAlign: 'center',
          marginTop: '20px',
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
      >
        History
      </TypoGraphy>

      <TypoGraphy
        variant="h5"
        sx={{
          textAlign: 'center',
          margin: '15px 0',
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
      >
        {isAdmin
          ? `There are  ${history.length}  orders`
          : `You have  ${history.length}  ordered`}
      </TypoGraphy>

      <div>
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date of Purchased</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item._id}>
                <td>{item.paymentID}</td>
                <td>{new Date(item.createdAt).toLocaleDateString('en-GB')}</td>
                <td>
                  <Link to={`/history/${item._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;
