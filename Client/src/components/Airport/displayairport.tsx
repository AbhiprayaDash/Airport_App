import React, { Fragment } from "react"
import axios from 'axios'
import Typography from '@mui/material/Typography';


type detailObjectType={
    name:string,
    location:string
}
interface typeProvider{
    details:detailObjectType,
    fuelcapacity:number,
    fuelavailable:number
}
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
        console.log('mounted')
        return(
            <Fragment>
                <Typography
                component="h1"
                variant="h3"
                color="inherit"
                align="left"
                noWrap
                sx={{ flex: 1 }}
            >
            Aiport Details
            </Typography>
            <table style={{fontFamily:'Arial, Helvetica, sans-serif',alignContent:'center',alignItems:'center',border:'1px solid #ddd',width:'100%'}} className="center">
                <tr style={{backgroundColor:'#e5e5e5'}}>
                    <th style={{border: '1px solid #ddd',backgroundColor:'#34a0a4',color:'white'}}><h2>Aircraft Name  </h2></th>
                    <th style={{border: '1px solid #ddd',backgroundColor:'#34a0a4',color:'white'}}><h2>Airport Location</h2></th>
                    <th style={{border: '1px solid #ddd',backgroundColor:'#34a0a4',color:'white'}}><h2>Fuel Available</h2></th>
                </tr>
                    {
                    this.state.response.map(function(value:typeProvider,index:number){
                        return <tr>
                        <td style={{border: '1px solid #ddd',backgroundColor:'#edf6f9',color:'black'}}><p>Airport Name: {value.details.name}</p></td>
                        <td style={{border: '1px solid #ddd',backgroundColor:'#edf6f9',color:'black'}}><p>Airport Location: {value.details.location}</p></td>
                        <td style={{border: '1px solid #ddd',backgroundColor:'#edf6f9',color:'black'}}><p>Fuel Available:{value.fuelavailable}</p></td>
                      </tr>
                    })
                    }
                </table>
                </Fragment>
        )
    }
}
export default DisplayAirports