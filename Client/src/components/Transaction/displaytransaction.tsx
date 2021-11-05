import React, { Fragment } from "react"
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Pagination from "../Pagination/pagination"
import TransactionTable from "./transactiontable";
import FormControl from '@mui/material/FormControl';
import {SortTransaction} from '../Airport/SortService'
import {FilterTransaction} from '../Airport/FilterService'
type statetypes={
    response:any,
    filtername:string,
    sortname:string
}
type proptypes={
    
}
class DisplayTransaction extends React.Component<proptypes,statetypes>{

    constructor(props:proptypes){
        super(props)
        this.state={
            response:[],
            filtername:'Filter By',
            sortname:''
        }
    }
    handlefilter:any = async(event:any)=>{
        const value=event.target.value
        this.setState({filtername:value})
        var result:any
        if(value==="IN")
        {
            const reqbody={type:"IN"}
            result =await FilterTransaction(reqbody,value)
        }
        else if(value==="OUT")
        {
            const reqbody={type:"OUT"}
            result= await FilterTransaction(reqbody,value)
        }
        this.setState({response:result.data})
    }
    handlesort:any = async(event:any)=>{
        const value=event.target.value
        this.setState({sortname:value})
        const result:any =await SortTransaction(value)
        this.setState({response:result.data})
    }
    componentDidMount()
    {
        var loaddata = async()=>{
            const response = await axios.get('http://localhost:9000/transaction')
            this.setState({response:response.data})
        }
        loaddata()
    }
    render()
    {
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
                <select id="country" name="country" onChange={this.handlesort} value={this.state.sortname}>
                    <option value="recent">Sort By</option>
                    <option value="recent">Recent</option>
                    <option value="older">Older</option>
                    <option value="dateasc">Sort By Date Asc</option>
                    <option value="datedesc">Sort By Date Desc</option>
                    <option value="quantityasc">Sort By Quantity Asc</option>
                    <option value="quantitydesc">Sort by Quantity Desc</option>
                </select>
            </FormControl>
            <FormControl>
                <select id="country" name="country" onChange={this.handlefilter} value={this.state.filtername}>
                    <option value="IN">IN</option>
                    <option value="OUT">OUT</option>
                </select>
            </FormControl>
            {
            this.state.response.length>0&&<Pagination RenderedComponent={TransactionTable} data={this.state.response} title={"transaction"} pageLimit={5} dataLimit={3} />
            }
            </Fragment>
        )
    }
}
export default DisplayTransaction