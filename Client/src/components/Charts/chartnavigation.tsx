import { FC, Fragment } from 'react';
import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import {NavLink} from 'react-router-dom'
import DescriptionIcon from '@mui/icons-material/Description';
import {  Modal, Paper } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

const ChartNavigation:FC = () => {
    return (
        <Fragment>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar" style={{float:'left'}}>
            <ul className="navbar-nav me-auto">
            <li className="nav-item">
            <ListItemIcon>
              <DashboardIcon style={{color:'white',fontSize:'25px'}}/>
              <NavLink to="/dashboard" style={{ textDecoration: 'none',color:'white'}}>
              <ListItemText primary={
                <span style={{fontSize:'20px'}}>
                    Dashboard
                </span> 
              }/>
            </NavLink>
            </ListItemIcon>
            </li>
            <li className="nav-item">
                <ListItemIcon>
                <DescriptionIcon style={{color:'white',fontSize:'25px'}}/>
                <NavLink to="/report" style={{ textDecoration: 'none',color:'white'}}>
                <ListItemText primary={
                    <span style={{fontSize:'20px'}}>
                        Report
                    </span> 
                }/>
                </NavLink>
                </ListItemIcon>
            </li>
            <li className="nav-item">
                <ListItemIcon>
                <LogoutIcon style={{color:'white',fontSize:'25px'}}/>
                <NavLink to="/logout" style={{ textDecoration: 'none',color:'white'}}>
                <ListItemText primary={
                    <span style={{fontSize:'20px'}}>
                    Logout
                    </span> 
                }/>
                </NavLink>
                </ListItemIcon>
            </li>
            </ul>
        </div>
        </div>
        </nav>
        </Fragment>
    )
    
};
export default ChartNavigation