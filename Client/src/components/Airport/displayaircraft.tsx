import React,{Fragment} from "react"
import axios from 'axios'
import Typography from '@mui/material/Typography';
import {loadAircraftData} from './aircraftservice'
import Pagination from '../Pagination/pagination'
import Aircrafttable from './aircrafttable'


type statetypes={
    response:any
}
type proptypes={
}
class DisplayAircrafts extends React.Component<proptypes,statetypes>{

    constructor(props:proptypes){
        super(props)
        this.state={
            response:[]
        }
    }
    componentDidMount()
    {
        const loaddata=async()=>{
            const data = await loadAircraftData()
            this.setState({response:data})
        }   
        loaddata()
    }
    render()
    {
        console.log('executed')
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
            {
            this.state.response.length>0&&<Pagination RenderedComponent={Aircrafttable} data={this.state.response} title={"aircraft"}  pageLimit={5} dataLimit={2} />
            }
        </Fragment>
        )
    }
}
export default DisplayAircrafts

