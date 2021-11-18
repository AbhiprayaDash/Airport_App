import { FC, Fragment, useState } from "react"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch} from "../../hooks";
import { fetchAircaft, FilterAircraft } from "../../Redux/Aircraft";
type propTypes={
    aircraftlist:any
}
const SideNavbarAircraft:FC<propTypes> =(props:propTypes) =>{
    const aircrafts=props.aircraftlist
    const [filtername, setfiltername] = useState<string>('Filter By');
    const [noOfelements,setnoelements] = useState<any>(5)
    const dispatch = useAppDispatch();
    var SlicedAircraft=[]
    if(aircrafts.length>0)
    {
        SlicedAircraft=aircrafts.slice(0,noOfelements)
    }
    const loadmore:any= () =>{
        const sum=noOfelements+noOfelements
        setnoelements(sum)
    }
    const showless:any= () =>{
        const sum=noOfelements-5
        setnoelements(sum)
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
        <section id="sidebar" >
        <div className="container">
        <div className="row">
            <div className="col-sm">
                <h2>Filter By</h2>
            </div>
            <div className="col-sm"style={{paddingTop:"10px",paddingLeft:"5px"}}>
                <span style={{color:'blue'}}><a onClick={handlefiltername}>Clear All</a></span>
            </div>
        </div>
        </div>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Airline</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {
        SlicedAircraft?.map((aircraft:any)=>{
            return(
                 <div className="form-check">
                 <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                 onClick={handlefiltername} value={aircraft.airline}/>
                 <label className="form-check-label">
                 {aircraft.airline}
                 </label>
                </div>
            )
            })
        }
        <div className="spanclass" onClick={loadmore} style={{color:'blue'}}>Load More</div>
        {noOfelements>5&&<div className="spanclass" onClick={showless}style={{color:'red'}}>Show Less</div>}
        </AccordionDetails>
      </Accordion>

</section>
  </Fragment>
    )
}
export default SideNavbarAircraft