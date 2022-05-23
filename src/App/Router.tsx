import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';

import Drawer, { DrawerHeader } from 'components/Drawer';
import Home from 'containers/Home';
import UserEdit from 'containers/UserEdit';
import Users from 'containers/Users';

function BaseRouter() {
  return (
    <OuterBox>
      <MainContainer maxWidth={false} disableGutters>
        <Drawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/:id" element={<UserEdit />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </MainContainer>
    </OuterBox>
  );
}

const OuterBox = styled(Box)`
  position: relative;
  display: flex;
  min-height: 100vh;
`;
const MainContainer = styled(Container)`
  display: flex !important;
`;
export default BaseRouter;
