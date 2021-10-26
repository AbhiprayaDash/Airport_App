import React,{Fragment} from 'react'
import axios from 'axios'
import WelcomenavComponent from '../Welcome/welcomenav'
import moment from 'moment'


type typeProvider={
    Duration:Date,
    type:string,
    airport:any,
    quantity:any,
    aircraft:any
}
type stateTypes = {
    response:any,
    airportresponse:any
}
type propTypes = {

}
class ReportComponent extends React.Component<propTypes,stateTypes>{
    constructor(props:propTypes)
    {
        super(props)
        this.state = {
            response:[],
            airportresponse:[]
        }
    }
    componentDidMount(){
        const loaddata= async ()=>{
            const result = await axios.get('http://localhost:9000/transaction')
            this.setState({response:result.data})
            const airportresult = await axios.get('http://localhost:9000/airport')
            this.setState({airportresponse:airportresult.data});
        }
        loaddata()
    }

    render()
    {   
        var airportdata:any=[]
        var element
        return(
            <Fragment>
            <WelcomenavComponent/>
        {
        this.state.airportresponse.map((value:any)=>{
            return (
                <div>
                <h1>{value.details.name}</h1>
                <table style={{fontFamily:'Arial, Helvetica, sans-serif',alignContent:'center',alignItems:'center',border:'1px solid #ddd',width:'100%'}} className="center">
                <tr style={{backgroundColor:'#e5e5e5'}}>
                    <th style={{border: '1px solid #ddd',backgroundColor:'#34a0a4',color:'white'}}><h2>Date/Time  </h2></th>
                    <th style={{border: '1px solid #ddd',backgroundColor:'#34a0a4',color:'white'}}><h2>Type</h2></th>
                    <th style={{border: '1px solid #ddd',backgroundColor:'#34a0a4',color:'white'}}><h2>Fuel</h2></th>
                    <th style={{border: '1px solid #ddd',backgroundColor:'#34a0a4',color:'white'}}><h2>Aircraft</h2></th>
                </tr>
            {
                airportdata =this.state.response.filter((data:any)=>data.airport._id===value._id ).sort(function(a:any,b:any){
                        var date1:any = moment(a.Duration.date).format('YYYYMMDD')
                        var date2:any = moment(b.Duration.date).format('YYYYMMDD')
                        return date1-date2
                        
                })
                .map((val:any)=>{
                    console.log(val)           
                    return(
                        
                    <tr>
                        <td style={{border: '1px solid #ddd',backgroundColor:'#edf6f9',color:'black'}}><p>{moment(val.Duration.date).format('DD/MM/YYYY')} {moment(val.Duration.date).format('hh:mm:ss')}</p></td>
                        <td style={{border: '1px solid #ddd',backgroundColor:'#edf6f9',color:'black'}}><p>{val.Type}</p></td>
                        <td style={{border: '1px solid #ddd',backgroundColor:'#edf6f9',color:'black'}}><p>{val.quantity}</p></td>
                        <td style={{border: '1px solid #ddd',backgroundColor:'#edf6f9',color:'black'}}>
                        {
                            val.hasOwnProperty('aircraft')===true?<p>{val.aircraft.aircraft_no}</p>:<p></p>
                        }
                        </td>
                      </tr>

                    )
                })
            }
                </table>
                 <h1 style={{marginLeft:'800px'}}>Fuel Available: {value.fuelavailable}</h1>
                </div>
                    )
            })
        }
        </Fragment>
        )
    }
}       
        
export default ReportComponent