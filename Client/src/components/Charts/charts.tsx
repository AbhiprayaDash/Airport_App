import React,{Fragment} from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import axios from 'axios'
import moment from 'moment'
import NavigationComponent from "../Navigation/navcomponent";
type stateTypes = {
    response:any,
    airportresponse:any
}
type propTypes = {

}
class Chart extends React.Component<propTypes,stateTypes>{
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
        const data:any=[]
        this.state.airportresponse.map((value:any)=>{
            this.state.response.filter((data:any)=>data.airport._id===value._id ).sort(function(a:any,b:any){
                var date1:any = moment(a.Duration.date).format('YYYYMMDD')
                var date2:any = moment(b.Duration.date).format('YYYYMMDD')
                var time1:any = moment(a.Duration.date).format('HH')
                var time2:any = moment(b.Duration.date).format('HH')
                if(date1===date2)
                {
                    return time2-time1
                }
                return date2-date1
            })
            .map((val:any)=>{ 
                val.Duration.date=moment(val.Duration.date).format('DD/MM/YYYY')
                data.push(val)
            })
        })
        return(
            <Fragment>
            <NavigationComponent/>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={data} width={500} height={300} margin={{ top: 5, right: 300, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Duration.date" interval={'preserveStartEnd'}  />
                <YAxis dataKey="quantity" interval={'preserveStartEnd'}  />
                <Tooltip contentStyle={{ backgroundColor: 'yellow' }} />
                <Legend />
                <Line type="monotone" dataKey="quantity" stroke="red" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="airport.name" stroke="green" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            </Fragment>
        )  
    }
}
export default Chart