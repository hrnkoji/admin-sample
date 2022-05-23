import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

function Home({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
        Home
      </Typography>
    </div>
  );
}

export default styled(Home)`
  /* margin-top: 100px;
  margin-left: 100px; */
`;
