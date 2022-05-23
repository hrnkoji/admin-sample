import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Box, Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React from 'react';

function Header() {
  const [accountMenuAnchor, setAccountMenuAnchor] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const [notiMenuAnchor, setNotiMenuAnchor] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const [helpMenuAnchor, setHelpMenuAncho] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const handleLogout = async () => {
    console.log('logout');
  };

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          mr: 3,
          lineHeight: 1,
        }}
      >
        <IconButton
          color="inherit"
          onClick={(event) => {
            setAccountMenuAnchor(event.currentTarget);
          }}
        >
          <AccountCircleIcon />
        </IconButton>
        <br />
        <Box sx={{ typography: 'subtitle2', fontSize: '8px' }}>アカウント管理</Box>
        <Menu
          id="account-appbar"
          anchorEl={accountMenuAnchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(accountMenuAnchor)}
          onClose={() => setAccountMenuAnchor(null)}
        >
          <MenuItem onClick={() => setAccountMenuAnchor(null)}>Profile</MenuItem>
          <MenuItem
            onClick={async () => {
              setAccountMenuAnchor(null);
              await handleLogout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
      <Box
        sx={{
          textAlign: 'center',
          mr: 3,
          lineHeight: 1,
        }}
      >
        <IconButton
          color="inherit"
          onClick={(event) => {
            setNotiMenuAnchor(event.currentTarget);
          }}
        >
          <NotificationsNoneIcon />
        </IconButton>
        <br />
        <Box sx={{ typography: 'subtitle2', fontSize: '8px' }}>お知らせ</Box>
        <Menu
          id="noti-appbar"
          anchorEl={notiMenuAnchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(notiMenuAnchor)}
          onClose={() => setNotiMenuAnchor(null)}
        >
          <MenuItem onClick={() => setNotiMenuAnchor(null)}>Item 1</MenuItem>
          <MenuItem onClick={() => setNotiMenuAnchor(null)}>Item 2</MenuItem>
        </Menu>
      </Box>
      <Box
        sx={{
          textAlign: 'center',
          mr: 3,
          lineHeight: 1,
        }}
      >
        <IconButton
          color="inherit"
          onClick={(event) => {
            setNotiMenuAnchor(event.currentTarget);
          }}
        >
          <HelpOutlineIcon />
        </IconButton>
        <br />
        <Box sx={{ typography: 'subtitle2', fontSize: '8px' }}>ヘルプ</Box>
        <Menu
          id="noti-appbar"
          anchorEl={helpMenuAnchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(helpMenuAnchor)}
          onClose={() => setHelpMenuAncho(null)}
        >
          <MenuItem onClick={() => setHelpMenuAncho(null)}>Item 1</MenuItem>
          <MenuItem onClick={() => setHelpMenuAncho(null)}>Item 2</MenuItem>
        </Menu>
      </Box>
    </>
  );
}

export default Header;
