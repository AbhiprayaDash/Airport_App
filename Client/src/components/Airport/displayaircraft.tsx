import React,{Fragment} from "react"
import axios from 'axios'
import Typography from '@mui/material/Typography';

interface typeProvider{
    aircraft_no:number,
    airline:string
}
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
        var loaddata = async()=>{
            const response = await axios.get('http://localhost:9000/aircraft')
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
                noWrap
                sx={{ flex: 1 }}
            >
            Aircraft Details
            </Typography>
            <table style={{fontFamily:'Arial, Helvetica, sans-serif',alignContent:'center',alignItems:'center',border:'1px solid #ddd',width:'100%'}} className="center">
                <tbody>
                <tr style={{backgroundColor:'#e5e5e5'}}>
                    <th style={{border: '1px solid #ddd',backgroundColor:'#34a0a4',color:'white'}}><h2>Aircraft No  </h2></th>
                    <th style={{border: '1px solid #ddd',backgroundColor:'#34a0a4',color:'white'}}><h2>Airplane</h2></th>
                </tr>
                    {
                    this.state.response.sort(function(a:any,b:any){
                        return (a.aircraft_no-b.aircraft_no);
                     }).map(function(value:typeProvider,index:number){
                        return <tr key={index}>
                        <td style={{border: '1px solid #ddd',backgroundColor:'#edf6f9',color:'black'}}><p>{value.aircraft_no}</p></td>
                        <td style={{border: '1px solid #ddd',backgroundColor:'#edf6f9',color:'black'}}><p>{value.airline}</p></td>
                      </tr>
                    })
                    }
                </tbody>
                </table>

            </Fragment>
        )
    }
}
export default DisplayAircrafts
