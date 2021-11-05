import React,{Fragment} from "react"
import Typography from '@mui/material/Typography';
import {loadAircraftData} from './aircraftservice'
import Pagination from '../Pagination/pagination'
import Aircrafttable from './aircrafttable'
import FormControl from '@mui/material/FormControl';
import {SortAircraft} from './SortService'

type statetypes={
    response:any,
    filtername:string
}
type proptypes={
}
class DisplayAircrafts extends React.Component<proptypes,statetypes>{

    constructor(props:proptypes){
        super(props)
        this.state={
            response:[],
            filtername:'Sort By'
        }
        this.handlefiltername = this.handlefiltername.bind(this)
    }
    handlefiltername:any =async(event:any)=>{
        const value=event.target.value
        this.setState({filtername:value})
        const result:any=await SortAircraft(value)
        this.setState({response:result.data})        
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
            <FormControl style={{width:"50%",alignItems:'center',alignContent:'center'}}>
                <select id="country" name="country" onChange={this.handlefiltername} value={this.state.filtername}>
                    <option value="recent">Sort By</option>
                    <option value="recent">Recent</option>
                    <option value="older">Older</option>
                    <option value="numberasc">Sort By aircraft number Asc</option>
                    <option value="numberdesc">Sort By aircraft number Desc</option>
                    <option value="airlineasc">Sort By Airline Asc</option>
                    <option value="airlinedesc">Sort by Airline Desc</option>
                </select>
            </FormControl>
            {
            this.state.response.length>0&&<Pagination RenderedComponent={Aircrafttable} data={this.state.response} title={"aircraft"}  pageLimit={5} dataLimit={2} />
            }
        </Fragment>
        )
    }
}
export default DisplayAircrafts

