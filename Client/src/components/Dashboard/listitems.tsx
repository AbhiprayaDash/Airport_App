import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import {NavLink} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';

export const mainListItems = (
  <div>
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
    <ListItem button>
      <ListItemIcon>
        <DescriptionIcon />
      </ListItemIcon>
      <NavLink to="/chart" style={{ textDecoration: 'none',color:'black'}}>
      <ListItemText primary="Chart Report" />
      </NavLink>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <NavLink to="/logout" style={{ textDecoration: 'none',color:'black'}}>
      <ListItemText primary="logout" />
      </NavLink>
    </ListItem>
  </div>
);
