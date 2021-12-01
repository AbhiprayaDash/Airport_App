import { FC, Fragment, useEffect, useState } from "react"
import Typography from '@mui/material/Typography';
import Airporttable from './airporttable'
import '../../css/displayairport.css'
import { useAppSelector,useAppDispatch } from "../../hooks";
import {fetchAirport} from '../../Redux/Airport'
import '../../css/navbar.css'
import SideNavbar from './sidenavbarAirport'
import '../../jshandlers/navbarhandler'
import { Paper } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InvalidPage400component from "../InvalidPage/400page";

var airports:any=[]
var set=true
const  DisplayAirports:FC=()=>{    
    const response:any = useAppSelector((state:any) => state.Airport.response);
    var filterResponse:any = useAppSelector((state:any) => state.Airport.FilterAirportList);
    const dispatch = useAppDispatch();
    const loaddata=async()=>{
        if(response.length===0)
        {
            try{
                const fetchfunc=fetchAirport()
                await fetchfunc(dispatch)
            }
            catch(e:any)
            {
                <InvalidPage400component/>
            }
        }
    } 
    useEffect(() => {
        loaddata()
    }, []);
    if(response.length>0&&set===true)
    {
        airports=response.filter((airport:any,index:Number)=>{
            return response.findIndex((x:any) => x.name ===airport.name)===index
        })
        set=false
    }
    return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                    <Card >
                        <CardContent>
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
                        <br/>
                            <div className="row">
                                <div className="col-2">
                                    {airports.length>0&&<SideNavbar airportlist={airports}/>}
                                </div>
                                <div className="col-10">
                                    {filterResponse.length===0?<Airporttable response={response}/>:<Airporttable response={filterResponse}/>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    </div>
                </div>
            </div>
    )
}
export default DisplayAirports
