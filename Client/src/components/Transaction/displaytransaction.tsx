import React, { Fragment } from "react"
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Pagination from "../Pagination/pagination"
import TransactionTable from "./transactiontable";
type statetypes={
    response:any
}
type proptypes={
    
}
class DisplayTransaction extends React.Component<proptypes,statetypes>{

    constructor(props:proptypes){
        super(props)
        this.state={
            response:[]
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
            {
            this.state.response.length>0&&<Pagination RenderedComponent={TransactionTable} data={this.state.response} title={"transaction"} pageLimit={5} dataLimit={3} />
            }
            </Fragment>
        )
    }
}
export default DisplayTransaction