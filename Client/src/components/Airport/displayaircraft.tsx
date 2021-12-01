import { FC, Fragment,useEffect} from "react"
import Typography from '@mui/material/Typography';
import {fetchAircaft} from '../../Redux/Aircraft'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Aircrafttable from './aircrafttable'
import {useAppSelector,useAppDispatch} from '../../hooks';
import SideNavbar from "./sidenavAircraft";
import InvalidPage400component from "../InvalidPage/400page";
import { Paper } from "@mui/material";
var set=true
var aircrafts:any=[]
const DisplayAircrafts:FC =() => {
    const response:any = useAppSelector((state:any) => state.Aircraft.response);
    var filterResponse:any = useAppSelector((state:any) => state.Aircraft.FilterAircraftList);
    console.log(filterResponse)
    const dispatch = useAppDispatch();
    const loaddata=async()=>{
        if(response.length===0)
        {
            try{
                const fetchfunc=fetchAircaft()
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
        aircrafts=response.filter((aircraft:any,index:Number)=>{
            return response.findIndex((x:any) => x.airline ===aircraft.airline)===index
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
                    Aircraft Details
                    </Typography>
                    <br/>
                        <div className="row">
                            <div className="col-2">
                                {aircrafts.length>0&&<SideNavbar aircraftlist={aircrafts}/>}
                            </div>
                            <div className="col-10">
                                {filterResponse.length===0&&response.length>0?<Aircrafttable response={response}/>:<Aircrafttable response={filterResponse}/>}
                            </div>
                        </div>
                    </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default DisplayAircrafts

