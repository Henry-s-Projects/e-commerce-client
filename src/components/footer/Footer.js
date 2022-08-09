import { Divider, Typography } from '@mui/material';
import React from 'react';

function Footer() {
  return (
    <>
      <Divider sx={{ marginTop: '1rem' }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '1rem 0',
        }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
          About
        </Typography>
        <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
          Account
        </Typography>
        <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
          Resource
        </Typography>
      </div>
    </>
  );
}

export default Footer;
