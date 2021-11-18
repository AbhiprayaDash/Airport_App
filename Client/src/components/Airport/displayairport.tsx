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
var airports:any=[]
var set=true
const  DisplayAirports:FC=()=>{    
    const response:any = useAppSelector((state:any) => state.Airport.response);
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
                console.log(e)
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
            <Typography
                component="h1"
                variant="h3"
                color="inherit"
                align="center"
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
            {response.length>0&&<Airporttable response={response}/>}
        </div>
        </div>
        </Paper>
        </Fragment>
    )
}
export default DisplayAirports
