import { FC, Fragment, useState } from "react"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchAirport, FilterAirport } from "../../Redux/Airport";
import { useAppDispatch } from "../../hooks";
import { Paper } from "@mui/material";
type propTypes={
    airportlist:any
}
const SideNavbarAirport:FC<propTypes> =(props:propTypes) =>{
    const airports=props.airportlist
    const [filtername, setfiltername] = useState<string>('Filter By');
    const [noOfelements,setnoelements] = useState<any>(5)
    const dispatch = useAppDispatch();
    const [expanded, setExpanded] = useState('panel1');
    const handleChange = (panel:any) => (event:any, newExpanded:any) => {
        setExpanded(newExpanded ? panel : false);
    }; 
    var SlicedAirport=[]
    if(airports.length>0)
    {
        SlicedAirport=airports
    }
    const loadmore:any= () =>{
        const sum=noOfelements+noOfelements
        setnoelements(sum)
    }
    const showless:any= () =>{
        const sum=noOfelements-5
        setnoelements(sum)
    }
    const handlefiltername:any =async(event:any)=>{
        if(event.target.tagName==="A")
        {
            setfiltername("recent")
            const fetchfunc = fetchAirport()
            await fetchfunc(dispatch)
        }
        else{
            var value=event.target.value
            setfiltername(value)
            const filterfunc=FilterAirport()
            await filterfunc(dispatch,value)
        }
    }
    return (
        <Fragment>
        <section id="sidebar" style={{backgroundColor:'#f5f3f4'}}>
        <Paper>
        <div className="container-fluid">
        <div className="row">
            <div className="col-sm">
                <h2 style={{marginLeft:'2px',fontStyle:'italic'}}>Filter By</h2>
            </div>
            <div className="col-sm"style={{paddingTop:"10px",paddingLeft:"5px"}}>
                <span style={{color:'blue',fontSize:'18px'}} ><a onClick={handlefiltername}>Clear All</a></span>
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
          <Typography style={{fontSize:'18px'}}>Airport</Typography>
        </AccordionSummary>
        <AccordionDetails style={{overflowY:'scroll',height:'200px'}}>
        {
        SlicedAirport?.map((airport:any)=>{
            return(
                 <div className="form-check">
                 <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                 onClick={handlefiltername} value={airport.name}/>
                 <label className="form-check-label" style={{fontSize:'15px'}}>
                 {airport.name}
                 </label>
                </div>
            )
            })
        }
        
        </AccordionDetails>
      </Accordion>
      </Paper>
</section>
  </Fragment>
    )
}
export default SideNavbarAirport