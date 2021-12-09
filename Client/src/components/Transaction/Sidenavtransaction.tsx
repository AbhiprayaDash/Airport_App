import { FC, Fragment, useState } from "react"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch, useAppSelector} from "../../hooks";
import { FetchTransaction ,FilterTransaction} from "../../Redux/Transaction";
import { saveFilterTransaction } from "../../Redux/TransactionSlice";
import axios from "axios";
import { Paper } from "@mui/material";



const SideNavbarTransaction:FC = () =>{
    const [filtername, setfiltername] = useState<string>('Filter By');
    var Aircraftresult=useAppSelector<Array<any>>((state)=>state.Aircraft.response);
    var AircraftList=Aircraftresult.map((aircraft)=>aircraft.aircraft_no)
    const [expanded, setExpanded] = useState('panel1');
    const handleChange = (panel:any) => (event:any, newExpanded:any) => {
        setExpanded(newExpanded ? panel : false);
    }; 
    const dispatch = useAppDispatch();
    const aircraftfilter:any =async (event:any) =>{
        const response = await axios.get(`http://localhost:9000/v1/transactions/filter/${event.target.value}/${'Aircraft'}`)
        dispatch(saveFilterTransaction(response.data))
    }
    const handlefilter:any = async(event:any)=>{
        if(event.target.tagName==="A")
        {
            setfiltername("All")
            const fetchfunc = FetchTransaction()
            await fetchfunc(dispatch)
        }
        else if(event.target.value==="All")
        {
            const value=event.target.value
            setfiltername(value)
            const fetchfunc = FetchTransaction()
            await fetchfunc(dispatch)
        }
        if(event.target.value==="IN")
        {
            const value=event.target.value
            const filterfunc = FilterTransaction()
            await filterfunc(dispatch,value)
        }
        else if(event.target.value==="OUT")
        {
            const value=event.target.value
            const filterfunc = FilterTransaction()
            await filterfunc(dispatch,value)
        }
    }
    return (
        <Fragment>
        <section id="sidebar" style={{backgroundColor:'#f5f3f4'}}>
        <Paper>
        <div className="container">
        <div className="row">
            <div className="col-sm">
                <h3 style={{marginLeft:'2px',fontStyle:'italic',marginTop:'5%'}}>Filter By</h3>
            </div>
            <div className="col-sm" style={{paddingTop:"10px",paddingLeft:"5px"}}>
                <span style={{color:'blue',fontSize:'18px'}}><a onClick={handlefilter}>Clear All</a></span>
            </div>
        </div>
        </div>
        <hr style={{borderBottom: '1px solid #dee2e6'}}></hr>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{fontSize:'18px',marginLeft:'2px'}}>Transaction Type</Typography>
        </AccordionSummary>
        <AccordionDetails style={{overflowY:'scroll'}}>
            <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                onClick={handlefilter} value="All"/>
            <label className="form-check-label" style={{fontSize:'15px'}}>
                All
            </label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                onClick={handlefilter} value="IN"/>
            <label className="form-check-label" style={{fontSize:'15px'}}>
                IN
            </label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                onClick={handlefilter} value="OUT"/>
            <label className="form-check-label" style={{fontSize:'15px'}}>
                OUT
            </label>
            </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{fontSize:'18px',marginLeft:'2px'}}>Aircraft</Typography>
        </AccordionSummary>
        {AircraftList.length>0&&<AccordionDetails style={{overflowY:'scroll',height:'150px'}}>
            {
                AircraftList.map((aircraft:any)=>{
                return(
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                        onClick={aircraftfilter} value={aircraft}/>
                        <label className="form-check-label" style={{fontSize:'15px'}}>
                        {aircraft}
                        </label>
                    </div>
                )
                })
            }

        </AccordionDetails>
        }
      </Accordion>
     </Paper>
</section>
  </Fragment>
    )
}
export default SideNavbarTransaction