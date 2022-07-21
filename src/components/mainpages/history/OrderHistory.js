import React, { useContext, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import TypoGraphy from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OrderHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

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
  }, [token, isAdmin]);

  return (
    <div className="history-page">
      <TypoGraphy
        variant="h3"
        sx={{
          textAlign: 'center',
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
              <th style={{ width: '53%' }}>Payment ID</th>
              <th style={{ width: '30%' }}>Date of Purchased</th>
              <th style={{ width: '17%' }}></th>
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
