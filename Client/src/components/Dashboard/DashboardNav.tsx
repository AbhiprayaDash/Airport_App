import { FC, Fragment } from 'react';
import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import {NavLink} from 'react-router-dom'
import DescriptionIcon from '@mui/icons-material/Description';
import {  Modal, Paper } from '@mui/material';
import AirportForm from '../Airport/airportform';
import AircraftForm from '../Airport/aircraftform';
import TransactionForm from '../Transaction/transactionform';

const DashboardNavigation:FC = () => {
    const [OpenAirport, setOpenfuncAirport] = React.useState(false);
    const handleOpenAirport = () => setOpenfuncAirport(true);
    const handleCloseAirport = () => setOpenfuncAirport(false);
    const [OpenAircraft, setOpenfuncAircraft] = React.useState(false);
    const handleOpenAircraft= () => setOpenfuncAircraft(true);
    const handleCloseAircraft = () => setOpenfuncAircraft(false);
    const [OpenTransaction, setOpenfuncTransaction] = React.useState(false);
    const handleOpenTransaction = () => setOpenfuncTransaction(true);
    const handleCloseTransaction = () => setOpenfuncTransaction(false);
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                      <Modal
                        open={OpenAirport}
                        onClose={handleCloseAirport}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Paper style={{width:'70%',height:'600px',maxHeight:'550px',maxWidth:'500px',marginRight:'auto',marginLeft:'auto',marginTop:'10%',marginBottom:'auto'}}>
                        <AirportForm/>
                        </Paper>
                      </Modal>
                    </div>
                </div>
            </div>
            
          <Modal
            open={OpenAircraft}
            onClose={handleCloseAircraft}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Paper style={{width:'70%',height:'600px',maxHeight:'350px',maxWidth:'500px',marginRight:'auto',marginLeft:'auto',marginTop:'10%'}}>
            <AircraftForm/>
            </Paper>
          </Modal>
          <Modal
            open={OpenTransaction}
            onClose={handleCloseTransaction}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Paper style={{width:'70%',height:'600px',maxHeight:'500px',maxWidth:'500px',marginRight:'auto',marginLeft:'auto',marginTop:'10%',marginBottom:'auto'}}>
            <TransactionForm/>
            </Paper>
          </Modal>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar" style={{float:'left'}}>
            <ul className="navbar-nav me-auto">
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
                <DescriptionIcon style={{color:'white',fontSize:'25px'}}/>
                <NavLink to="/chart" style={{ textDecoration: 'none',color:'white'}}>
                <ListItemText primary={
                    <span style={{fontSize:'20px'}}>
                        Chart Report
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
            <li className="nav-item">
                <button type="button" className="btn btn-light" onClick={handleOpenAirport} style={{padding:'8px',width:'150px',float:'left',marginBottom:'5px'}}>Add Airport</button>
            </li>
            <li className="nav-item">
                <button type="button" className="btn btn-light" onClick={handleOpenAircraft} style={{padding:'8px',width:'150px',float:'left',marginBottom:'5px'}}>Add Aircraft</button>
            </li>
            <li className="nav-item">
                <button type="button" className="btn btn-light" onClick={handleOpenTransaction} style={{padding:'8px',width:'150px',marginBottom:'5px'}}>Add Transaction</button>
            </li>
            </ul>
        </div>
        </div>
        </nav>
        </Fragment>
    )
    
};
export default DashboardNavigation