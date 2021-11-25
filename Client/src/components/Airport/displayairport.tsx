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
        <Fragment>
            <Card sx={{ minWidth: 875 }}>
            <CardContent>
            <Typography
                component="h1"
                variant="h3"
                color="inherit"
                align="center"
                style={{fontWeight:"bold",fontSize:54}}
                noWrap
                sx={{ flex: 1 }}
                fontFamily="Roboto"
            >
            Airport Details
            </Typography>
            <br/>
            <Paper>
            {airports.length>0&&<SideNavbar airportlist={airports}/>}
        <div className="main">
        <div style={{width:'80%',float:'right',padding:'10px'}}>
            {filterResponse.length===0?<Airporttable response={response}/>:<Airporttable response={filterResponse}/>}
        </div>
        </div>
        </Paper>
        </CardContent>
        </Card>
        </Fragment>
    )
}
export default DisplayAirports
