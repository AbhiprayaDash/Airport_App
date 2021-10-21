import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

class WelcomeComponent extends React.Component{
    render()
    {
        return(
            <Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Typography
                    component="h2"
                     variant="h5"
                    color="inherit"
                    align="left"
                    noWrap
                    sx={{ flex: 1 }}
                    >
                Airport Service
                </Typography>
                <Button variant="contained" style={{marginLeft:'15px',padding:'10px'}}>
                    <Link to="/" style={{ textDecoration: 'none',color:'white' }}>Home</Link>
                    </Button>
                    <Button variant="contained" style={{marginLeft:'15px',padding:'10px'}}>
                    <Link to="/airport" style={{ textDecoration: 'none',color:'white' }}>Airport</Link>
                    </Button>
                    <Button variant="contained" style={{marginLeft:'15px',padding:'10px'}}>
                    <Link to="/aircraft" style={{ textDecoration: 'none',color:'white' }}>Aircraft</Link>
                    </Button>
            </Toolbar>
            </Fragment>
        )
    }
}
export default WelcomeComponent