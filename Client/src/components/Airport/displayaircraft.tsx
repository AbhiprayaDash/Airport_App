import { FC, Fragment, ReactElement, useState } from "react"
import Typography from '@mui/material/Typography';
import {fetchAircaft} from '../../Redux/Aircraft'
import Pagination from '../Pagination/pagination'
import Aircrafttable from './aircrafttable'
import FormControl from '@mui/material/FormControl';
import {SortAircraft} from '../../Redux/Aircraft'
import { useEffect } from "react";
import {useAppSelector,useAppDispatch} from '../../hooks';
const DisplayAircrafts:FC =() => {

    const [filtername, setfiltername] = useState('Sort By');
    const response:any = useAppSelector((state:any) => state.Aircraft.response);
    const dispatch = useAppDispatch();
    console.log(response);
    const handlefiltername:any =async(event:any)=>{
        const value=event.target.value
        setfiltername(value)
        const sortfunc = SortAircraft(value)
        await sortfunc(dispatch)      
    }
    useEffect(()=>{
        console.log('inside use effect')
        const loaddata=async()=>{
            console.log('inside')
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
                <select id="country" name="country" onChange={handlefiltername} value={filtername}>
                    <option value="recent">Recent</option>
                    <option value="older">Older</option>
                    <option value="numberasc">Sort By aircraft number Asc</option>
                    <option value="numberdesc">Sort By aircraft number Desc</option>
                    <option value="airlineasc">Sort By Airline Asc</option>
                    <option value="airlinedesc">Sort by Airline Desc</option>
                </select>
            </FormControl>
            {
            response.length>0&&<Pagination RenderedComponent={Aircrafttable} data={response} title={"aircraft"}  pageLimit={5} dataLimit={2} />
            }
        </Fragment>
    )
}
export default DisplayAircrafts

