import { Fragment,FC, useState,useEffect } from "react"
import Typography from '@mui/material/Typography';
import Pagination from "../Pagination/pagination"
import TransactionTable from "./transactiontable";
import FormControl from '@mui/material/FormControl';
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FetchTransaction,SortTransaction } from "../../Redux/Transaction";
import SideNavbarTransaction from "./Sidenavtransaction";
import { fetchAircaft } from "../../Redux/Aircraft";


const DisplayTransaction:FC=() =>{
    const [sortname,setsortname]= useState<string>('');
    const response:Array<any> = useSelector((state:any)=>state.Transaction.response)
    var Aircraftresult=useAppSelector<Array<any>>((state)=>state.Aircraft.response);
    const AircraftList=Aircraftresult.map((aircraft)=>aircraft.aircraft_no)
    const dispatch = useAppDispatch()

    const loaddataAircraft=async()=>{
        if(Aircraftresult.length===0)
        {
            try{
                const fetchfuncAircraft = fetchAircaft()
                await fetchfuncAircraft(dispatch)
            }
            catch(e:any)
            {
                console.log(e)
            }
        } 
    }  
    const loaddata=async()=>{
        if(response.length===0)
        {
            try{
                const fetchfunc=FetchTransaction()
                await fetchfunc(dispatch)
            }
            catch(e:any)
            {
                console.log(e)
            }
        }
    }
    useEffect(() => {
        loaddata()
        loaddataAircraft()
    }, []);
    
    const handlesort:any = async(event:any)=>{
        const value=event.target.value
        setsortname(value)
        const sortfunc =SortTransaction()
        await sortfunc(dispatch,value)
    }
    return(
        <Fragment>
            <SideNavbarTransaction aircraftlist={AircraftList}/>
                <Typography
                component="h1"
                variant="h3"
                color="inherit"
                align="left"
                fontFamily="Roboto"
                noWrap
                sx={{ flex: 1 }}
            >
            Transaction Details
            </Typography>
            <FormControl style={{width:"50%",alignItems:'center',alignContent:'center'}}>
                <select id="country" name="country" onChange={handlesort} value={sortname}>
                    <option value="recent">Recent</option>
                    <option value="older">Older</option>
                    <option value="dateasc">Sort By Date Asc</option>
                    <option value="datedesc">Sort By Date Desc</option>
                    <option value="quantityasc">Sort By Quantity Asc</option>
                    <option value="quantitydesc">Sort by Quantity Desc</option>
                </select>
            </FormControl>
            {
                response.length>0&&<Pagination RenderedComponent={TransactionTable} data={response} title={"transaction"} pageLimit={5} dataLimit={3} />
            }
        </Fragment>
    )
}
export default DisplayTransaction