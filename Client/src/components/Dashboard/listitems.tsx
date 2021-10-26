import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import {NavLink} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';

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
        <AddIcon />
      </ListItemIcon>
      <NavLink to="/airport" style={{ textDecoration: 'none',color:'black'}}>
        <ListItemText primary="Add Airport" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <NavLink to="/aircraft" style={{ textDecoration: 'none',color:'black'}}>
      <ListItemText primary="Add Aircraft" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <NavLink to="/transaction" style={{ textDecoration: 'none',color:'black'}}>
      <ListItemText primary="Add Transaction" />
      </NavLink>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <DescriptionIcon />
      </ListItemIcon>
      <NavLink to="/report" style={{ textDecoration: 'none',color:'black'}}>
      <ListItemText primary="Report" />
      </NavLink>
    </ListItem>
  </div>
);
