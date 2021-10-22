import React from "react"
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

class WelcomenavComponent extends React.Component
{
    render(){
        return(
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider',color:'#0077b6',backgroundColor:'#edf6f9'}}>
            <Typography
                    component="h1"
                     variant="h3"
                    color="inherit"
                    align="left"
                    noWrap
                    sx={{ flex: 1 }}
                    >
                Welcome to Airport Service
                </Typography>
                    <Button variant="contained" style={{marginLeft:'15px',padding:'10px'}}>
                    <Link to="/" style={{ textDecoration: 'none',color:'white' }}>Home</Link>
                    </Button>
                    <Button variant="contained" style={{marginLeft:'15px',padding:'10px'}}>
                    <Link to="/dashboard" style={{ textDecoration: 'none',color:'white' }}>Dashboard</Link>
                    </Button>
            </Toolbar>
        )
    }
}
export default WelcomenavComponent
