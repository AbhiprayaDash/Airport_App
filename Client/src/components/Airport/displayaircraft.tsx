import { FC, Fragment,useEffect,useState} from "react"
import Typography from '@mui/material/Typography';
import {fetchAircaft} from '../../Redux/Aircraft'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Aircrafttable from './aircrafttable'
import {useAppSelector,useAppDispatch} from '../../hooks';
import SideNavbar from "./sidenavAircraft";
import InvalidPage400component from "../InvalidPage/400page";
import { Paper,Modal } from "@mui/material";
import AircraftForm from "./aircraftform";
var set=true
var aircrafts:any=[]
const DisplayAircrafts:FC =() => {
    const [OpenAircraft, setOpenfuncAircraft] = useState(false);
    const handleOpenAircraft= () => setOpenfuncAircraft(true);
    const handleCloseAircraft = () => setOpenfuncAircraft(false);
    const response:any = useAppSelector((state:any) => state.Aircraft.response);
    var filterResponse:any = useAppSelector((state:any) => state.Aircraft.FilterAircraftList);
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
        <div className="container-fluid">
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
        </Fragment>
    )
}
export default DisplayAircrafts

