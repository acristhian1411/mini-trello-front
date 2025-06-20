import React,{useMemo} from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import {Outlet} from 'react-router-dom'
import Sidebar from './Sidebar';
const drawerWidth = 240;
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function Layout({ darkMode, toggleDarkMode, children }) {
  // const theme = useTheme();
  const [open, setOpen] = React.useState(true);
   const theme = useMemo(
        () =>
          createTheme({
            palette: {
              mode: darkMode ? 'dark' : 'light',
            },
          }),
        [darkMode]
      );
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
          ml: open ? `${drawerWidth}px` : 0,
          transition: 'all 0.3s',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
             <span onClick={handleDrawerToggle}>Mini Trello</span>
            </Typography>
          </Box>

          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Sidebar 
        open={open}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* Main */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
        }}
      >
        <Toolbar />
        <Outlet/>
      </Box>
    </Box>
    </ThemeProvider>
  );
}
