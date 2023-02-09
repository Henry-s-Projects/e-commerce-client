import { Button, Pagination } from '@mui/material';
import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsAPI.page;
  const [amountPage] = state.productsAPI.amountPage;

  return (
    <div className="load_more">
      <Pagination
        count={amountPage}
        shape="rounded"
        showFirstButton
        showLastButton
        onChange={(e, value) => {
          window.scrollTo(0, 0);
          setPage(value);
        }}
        size="large"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
      />
    </div>
  );
}

export default LoadMore;
