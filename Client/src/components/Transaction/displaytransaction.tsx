import { Fragment,FC, useState,useEffect } from "react"
import Typography from '@mui/material/Typography';
import TransactionTable from "./transactiontable";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FetchTransaction} from "../../Redux/Transaction";
import SideNavbarTransaction from "./Sidenavtransaction";
import { fetchAircaft } from "../../Redux/Aircraft";
import { Card, CardContent, Paper } from "@mui/material";


const DisplayTransaction:FC=() =>{
    const response:Array<any> = useSelector((state:any)=>state.Transaction.response)
    var Aircraftresult=useAppSelector<Array<any>>((state)=>state.Aircraft.response);
    const AircraftList=Aircraftresult.map((aircraft)=>aircraft.aircraft_no)
    const dispatch = useAppDispatch()

    const loaddataAircraft=async()=>{
        if(Aircraftresult.length===0)
        {
            try{
                const fetchfuncAircraft = fetchAircaft()
                await fetchfuncAircraft(dispatch)
            }
            catch(e:any)
            {
                console.log(e)
            }
        } 
    }  
    const loaddata=async()=>{
        if(response.length===0)
        {
            try{
                const fetchfunc=FetchTransaction()
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
        loaddataAircraft()
    }, []);
    
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
                fontFamily="Roboto"
                noWrap
                sx={{ flex: 1 }}
            >
            Transaction Details
            </Typography>

            <Paper>
                <SideNavbarTransaction/>
                <div className="main">
                <div style={{width:'80%',float:'right',padding:'10px'}}>
                {
                    response.length>0&&<TransactionTable data={response}/>
                }
                </div>
                </div>
            </Paper>
            {/* {
                //response.length>0&&<Pagination RenderedComponent={TransactionTable} data={response} title={"transaction"} pageLimit={5} dataLimit={3} />
            } */}
            </CardContent>
            </Card>
        </Fragment>
    )
}
export default DisplayTransaction