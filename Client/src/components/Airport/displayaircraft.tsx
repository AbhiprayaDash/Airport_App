import { FC, Fragment,useEffect} from "react"
import Typography from '@mui/material/Typography';
import {fetchAircaft} from '../../Redux/Aircraft'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Aircrafttable from './aircrafttable'
import {useAppSelector,useAppDispatch} from '../../hooks';
import SideNavbar from "./sidenavAircraft";
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
                console.log(e)
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
            Aircraft Details
            </Typography>
            <br/>
            <SideNavbar aircraftlist={aircrafts}/>
            <div style={{width:'80%',float:'right',padding:'10px'}}>
            {filterResponse.length===0?<Aircrafttable response={response}/>:<Aircrafttable response={filterResponse}/>}
            </div>
            </CardContent>
            </Card>
        </Fragment>
    )
}
export default DisplayAircrafts

