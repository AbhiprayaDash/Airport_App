import {FC, Fragment, useEffect, useState} from 'react'
import NavigationComponent from '../Navigation/navcomponent'
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
const ReportComponent:FC=() =>{
    const response = useAppSelector<Array<any>>((state:any)=>state.Transaction.response)
    var airportresponse = useAppSelector<Array<any>>((state:any)=>state.Airport.response)
    const dispatch = useAppDispatch()
    const AirportRes=airportresponse.slice(1)
    const [expanded, setExpanded] = useState('panel1');
    const handleChange = (panel:any) => (event:any, newExpanded:any) => {
        setExpanded(newExpanded ? panel : false);
    }; 
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
        <NavigationComponent/>
        <br/>
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
            Fuel Consumption Report
        </Typography>
        <br/>
        {airportresponse.length>0&&<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography>{airportresponse[0].name}</Typography>
                </AccordionSummary>
                {
                    <AccordionDetails>
                    <Pagination RenderedComponent={Reporttable} data={response.filter((data:any)=>data.airport._id===airportresponse[0]._id )} title={"report"} pageLimit={5} dataLimit={4} />
                    </AccordionDetails>
                }
                {
                response.filter((data:any)=>data.airport._id===airportresponse[0]._id ).length>0&&<Typography
                    component="h4"
                    variant="h4"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                    fontFamily="Roboto"
                >
                Fuel Available: {airportresponse[0].fuelavailable}
                </Typography>
                }
                </Accordion>
        }
        <br/>
        {
          AirportRes.map((value:any)=>{
            return (
                <Fragment>
                <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography>{value.name}</Typography>
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
        </Fragment>
      )
}     
        
export default ReportComponent
