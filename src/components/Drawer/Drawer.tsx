import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { Theme } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';

import Header from 'components/Header';

type Props = { theme?: Theme; open: boolean };
type Style = { [key: string]: string | number };

const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: Props) => {
  const style = {
    zIndex: theme!.zIndex.drawer + 1,
    transition: theme!.transitions.create(['width', 'margin'], {
      easing: theme!.transitions.easing.sharp,
      duration: theme!.transitions.duration.leavingScreen,
    }),
  };

  const openStyle = open
    ? {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme!.transitions.create(['width', 'margin'], {
          easing: theme!.transitions.easing.sharp,
          duration: theme!.transitions.duration.enteringScreen,
        }),
      }
    : {};

  return {
    ...style,
    ...openStyle,
  };
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: Props): Style => {
  const style = {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
  };

  const openStyle = theme
    ? {
        ...openedMixin(theme!),
        '& .MuiDrawer-paper': openedMixin(theme),
      }
    : {};

  const closeStyle = theme
    ? {
        ...closedMixin(theme!),
        '& .MuiDrawer-paper': closedMixin(theme),
      }
    : {};

  return open ? { ...style, ...openStyle } : { ...style, ...closeStyle };
});
type RouteType = {
  label: string;
  link: string;
  isDivider?: boolean;
  icon?: JSX.Element;
};
const routes: RouteType[] = [
  {
    label: 'ホーム',
    link: '/',
    icon: <HomeIcon />,
  },
  {
    label: '',
    link: '',
    isDivider: true,
  },
  {
    label: 'ユーザー一覧',
    link: '/users',
    icon: <GroupIcon />,
  },
];

function SideMenu() {
  const theme = useTheme();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" open={open} color="secondary">
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            color="inherit"
            sx={{
              marginRight: '34px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Sample
          </Typography>
          <Header />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {routes.map((e, index) => {
            if (e.isDivider) return <Divider key={`drawer-link-${index}`} />;
            return (
              <ListItem button component={Link} to={e.link} key={`drawer-link-${index}`}>
                <ListItemIcon>{e.icon}</ListItemIcon>
                <ListItemText>{e.label}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
export default styled(SideMenu)``;
