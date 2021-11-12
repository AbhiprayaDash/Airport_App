import { Fragment,FC, useState, useEffect } from "react"
import Typography from '@mui/material/Typography';
import Pagination from "../Pagination/pagination"
import TransactionTable from "./transactiontable";
import FormControl from '@mui/material/FormControl';
import {FilterTransaction} from '../Airport/FilterService'
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { savetransaction } from "../../Redux/TransactionSlice";
import { FetchTransaction,SortTransaction } from "../../Redux/Transaction";


const DisplayTransaction:FC=() =>{
    const [filtername,setfiltername]= useState<string>('Filter By');
    const [sortname,setsortname]= useState<string>('');
    const response:Array<any> = useSelector((state:any)=>state.Transaction.response)
    const dispatch = useAppDispatch()
    const handlefilter:any = async(event:any)=>{
        const value=event.target.value
        setfiltername(value)
        var result:any
        if(value==="All")
        {
            setfiltername(value)
            const fetchfunc = FetchTransaction()
            await fetchfunc(dispatch)
        }
        if(value==="IN")
        {
            const reqbody={type:"IN"}
            result =await FilterTransaction(reqbody,value)
            dispatch(savetransaction(result.data))
        }
        else if(value==="OUT")
        {
            const reqbody={type:"OUT"}
            result= await FilterTransaction(reqbody,value)
            dispatch(savetransaction(result.data))
        }
    }
    const handlesort:any = async(event:any)=>{
        const value=event.target.value
        setsortname(value)
        const sortfunc =SortTransaction()
        await sortfunc(dispatch,value)
    }
    useEffect(()=>{
        const loaddata=async()=>{
            const fetchfunc=FetchTransaction()
            await fetchfunc(dispatch)
        }   
        loaddata()
    },[]);
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
            <FormControl>
                <select id="country" name="country" onChange={handlefilter} value={filtername}>
                    <option value="All">All</option>
                    <option value="IN">IN</option>
                    <option value="OUT">OUT</option>
                </select>
            </FormControl>
            {
                response.length>0&&<Pagination RenderedComponent={TransactionTable} data={response} title={"transaction"} pageLimit={5} dataLimit={3} />
            }
        </Fragment>
    )
}
export default DisplayTransaction