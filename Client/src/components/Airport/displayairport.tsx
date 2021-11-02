import React, { Fragment } from "react"
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Pagination from '../Pagination/pagination'
import Airporttable from './airporttable'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import '../../css/displayairport.css'
import {SortAirport} from './SortService'

interface typeProvider{
    name:string,
    fuelcapacity:number,
    fuelavailable:number
}
type statetypes={
    response:any,
    filtername:any,
    dataupdate:boolean
}
type proptypes={
    
}
class DisplayAirports extends React.Component<proptypes,statetypes>{

    constructor(props:proptypes){
        super(props)
        this.state={
            response:[],
            filtername:'',
            dataupdate:false
        }
        this.handlefiltername = this.handlefiltername.bind(this)
    }
    handlefiltername:any =async(event:any)=>{
        const value=event.target.value
        this.setState({filtername:value})
        const result:any = await SortAirport(value)
        this.setState({response:result.data})
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
        console.log('response is')
        console.log(this.state.response)
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

            <FormControl style={{width:"50%",alignItems:'center',alignContent:'center'}}>
            <InputLabel id="demo-simple-select-label" style={{fontSize:'16px'}}>Sort By</InputLabel><br/><br/>
                <select id="country" name="country" onChange={this.handlefiltername} value={this.state.filtername}>
                    <option value="default">Default</option>
                    <option value="recent">Recent</option>
                    <option value="older">Older</option>
                    <option value="nameasc">Sort By name Asc</option>
                    <option value="namedesc">Sort By name Desc</option>
                    <option value="fuelcapacityasc">Sort by FuelCapacity Asc</option>
                    <option value="fuelcapacitydesc">Sort by FuelCapacity Desc</option>
                    <option value="fuelavailableasc">Sort by FuelAvailable Asc</option>
                    <option value="fuelavailabledesc">Sort by FuelAvailable Desc</option>
                </select>
            </FormControl>
            
            {
            this.state.response.length>0&&<Pagination RenderedComponent={Airporttable} data={this.state.response} title={"airport"} pageLimit={5} dataLimit={3} />
            }
        </Fragment>
        )
    }
}
export default DisplayAirports
