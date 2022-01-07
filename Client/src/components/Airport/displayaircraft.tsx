import { FC, Fragment,useEffect,useState} from "react"
import Typography from '@mui/material/Typography';
import {fetchAircaft} from '../../Redux/Aircraft'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useAppSelector,useAppDispatch} from '../../hooks';
import SideNavbar from "./sidenavAircraft";
import InvalidPage400component from "../InvalidPage/400page";
import { Paper,Modal } from "@mui/material";
import AircraftForm from "./aircraftform";
import MediaQuery from "react-responsive";
import DashboardNavigation from "../Dashboard/DashboardNav";
import { SidebarAirport } from "./airportsidedata";
import '../../css/table.css'
import '../../css/displayairport.css'
import { headerData } from "./navdataairport";
import TableComponent from "../table/table";
import { Aircraftcolumns } from "./tabledata";

var set=true
var aircrafts:any=[]

type PropTypes = {
    history:any
}
const DisplayAircrafts:FC<PropTypes> =(props:PropTypes) => {
    const [OpenAircraft, setOpenfuncAircraft] = useState(false);
    const handleOpenAircraft= () => setOpenfuncAircraft(true);
    const handleCloseAircraft = () => setOpenfuncAircraft(false);
    const response:any = useAppSelector((state:any) => state.Aircraft.response);
    let filterResponse:any = useAppSelector((state:any) => state.Aircraft.FilterAircraftList);
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
        <Fragment>
        <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                    <Modal
                        open={OpenAircraft}
                        onClose={handleCloseAircraft}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                    <Paper style={{width:'70%',height:'600px',maxHeight:'350px',maxWidth:'500px',marginRight:'auto',marginLeft:'auto',marginTop:'10%'}}>
                        <AircraftForm/>
                    </Paper>
                    </Modal>
                    </div>
                </div>
        </div>
        <div className="container-fluid" id="aircraftcontainer">
            <div className="row">
              <div className="col-12">
                <DashboardNavigation SidebarData={SidebarAirport} headersData={headerData} history={props.history}/>
              </div>
            </div>
            <br/><br/>
            <br/><br/>
            <MediaQuery minWidth={1200}>
            <div className="row">
                <div className="col-12">
                <Card >
                    <CardContent>
                    <div className="row">
                        <div className="col-10">
                        {/* <Typography
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
                        </Typography> */}
                        </div>
                        <div className="col-2">
                            <button type="button" className="btn btn-success" onClick={handleOpenAircraft} style={{padding:'8px',float:'left',marginBottom:'5px'}}>Add Aircraft</button>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-3">
                            {aircrafts.length>0&&<SideNavbar aircraftlist={aircrafts}/>}
                        </div>
                        <div className="col-9">
                            {filterResponse.length===0&&response.length>0?<TableComponent response={response} columns={Aircraftcolumns}/>:<TableComponent response={filterResponse} columns={Aircraftcolumns}/>}
                        </div>
                    </div>
                    </CardContent>
                </Card>
                </div>
            </div>
            </MediaQuery>
            <MediaQuery maxWidth={600}>
            <div className="row">
                <div className="col-12">
                <Card >
                    <CardContent>
                    <div className="row">
                        <div className="col-8">
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
                        </div>
                        <div className="col-4">
                            <button type="button" className="btn btn-success" onClick={handleOpenAircraft} style={{padding:'8px',float:'left',marginBottom:'5px'}}>Add Aircraft</button>
                        </div>
                    </div>
                    <br/>
                        
                        <div className="row">
                            <div className="col-12">
                               {filterResponse.length===0&&response.length>0?<TableComponent response={response} columns={Aircraftcolumns}/>:<TableComponent response={filterResponse} columns={Aircraftcolumns}/>}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                </div>
            </div>
            </MediaQuery>  
        </div>
        </Fragment>
    )
}
export default DisplayAircrafts

