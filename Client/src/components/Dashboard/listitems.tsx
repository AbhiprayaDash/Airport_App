import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import {NavLink} from 'react-router-dom'

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <NavLink to="/" style={{ textDecoration: 'none',color:'black'}}>
        <ListItemText primary="Home"/>
      </NavLink>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <NavLink to="/airport" style={{ textDecoration: 'none',color:'black'}}>
        <ListItemText primary="Add Airport" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <NavLink to="/aircraft" style={{ textDecoration: 'none',color:'black'}}>
      <ListItemText primary="Add Aircraft" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <NavLink to="/transaction" style={{ textDecoration: 'none',color:'black'}}>
      <ListItemText primary="Add Transaction" />
      </NavLink>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <NavLink to="/report" style={{ textDecoration: 'none',color:'black'}}>
      <ListItemText primary="Report" />
      </NavLink>
    </ListItem>
  </div>
);
