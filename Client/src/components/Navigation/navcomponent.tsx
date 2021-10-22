import React, { Fragment } from 'react'
import {NavLink} from 'react-router-dom'
import {isAuthenticated} from '../Auth/authservice'
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

class NavigationComponent extends React.Component
{
    render()
    {
        return(
            <Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider',color:'#0077b6',backgroundColor:'#edf6f9' }}>
                 <Typography
                    component="h1"
                     variant="h3"
                    color="inherit"
                    align="left"
                    noWrap
                    sx={{ flex: 1 }}
                    >
                    Airport Fuel Inventory App
                </Typography>
                {isAuthenticated()===null&&
                    <Button variant="contained" style={{marginLeft:'15px',padding:'10px'}}>
                    <NavLink to="/" style={{ textDecoration: 'none',color:'white'}}>Home</NavLink>
                    </Button>
                    
                }
                 <br/>
                {isAuthenticated()===null&&
                    <Button variant="contained" style={{marginLeft:'15px',padding:'10px'}}>
                      <NavLink to="/login" style={{ textDecoration: 'none',color:'white'}}>Login</NavLink>
                    </Button>
                
                }
                {isAuthenticated()===null&&
                    <Button variant="contained" style={{marginLeft:'15px',padding:'10px'}}>
                    <NavLink to="/signup" style={{ textDecoration: 'none',color:'white'}}>SignUp</NavLink>
                    </Button>
                    
                }
                 <br/>
                 
                 {isAuthenticated()&&
                
                    <Button variant="contained" style={{marginLeft:'15px',padding:'10px'}}>
                    <NavLink to="/welcome" style={{ textDecoration: 'none',color:'white'}}>Welcome</NavLink>
                    </Button>
                 }
                <br/>
                {isAuthenticated()&&
                    <Button variant="contained" style={{marginLeft:'15px',padding:'10px'}}>
                    <NavLink to="/logout" style={{ textDecoration: 'none',color:'white'}}>Log Out</NavLink>
                    </Button>
                }
                    <br/>
            </Toolbar>
            </Fragment>
        
        )
    }
}
export default NavigationComponent
   