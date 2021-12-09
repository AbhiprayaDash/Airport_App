import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {  Paper, Typography } from '@mui/material';
import DashboardNavigation from './DashboardNav';
import MediaQuery from "react-responsive";
import { useAppSelector,useAppDispatch } from '../../hooks';
import { SidebarData } from './SidebarData';
import { headersData } from './navheaderdata';
import { Aircraftcolumns, Airportcolumns, Transactioncolumns } from '../Airport/tabledata';
import TableComponent from '../table/table';
import { Loaddata } from '../../services/dashboardservice';


const Dashboard = ()=> {
    const Aircraftres:any = useAppSelector((state:any) => state.Aircraft.response);
    const Airportres:any = useAppSelector((state:any) => state.Airport.response);
    const Transactionres:any = useAppSelector((state:any) => state.Transaction.response);
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        Loaddata(Aircraftres,Airportres,Transactionres,dispatch)
    }, []);
    return (
          <React.Fragment>     
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <DashboardNavigation SidebarData={SidebarData} headersData={headersData}/>
              </div>
              <br/><br/>
              </div>
                <div className="row">
                  <div className="col-12">
                          <Box
                                component="main"
                                sx={{
                                  backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                      ? theme.palette.grey[100]
                                      : theme.palette.grey[900],
                                  height: '100%',
                            }}
                          >
                            <Toolbar />
                            
                            <MediaQuery minWidth={1200}>
                            <div className="row">
                              <div className="col-2">

                              </div>
                            <div className="col-4">
                            <Paper>
                            <Typography
                                component="h1"
                                variant="h3"
                                color="inherit"
                                align="center"
                                style={{fontWeight:"bold"}}
                                noWrap
                                sx={{ flex: 1 }}
                                fontFamily="Roboto"
                            >
                                Aircraft Details
                            </Typography>
                              <TableComponent response={Aircraftres.slice(0,5)} columns={Aircraftcolumns}/>
                            </Paper>
                            </div>
                            <div className="col-6">
                            <Paper>
                            <Typography
                                component="h1"
                                variant="h3"
                                color="inherit"
                                align="center"
                                style={{fontWeight:"bold"}}
                                noWrap
                                sx={{ flex: 1 }}
                                fontFamily="Roboto"
                            >
                                Airport Details
                            </Typography>
                              <TableComponent response={Airportres.slice(0,5)} columns={Airportcolumns}/>
                            </Paper>
                                
                            </div>
                            </div>
                            </MediaQuery>
                            <MediaQuery maxWidth={600}>
                            <div className="row">
                            <div className="col-12">
                              <TableComponent response={Airportres.slice(0,5)} columns={Airportcolumns}/>
                            </div>
                            </div>
                            </MediaQuery>
                            <br/><br/>
                            <MediaQuery maxWidth={600}>
                              <div className="row">
                              <div className="col-12">
                                <TableComponent response={Aircraftres.slice(0,5)} columns={Aircraftcolumns}/>
                              </div>
                              </div>
                            </MediaQuery>
                            <br/><br/>
                            <MediaQuery minWidth={1200}>
                              <div className="row">
                              <div className="col-2">

                              </div>
                              <div className="col-10">
                                <Paper>
                                <Typography
                                  component="h1"
                                  variant="h3"
                                  color="inherit"
                                  align="center"
                                  style={{fontWeight:"bold"}}
                                  noWrap
                                  sx={{ flex: 1 }}
                                  fontFamily="Roboto"
                              >
                                Transaction Details
                              </Typography>
                                <TableComponent response={Transactionres.slice(0,5)} columns={Transactioncolumns}/>
                                </Paper>
                              </div>
                              </div>
                            </MediaQuery>
                            <MediaQuery maxWidth={600}>
                            <div className="row">
                            <div className="col-12">
                                <TableComponent response={Transactionres.slice(0,5)} columns={Transactioncolumns}/>
                            </div>
                            </div>
                            </MediaQuery>
                            
                          </Box>
                        
                  </div>
                </div>
           </div>
          </React.Fragment>
    );
  }
export default Dashboard