import { FC, Fragment, useEffect, useState } from "react"
import Typography from '@mui/material/Typography';
import Pagination from '../Pagination/pagination'
import Airporttable from './airporttable'
import FormControl from '@mui/material/FormControl';
import '../../css/displayairport.css'
import { useAppSelector,useAppDispatch } from "../../hooks";
import {fetchAirport,SortAirport,FilterAirport} from '../../Redux/Airport'

var airports:any=[]
var set=true
const  DisplayAirports:FC=()=>{    
    const [filtername, setfiltername] = useState('Filter By');
    const [sortname,setsortname] = useState('Sort By')
    const response:any = useAppSelector((state:any) => state.Airport.response);
    const dispatch = useAppDispatch();

    if(response.length>0&&set===true)
    {
        airports=response.filter((airport:any,index:Number)=>{
            return response.findIndex((x:any) => x.name ===airport.name)===index
        })
        set=false
    }
    const handlefiltername:any =async(event:any)=>{
        const value=event.target.value
        if(value==="recent")
        {
            setfiltername(value)
            const fetchfunc = fetchAirport()
            await fetchfunc(dispatch)
        }
        else{
            setfiltername(value)
            const filterfunc=FilterAirport()
            await filterfunc(dispatch,value)
        }
    }
    const handlesortname:any =async(event:any)=>{
        const value=event.target.value
        setsortname(value)
        const sortfunc = SortAirport()
        await sortfunc(dispatch,value) 
    }
    useEffect(()=>{
        const loaddata=async()=>{
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
            <select id="country" name="country" onChange={handlesortname} value={sortname}>
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
        <FormControl style={{width:"50%",alignItems:'center',alignContent:'center'}}>
                <select id="country" name="country" onChange={handlefiltername} value={filtername}>
                    <option value="recent">All</option>
                {
                    airports?.map((airport:any)=>{
                        return(
                        <option value={airport.name}>{airport.name}</option>
                        )
                    })
                }
                </select>
            </FormControl>
        {
            response.length>0&&<Pagination RenderedComponent={Airporttable} data={response} title={"airport"} pageLimit={5} dataLimit={5} />
        }
        </Fragment>
    )
}
export default DisplayAirports
