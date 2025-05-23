import React from "react";
import { Drawer, Toolbar, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
export default function Sidebar({ open, handleDrawerToggle }) {
    const drawerWidth = 240;
    const navigate = useNavigate();
    const routes = [
        { path: '/', name: 'Dashboard' },
        { path: '/profile', name: 'Profile' },
    ];
    const goTo = (path) => {
      navigate(path);
    };
    return (
        <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 60,
            transition: 'width 0.3s',
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {routes.map((route, index) => (
            <ListItem button key={route.name}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              {open && <ListItemText 
                            primary={route.name} 
                            onClick={() => goTo(route.path)}
                        />}
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
}