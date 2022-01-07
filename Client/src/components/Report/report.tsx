import {FC, Fragment, useEffect, useState} from 'react'
import Typography from '@mui/material/Typography';
import Pagination from '../Pagination/pagination'
import Reporttable from './reporttable'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {FetchTransaction} from '../../Redux/Transaction'
import {fetchAirport} from '../../Redux/Airport';
import { useAppDispatch,useAppSelector } from '../../hooks';
import { Reportdata } from './reportdata';
import '../../css/report.css'
import DashboardNavigation from '../Dashboard/DashboardNav';
import { headersData } from './reportnavdata';


type PropTypes = {
    history:any
}

const ReportComponent:FC<PropTypes> = (props:PropTypes) =>{
    const response = useAppSelector<Array<any>>((state:any)=>state.Transaction.response)
    const airportresponse = useAppSelector<Array<any>>((state:any)=>state.Airport.response)
    const dispatch = useAppDispatch()
    const AirportRes=airportresponse.slice(1)
    const [expanded, setExpanded] = useState('panel1');
    const handleChange = (panel:any) => (event:any, newExpanded:any) => {
        setExpanded(newExpanded ? panel : false);
    };
    AirportRes.sort(function(a,b){
        const filterArray1 =response.filter((data:any)=>data.airport._id===a._id )
        const filterArray2 =response.filter((data:any)=>data.airport._id===b._id )
        return filterArray2.length-filterArray1.length
    })
    var expandedRes:any=[]
    if(AirportRes.length>0)
    {
        expandedRes = AirportRes[0]
    }
    const loaddata = async()=>{
        if(response.length===0)
        {
            const fetchfunc=FetchTransaction()
            await fetchfunc(dispatch)
        }
        if(airportresponse.length===0)
        {
            const fetchfuncAirport = fetchAirport()
            await fetchfuncAirport(dispatch)
        }
    }
    useEffect(()=>{
        loaddata()
    },[]); 
      return(
        <Fragment>
        <DashboardNavigation SidebarData={Reportdata} headersData={headersData} history={props.history}/>
        <br/><br/><br/><br/><br/>
        <div className="container-fluid" id="reportcontainer">
            <div className="row">
                <div className="col-12">
                    <h1 className="ui teal header" id="heading">Fuel Consumption Report</h1>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-12">
                {AirportRes.length>0&&<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography style={{fontSize:'16px'}}>{AirportRes[0].name}</Typography>
                </AccordionSummary>
                {
                    <AccordionDetails>
                    <Pagination RenderedComponent={Reporttable} data={response.filter((data:any)=>data.airport._id===AirportRes[0]._id )} title={"report"} pageLimit={5} dataLimit={4} />
                    </AccordionDetails>
                }
                {
                response.filter((data:any)=>data.airport._id===AirportRes[0]._id ).length>0&&<Typography
                    component="h4"
                    variant="h4"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                    fontFamily="Roboto"
                >
                Fuel Available: {AirportRes[0].fuelavailable}
                </Typography>
                }
                </Accordion>
        }
        <br/>
        {
          AirportRes?.slice(1).map((value:any)=>{
            return (
                <Fragment>
                <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography style={{fontSize:'16px'}}>{value.name}</Typography>
                </AccordionSummary>
                {
                    <AccordionDetails>
                    <Pagination RenderedComponent={Reporttable} data={response.filter((data:any)=>data.airport._id===value._id )} title={"report"} pageLimit={5} dataLimit={4} />
                    </AccordionDetails>
                }
                {
                 response.filter((data:any)=>data.airport._id===value._id ).length>0&&<Typography
                    component="h4"
                    variant="h4"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                    fontFamily="Roboto"
                >
                Fuel Available: {value.fuelavailable}
                </Typography>
                }
                </Accordion>
                <br/>
                </Fragment>
                )
            })
        }
                </div>
            </div>
        </div>
        
    </Fragment>
    )
}     
        
export default ReportComponent
