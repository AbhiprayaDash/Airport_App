import {FC, Fragment, useEffect} from 'react'
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
    const response = useAppSelector((state:any)=>state.Transaction.response)
    const airportresponse = useAppSelector((state:any)=>state.Airport.response)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        const loaddata=async()=>{
        const fetchfunc=FetchTransaction()
        await fetchfunc(dispatch)
        const fetchfuncAirport = fetchAirport()
        await fetchfuncAirport(dispatch)
        } 
        loaddata()
        },[]); 
      return(
        <Fragment>
        <NavigationComponent/>
        <br/><br/><br/>
        {
          airportresponse.map((value:any)=>{
            return (
                <Fragment>
                <Accordion>
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
                <Typography
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
