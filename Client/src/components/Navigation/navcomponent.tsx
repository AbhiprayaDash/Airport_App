import React, { Fragment } from 'react'
import {NavLink,Link} from 'react-router-dom'
import { isAuthenticated } from "../../services/authservice";
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';

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
                    fontFamily="Roboto"
                    align="left"
                    noWrap
                    sx={{ flex: 1 }}
                    >
                    Airport Fuel Inventory App
                </Typography>
                    {isAuthenticated()&&
                        <Button variant="contained" style={{marginLeft:'15px',padding:'10px'}}>
                            <DashboardIcon/>
                            <Link to="/dashboard" style={{ textDecoration: 'none',color:'white' }}>Dashboard</Link>
                        </Button>
                    }
                    {/* {isAuthenticated()===null&&
                        <Button variant="contained" style={{marginLeft:'15px',padding:'10px'}}>
                            <HomeIcon/>
                            <NavLink to="/" style={{ textDecoration: 'none',color:'white'}}>Home</NavLink>
                        </Button>
                    } */}
                    {isAuthenticated()===null&&
                        <Button variant="contained" style={{marginLeft:'15px',padding:'10px'}}>
                            <LoginSharpIcon/>
                            <NavLink to="/login" style={{ textDecoration: 'none',color:'white'}}>Login</NavLink>
                        </Button>
                    }
                    {isAuthenticated()===null&&
                        <Button variant="contained" style={{marginLeft:'15px',padding:'10px'}}>
                            <AppRegistrationSharpIcon/>
                        <NavLink to="/signup" style={{ textDecoration: 'none',color:'white'}}>SignUp</NavLink>
                        </Button>
                        
                    }
                    <br/>
                    {isAuthenticated()&&
                        <Button variant="contained" style={{marginLeft:'15px',padding:'10px'}}>
                            <LogoutIcon/>
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
   