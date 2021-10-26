import React, { Fragment } from "react"
import axios from 'axios'
import Typography from '@mui/material/Typography';
import moment from 'moment'

type durationType={
    date:Date
}
interface typeProvider{
    Duration:durationType,
    Type:string,
    airport:any,
    aircraft:any,
    quantity:number
}
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
        var aircraft;
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
            Transaction Details
            </Typography>
            <table style={{fontFamily:'Arial, Helvetica, sans-serif',alignContent:'center',alignItems:'center',border:'1px solid #ddd',width:'100%'}} className="center">
                <tr style={{backgroundColor:'#e5e5e5'}}>
                    <th style={{border: '1px solid #ddd',backgroundColor:'#34a0a4',color:'white'}}><h2>Date/Time  </h2></th>
                    <th style={{border: '1px solid #ddd',backgroundColor:'#34a0a4',color:'white'}}><h2>Type</h2></th>
                    <th style={{border: '1px solid #ddd',backgroundColor:'#34a0a4',color:'white'}}><h2>Fuel</h2></th>
                    <th style={{border: '1px solid #ddd',backgroundColor:'#34a0a4',color:'white'}}><h2>Aircraft</h2></th>
                </tr>
                    {
                    this.state.response.sort(function(a:any,b:any){
                        var date1:any = moment(a.Duration.date).format('YYYYMMDD')
                        var date2:any = moment(b.Duration.date).format('YYYYMMDD')
                        return date1-date2
                     }).map(function(value:typeProvider,index:number){
                        return <tr>
                        <td style={{border: '1px solid #ddd',backgroundColor:'#edf6f9',color:'black'}}><p>{moment(value.Duration.date).format('DD/MM/YYYY')} {moment(value.Duration.date).format('hh:mm:ss')} </p></td>
                        <td style={{border: '1px solid #ddd',backgroundColor:'#edf6f9',color:'black'}}><p>{value.Type}</p></td>
                        <td style={{border: '1px solid #ddd',backgroundColor:'#edf6f9',color:'black'}}><p>{value.quantity}</p></td>
                        <td style={{border: '1px solid #ddd',backgroundColor:'#edf6f9',color:'black'}}><p>{value.aircraft&&value.aircraft.aircraft_no}</p></td>
                      </tr>
                    })
                    }
                </table>
                </Fragment>
        )
    }
}
export default DisplayTransaction
