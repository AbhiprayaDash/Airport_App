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
import moment from 'moment';
import { DoughnutData } from '../Charts/displaychart';
import { Totaltransaction } from '../Charts/comparisiontable';

type PropTypes={
  SidebarData:Array<any>,
  headersData:Array<any>,
  history:any
}

const Dashboard:React.FC<PropTypes> = (props:PropTypes)=> {
    const Aircraftres:any = useAppSelector((state:any) => state.Aircraft.response);
    const Airportres:any = useAppSelector((state:any) => state.Airport.response);
    var filteredAirportres = [...Airportres].map((response:any)=>{
        let res:any = Object.assign({}, response);
        res.fuelavailable+=' L'
        return res;
    })
    const Transactionres:any = useAppSelector((state:any) => state.Transaction.response);
    var Responsecopy:Array<any> = [...Transactionres]
    var filteredResponse = Responsecopy.map((response:any)=>{
        let res:any = Object.assign({}, response);
        res.quantity+=' L'
        let DurationObj={
            date:moment(res.Duration.date).format("LLL")
        }
        res.Duration=DurationObj
        res.aircraft=res.hasOwnProperty('aircraft')?res.aircraft.aircraft_no:'No Aircraft'
        return res
    })
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        Loaddata(Aircraftres,Airportres,Transactionres,dispatch)
    }, []);
    return (
          <React.Fragment>     
          <div className="container-fluid" style={{backgroundColor:'#fafbfe'}}>
            <div className="row">
              <div className="col-12">
                <DashboardNavigation SidebarData={SidebarData} headersData={headersData} history={props.history}/>
              </div>
              <br/><br/>
              </div>
                <div className="row">
                  <div className="col-12">
                          <Box
                                component="main"
                                sx={{
                                  backgroundColor: '#fafbfe',
                                  height: '100%',
                            }}
                          >
                            <Toolbar />                           
                            <MediaQuery minWidth={1200}>
                            
                            <div className="container-fluid" style={{paddingLeft:'270px'}}>
                            <div className="row">
                            
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
                              <TableComponent response={filteredAirportres.slice(0,5)} columns={Airportcolumns}/>
                            </Paper>
                            </div>    
                            </div>
                            <br/>
                            <div className="row">
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
                                Transaction Details
                              </Typography>
                                <TableComponent response={filteredResponse.slice(0,5)} columns={Transactioncolumns}/>
                                </Paper>
                              </div>
                              <div className="col-3">
                              <div className="shadow-lg p-3 mb-5 bg-body rounded" id="chartcontainer" style={{height:'37vh'}}>
                                <h3 style={{textAlign:'center',fontWeight:'bold',fontSize:'35px'}} >Transaction Reports</h3>
                                <br/>
                                  <DoughnutData/>
                              </div>
                              </div>
                              <div className="col-3">
                                <Totaltransaction/>
                              </div>
                              </div>
                            </div>
                            </MediaQuery>
                            <MediaQuery maxWidth={600}>
                            <div className="row">
                            <div className="col-12">
                              <TableComponent response={Airportres.slice(0,5)} columns={Airportcolumns}/>
                            </div>
                            </div>
                            <br/><br/>
                              <div className="row">
                              <div className="col-12">
                                <TableComponent response={Aircraftres.slice(0,5)} columns={Aircraftcolumns}/>
                              </div>
                              </div>
                            <br/><br/>
                            <div className="row">
                            <div className="col-12">
                                <TableComponent response={filteredResponse.slice(0,5)} columns={Transactioncolumns}/>
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