import { FC, Fragment} from "react"
import Typography from '@mui/material/Typography';
import {fetchAircaft} from '../../Redux/Aircraft'
import Pagination from '../Pagination/pagination'
import Aircrafttable from './aircrafttable'
import {useAppSelector,useAppDispatch} from '../../hooks';
import SideNavbar from "./sidenavAircraft";
var set=true
var aircrafts:any=[]
const DisplayAircrafts:FC =() => {
    const response:any = useAppSelector((state:any) => state.Aircraft.response);
    const dispatch = useAppDispatch();
    console.log(response)
    if(response.length==0)
    {
        console.log('display aircrafts')
        const loaddata=async()=>{
            const fetchfunc=fetchAircaft()
            await fetchfunc(dispatch)
        }   
        loaddata()
    }
    if(response.length>0&&set===true)
    {
        aircrafts=response.filter((aircraft:any,index:Number)=>{
            return response.findIndex((x:any) => x.airline ===aircraft.airline)===index
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
            Aircraft Details
            </Typography>
            <br/>
            <SideNavbar aircraftlist={aircrafts}/>
            <div style={{width:'80%',float:'right',padding:'10px'}}>
            {response.length>0&&<Aircrafttable/>}
            </div>
        </Fragment>
    )
}
export default DisplayAircrafts

