import { FC, Fragment, useState } from "react"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchAirport, FilterAirport } from "../../Redux/Airport";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Paper } from "@mui/material";
type propTypes={
    airportlist:any
}
const SideNavbarAirport:FC<propTypes> =(props:propTypes) =>{
    const airports=props.airportlist
    const [filtername, setfiltername] = useState<string>('Filter By');
    const [sortname,setsortname] = useState<string>('Sort By')
    const response:any = useAppSelector((state:any) => state.Airport.response);
    const [noOfelements,setnoelements] = useState<any>(5)
    const dispatch = useAppDispatch();
    var SlicedAirport=[]
    if(airports.length>0)
    {
        SlicedAirport=airports.slice(0,noOfelements)
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
        console.log(event.target.tagName)
        if(event.target.tagName==="A")
        {
            console.log('fetching')
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
            <Paper>
        <section id="sidebar" style={{float:'left'}}>
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
          <Typography>Airport</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {
        SlicedAirport?.map((airport:any)=>{
            return(
                 <div className="form-check">
                 <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                 onClick={handlefiltername} value={airport.name}/>
                 <label className="form-check-label">
                 {airport.name}
                 </label>
                </div>
            )
            })
        }
        <div className="spanclass" onClick={loadmore}>Load More</div>
        {noOfelements>5&&<div className="spanclass" onClick={showless}>Show Less</div>}
        </AccordionDetails>
      </Accordion>

</section>
</Paper>
  </Fragment>
    )
}
export default SideNavbarAirport