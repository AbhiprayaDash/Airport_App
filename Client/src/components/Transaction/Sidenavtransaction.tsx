import { FC, Fragment, useState } from "react"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch} from "../../hooks";
import { FetchTransaction } from "../../Redux/Transaction";
import { FilterTransaction } from "../Airport/FilterService";
import { savetransaction } from "../../Redux/TransactionSlice";
import axios from "axios";

type propTypes={
    aircraftlist:Array<any>
}
const SideNavbarTransaction:FC<propTypes>= (props:propTypes) =>{
    const [filtername, setfiltername] = useState<string>('Filter By');
    const [noOfelements,setnoelements] = useState<any>(5)
    var AircraftList = props.aircraftlist
    if(AircraftList.length>0)
    {
        AircraftList=AircraftList.slice(0,noOfelements)
    }
    const dispatch = useAppDispatch();
    const loadmore:any= () =>{
        const sum=noOfelements+noOfelements
        setnoelements(sum)
    }
    const showless:any= () =>{
        const sum=noOfelements-5
        setnoelements(sum)
    }
    const aircraftfilter:any =async (event:any) =>{
        console.log(event.target.value)
        const req={
            aircraft:event.target.value
        }
        const response = await axios.post('http://localhost:9000/transaction/filter/aircraftname',req)
        dispatch(savetransaction(response.data))
    }
    const handlefilter:any = async(event:any)=>{
        var result:any
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
            const reqbody={type:"IN"}
            result =await FilterTransaction(reqbody,value)
            dispatch(savetransaction(result.data))
        }
        else if(event.target.value==="OUT")
        {
            const value=event.target.value
            const reqbody={type:"OUT"}
            result= await FilterTransaction(reqbody,value)
            dispatch(savetransaction(result.data))
        }
    }
    return (
        <Fragment>
        <section id="sidebar">
        <div className="container">
        <div className="row">
            <div className="col-sm">
                <h2>Filter By</h2>
            </div>
            <div className="col-sm"style={{paddingTop:"10px",paddingLeft:"5px"}}>
                <span style={{color:'blue'}}><a onClick={handlefilter}>Clear All</a></span>
            </div>
        </div>
        </div>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Transaction Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                onClick={handlefilter} value="All"/>
            <label className="form-check-label">
                All
            </label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                onClick={handlefilter} value="IN"/>
            <label className="form-check-label">
                IN
            </label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                onClick={handlefilter} value="OUT"/>
            <label className="form-check-label">
                OUT
            </label>
            </div>
        <div className="spanclass" onClick={loadmore}>Load More</div>
        {noOfelements>5&&<div className="spanclass" onClick={showless}>Show Less</div>}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Aircraft</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {
                AircraftList.map((aircraft:any)=>{
                return(
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                        onClick={aircraftfilter} value={aircraft}/>
                        <label className="form-check-label">
                        {aircraft}
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
  </Fragment>
    )
}
export default SideNavbarTransaction