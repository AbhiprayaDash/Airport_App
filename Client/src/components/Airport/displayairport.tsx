import React, { Fragment } from "react"
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Pagination from '../Pagination/pagination'
import Airporttable from './airporttable'

type statetypes={
    response:any
}
type proptypes={
    
}
class DisplayAirports extends React.Component<proptypes,statetypes>{

    constructor(props:proptypes){
        super(props)
        this.state={
            response:[]
        }
    }
    componentDidMount()
    {
        var loaddata = async()=>{
            const response = await axios.get('http://localhost:9000/airport')
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
            Aiport Details
            </Typography>
            {
            this.state.response.length>0&&<Pagination RenderedComponent={Airporttable} data={this.state.response} title={"airport"} pageLimit={5}  dataLimit={3} />
            }
        </Fragment>
        )
    }
}
export default DisplayAirports
