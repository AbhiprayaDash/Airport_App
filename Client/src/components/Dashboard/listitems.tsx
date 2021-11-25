import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import {NavLink} from 'react-router-dom'
import DescriptionIcon from '@mui/icons-material/Description';
import { Typography } from '@mui/material';

export const mainListItems = (
  <div>

    <ListItem button>
      <ListItemIcon>
        <DescriptionIcon />
      </ListItemIcon>
      <NavLink to="/report" style={{ textDecoration: 'none',color:'black'}}>
      <ListItemText primary={
        <span style={{fontSize:'20px'}}>
          Report
        </span> 
      }/>
      </NavLink>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DescriptionIcon />
      </ListItemIcon>
      <NavLink to="/chart" style={{ textDecoration: 'none',color:'black'}}>
      <ListItemText primary={
        <span style={{fontSize:'20px'}}>
          Chart Report
        </span> 
      } />
      </NavLink>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <NavLink to="/logout" style={{ textDecoration: 'none',color:'black'}}>
      <ListItemText primary={
        <span style={{fontSize:'20px'}}>
          Logout
        </span> 
      }/>
      </NavLink>
    </ListItem>
  </div>
);
