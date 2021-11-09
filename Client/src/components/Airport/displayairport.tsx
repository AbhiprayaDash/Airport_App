import { FC, Fragment, useEffect, useState } from "react"
import Typography from '@mui/material/Typography';
import Pagination from '../Pagination/pagination'
import Airporttable from './airporttable'
import FormControl from '@mui/material/FormControl';
import '../../css/displayairport.css'
import { useAppSelector,useAppDispatch } from "../../hooks";
import {fetchAirport,SortAirport} from '../../Redux/Airport'

const  DisplayAirports:FC=()=>{    
    const [filtername, setfiltername] = useState('Sort By');
    const response:any = useAppSelector((state:any) => state.Airport.response);
    const dispatch = useAppDispatch();
    const handlefiltername:any =async(event:any)=>{
        const value=event.target.value
        setfiltername(value)
        const sortfunc = SortAirport(value)
        await sortfunc(dispatch) 
    }
    useEffect(()=>{
        console.log('inside use effect')
        const loaddata=async()=>{
        console.log('inside')
        const fetchfunc=fetchAirport()
        await fetchfunc(dispatch)
        } 
        loaddata()
        },[])
    return(
        <Fragment>
        <Typography
                component="h1"
                variant="h3"
                color="inherit"
                align="left"
                fontFamily="Roboto"
                noWrap
                sx={{ flex: 1 }}
        >
        Aiport Details
        </Typography>

        <FormControl style={{width:"50%",alignItems:'center',alignContent:'center'}}>
            <select id="country" name="country" onChange={handlefiltername} value={filtername}>
                <option value="recent">Recent</option>
                <option value="older">Older</option>
                <option value="nameasc">Sort By name Asc</option>
                <option value="namedesc">Sort By name Desc</option>
                <option value="fuelcapacityasc">Sort by FuelCapacity Asc</option>
                <option value="fuelcapacitydesc">Sort by FuelCapacity Desc</option>
                <option value="fuelavailableasc">Sort by FuelAvailable Asc</option>
                <option value="fuelavailabledesc">Sort by FuelAvailable Desc</option>
            </select>
        </FormControl>
        {
            response.length>0&&<Pagination RenderedComponent={Airporttable} data={response} title={"airport"} pageLimit={5} dataLimit={5} />
        }
        </Fragment>
    )
}
export default DisplayAirports
