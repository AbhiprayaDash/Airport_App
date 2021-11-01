import React,{Fragment} from "react"
import Typography from '@mui/material/Typography';
import {loadAircraftData} from './aircraftservice'
import Pagination from '../Pagination/pagination'
import Aircrafttable from './aircrafttable'
import axios from "axios";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

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
            filtername:''
        }
        this.handlefiltername = this.handlefiltername.bind(this)
    }
    handlefiltername:any =async(event:any)=>{
        const value=event.target.value
        console.log(value)
        if(value==="numberasc")
        {
            const result = await axios.get('http://localhost:9000/aircraft/filter/aircraft_no?sort=asc')
            console.log(result.data)
            this.setState({response:result.data})
        }
        else if(value==="numberdesc")
        {
            const result = await axios.get('http://localhost:9000/aircraft/filter/aircraft_no?sort=desc')
            console.log(result.data)
            this.setState({response:result.data})
        }
        else if(value==="airlineasc")
        {
            const result = await axios.get('http://localhost:9000/aircraft/filter/airline?sort=asc')
            console.log(result.data)
            this.setState({response:result.data})
        }
        else if(value==="airlinedesc")
        {
            const result = await axios.get('http://localhost:9000/aircraft/filter/airline?sort=desc')
            console.log(result.data)
            this.setState({response:result.data})
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
            <FormControl style={{width:"50%",alignItems:'center',alignContent:'center'}}>
            <InputLabel id="demo-simple-select-label" style={{fontSize:'16px'}}>Sort By</InputLabel><br/><br/>
                <select id="country" name="country" onChange={this.handlefiltername} value={this.state.filtername}>
                    <option value="default">Default</option>
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

