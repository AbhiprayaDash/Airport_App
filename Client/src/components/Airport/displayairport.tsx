import { FC, Fragment, useEffect, useState } from "react"
import Typography from '@mui/material/Typography';
import Airporttable from './airporttable'
import '../../css/displayairport.css'
import { useAppSelector,useAppDispatch } from "../../hooks";
import {fetchAirport} from '../../Redux/Airport'
import '../../css/navbar.css'
import SideNavbar from './sidenavbarAirport'
import {  Modal, Paper } from '@mui/material';
import AirportForm from '../Airport/airportform';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InvalidPage400component from "../InvalidPage/400page";

var airports:any=[]
var set=true
const  DisplayAirports:FC=()=>{    
    const [OpenAirport, setOpenfuncAirport] = useState(false);
    const handleOpenAirport = () => setOpenfuncAirport(true);
    const handleCloseAirport = () => setOpenfuncAirport(false);
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                      <Modal
                        open={OpenAirport}
                        onClose={handleCloseAirport}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Paper style={{width:'70%',height:'600px',maxHeight:'550px',maxWidth:'500px',marginRight:'auto',marginLeft:'auto',marginTop:'10%',marginBottom:'auto'}}>
                        <AirportForm/>
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
                                Airport Details
                            </Typography>
                        </div>
                        <div className="col-4">
                        <button type="button" className="btn btn-success" onClick={handleOpenAirport} style={{padding:'8px',float:'left',marginBottom:'5px'}}>Add Airport</button>
                        </div>
                        </div>
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
        </Fragment>
    )
}
export default DisplayAirports
