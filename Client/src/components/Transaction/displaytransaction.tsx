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
    var filterResponse:any = useAppSelector((state:any) => state.Transaction.filterResponse);
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
                        fontFamily="Roboto"
                        noWrap
                        sx={{ flex: 1 }}
                    >
                    Transaction Details
                    </Typography>
                        <div className="row">
                            <div className="col-2">
                                <SideNavbarTransaction/>
                            </div>
                            <div className="col-10">
                                {
                                filterResponse.length===0?<TransactionTable data={response}/>:<TransactionTable data={filterResponse}/>
                                }
                            </div>
                        </div>
                    {/* {
                        //response.length>0&&<Pagination RenderedComponent={TransactionTable} data={response} title={"transaction"} pageLimit={5} dataLimit={3} />
                    } */}
                    </CardContent>
                    </Card>
                </div>
            </div>
            </div>
        </Fragment>
    )
}
export default DisplayTransaction