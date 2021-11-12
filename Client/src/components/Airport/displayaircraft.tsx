import { FC, Fragment,  useState } from "react"
import Typography from '@mui/material/Typography';
import {fetchAircaft, FilterAircraft,SortAircraft} from '../../Redux/Aircraft'
import Pagination from '../Pagination/pagination'
import Aircrafttable from './aircrafttable'
import FormControl from '@mui/material/FormControl';
import { useEffect } from "react";
import {useAppSelector,useAppDispatch} from '../../hooks';
var set=true
var aircrafts:any=[]
const DisplayAircrafts:FC =() => {

    const [filtername, setfiltername] = useState<string>('Filter By');
    const [sortname,setsortname] = useState<string>('Sort By')
    const response:any = useAppSelector((state:any) => state.Aircraft.response);
    if(response.length>0&&set===true)
    {
        aircrafts=response.filter((aircraft:any,index:Number)=>{
            return response.findIndex((x:any) => x.airline ===aircraft.airline)===index
        })
        set=false
    }
    const dispatch = useAppDispatch();
    const handlesortname:any =async(event:any)=>{
        const value=event.target.value
        setsortname(value)
        const sortfunc = SortAircraft()
        await sortfunc(dispatch,value)      
    }
    const handlefiltername:any = async(event:any)=>{
        const value=event.target.value
        if(value==="recent")
        {
            setfiltername(value)
            const fetchfunc = fetchAircaft()
            await fetchfunc(dispatch)
        }
        else{
            setfiltername(value)
            const filtername = FilterAircraft()
            await filtername(dispatch,value)
        }
    }
    useEffect(()=>{
        const loaddata=async()=>{
            const fetchfunc=fetchAircaft()
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
                noWrap
                sx={{ flex: 1 }}
                fontFamily="Roboto"
            >
            Aircraft Details
            </Typography>
            <FormControl style={{width:"50%",alignItems:'center',alignContent:'center'}}>
                <select id="country" name="country" onChange={handlesortname} value={sortname}>
                    <option value="recent">Recent</option>
                    <option value="older">Older</option>
                    <option value="numberasc">Sort By aircraft number Asc</option>
                    <option value="numberdesc">Sort By aircraft number Desc</option>
                    <option value="airlineasc">Sort By Airline Asc</option>
                    <option value="airlinedesc">Sort by Airline Desc</option>
                </select>
            </FormControl>
            <FormControl style={{width:"50%",alignItems:'center',alignContent:'center'}}>
                <select id="country" name="country" onChange={handlefiltername} value={filtername}>
                    <option value="recent">All</option>
                {
                    aircrafts?.map((aircraft:any)=>{
                        return(
                        <option value={aircraft.airline}>{aircraft.airline}</option>
                        )
                    })
                }
                </select>
            </FormControl>
            {
            response.length>0&&<Pagination RenderedComponent={Aircrafttable} data={response} title={"aircraft"}  pageLimit={5} dataLimit={2} />
            }
        </Fragment>
    )
}
export default DisplayAircrafts

