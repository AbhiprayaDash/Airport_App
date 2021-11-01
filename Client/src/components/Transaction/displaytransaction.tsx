import React, { Fragment } from "react"
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Pagination from "../Pagination/pagination"
import TransactionTable from "./transactiontable";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

type statetypes={
    response:any,
    filtername:string
}
type proptypes={
    
}
class DisplayTransaction extends React.Component<proptypes,statetypes>{

    constructor(props:proptypes){
        super(props)
        this.state={
            response:[],
            filtername:''
        }
        this.handlefiltername = this.handlefiltername.bind(this)
    }
    handlefiltername:any =async(event:any)=>{
        const value=event.target.value
        this.setState({filtername:value})
        console.log(value)
        if(value==="dateasc")
        {
            const result = await axios.get('http://localhost:9000/transaction/filter/date?sort=asc')
            console.log(result.data)
            this.setState({response:result.data})
        }
        else if(value==="datedesc")
        {
            const result = await axios.get('http://localhost:9000/transaction/filter/date?sort=desc')
            console.log(result.data)
            this.setState({response:result.data})
        }
        else if(value==="quantityasc")
        {
            const result = await axios.get('http://localhost:9000/transaction/filter/quantity?sort=asc')
            console.log(result.data)
            this.setState({response:result.data})
        }
        else if(value==="quantitydesc")
        {
            const result = await axios.get('http://localhost:9000/transaction/filter/quantity?sort=desc')
            console.log(result.data)
            this.setState({response:result.data})
        }
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
            <InputLabel id="demo-simple-select-label" style={{fontSize:'16px'}}>Sort By</InputLabel><br/><br/>
                <select id="country" name="country" onChange={this.handlefiltername} value={this.state.filtername}>
                    <option value="default">Default</option>
                    <option value="dateasc">Sort By Date Asc</option>
                    <option value="datedesc">Sort By Date Desc</option>
                    <option value="quantityasc">Sort By Quantity Asc</option>
                    <option value="quantitydesc">Sort by Quantity Desc</option>
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