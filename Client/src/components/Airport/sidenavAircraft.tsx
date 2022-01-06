import { FC, Fragment, useState } from "react"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch} from "../../hooks";
import { fetchAircaft, FilterAircraft } from "../../Redux/Aircraft";
import { Paper } from "@mui/material";
type propTypes={
    aircraftlist:any
}
const SideNavbarAircraft:FC<propTypes> =(props:propTypes) =>{
    const aircrafts=props.aircraftlist
    const [filtername, setfiltername] = useState<string>('Filter By');
    const dispatch = useAppDispatch();
    const [expanded, setExpanded] = useState('panel1');
    const handleChange = (panel:any) => (event:any, newExpanded:any) => {
        setExpanded(newExpanded ? panel : false);
    }; 
    var SlicedAircraft=[]
    if(aircrafts.length>0)
    {
        SlicedAircraft=aircrafts
    }
    const handlefiltername:any = async(event:any)=>{
        if(event.target.tagName==="A")
        {
            setfiltername("recent")
            const fetchfunc = fetchAircaft()
            await fetchfunc(dispatch)
        }
        else{
            const value=event.target.value
            setfiltername(value)
            const filtername = FilterAircraft()
            await filtername(dispatch,value)
        }
    }
    return (
        <Fragment>
        <div id="sidebar" style={{backgroundColor:'#f9fafd'}}>
        <Paper>
        <div className="container-fluid" >
        <div className="row">
            <div className="col-sm">
            <h3 style={{marginLeft:'2px',fontStyle:'italic',marginTop:'5%'}}>Filter By</h3>
            </div>
            <div className="col-sm"style={{paddingTop:"10px",paddingLeft:"5px"}}>
                <span style={{color:'blue',fontSize:'18px'}}><a onClick={handlefiltername}>Clear All</a></span>
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
          <Typography style={{fontSize:'18px',paddingLeft:'8px'}}>Airline</Typography>
        </AccordionSummary>
        <AccordionDetails style={{overflowY:'scroll',height:'150px'}}>
        {
        SlicedAircraft?.map((aircraft:any)=>{
            return(
                 <div className="form-check">
                 <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                 onClick={handlefiltername} value={aircraft.airline}/>
                 <label className="form-check-label" style={{fontSize:'15px'}}>
                 {aircraft.airline}
                 </label>
                </div>
            )
            })
        }
        </AccordionDetails>
      </Accordion>
      </Paper>
    </div>
  </Fragment>
    )
}
export default SideNavbarAircraft