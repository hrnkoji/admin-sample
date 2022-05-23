import Box from '@mui/material/Box';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import BaseRouter from './Router';

function App() {
  return (
    <Box className={`app`}>
      <Router>
        <BaseRouter />
      </Router>
    </Box>
  );
}

export default App;
