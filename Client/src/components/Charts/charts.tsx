import React,{Fragment} from "react";
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import NavigationComponent from "../Navigation/navcomponent";
type stateTypes = {
    response:Array<any>,
    airportresponse:Array<any>
}
type propTypes = {

}
const colorHex = ["#937B63", "#1e88e5", "#64ffda", "#aa00ff", "#cddc39", "#7e57c2", "#81c784", "#0091ea", "#f06292", "#5e35b1", "#eeff41"]
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
                const result:any = await axios.get('http://localhost:9000/transaction')
                this.setState({response:result.data})
                const airportresult:any = await axios.get('http://localhost:9000/airport')
                this.setState({airportresponse:airportresult.data});
            }
            loaddata()
            
    }
    lineGraphData =()=>{
        const data = this.state.airportresponse?.sort(function (a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        }).map((airport, airportIndex) => {
            let tempQuantity = airport.fuelavailable
            return (
                {
                    label: `${airport.name}`,
                    data: this.state.response
                        .map((transaction) => {
                            if ((String(transaction.airport._id) === String(airport._id)) && (transaction.Type === "IN")) {
                                tempQuantity = (Number(tempQuantity) - Number(transaction.quantity))

                            } if ((String(transaction.airport_id) === String(airport._id)) && (transaction.Type === "OUT")) {
                                tempQuantity = (Number(tempQuantity) + Number(transaction.quantity))
                            }
                            return tempQuantity

                        }).slice(0,10)
                    ,
                    fill: false,
                    backgroundColor: colorHex[airportIndex],
                    borderColor: colorHex[airportIndex],
                    // yAxisID: 'y-axis-1',
                })
    })
    return data
}

    render()
    {
        var transactiondata:Array<any> = this.state.response
        var label:Array<string>=transactiondata.map((transaction) => new Date(transaction.Duration.date)
        .toLocaleString("en-US", { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })
        .toString())
        .slice(0, 25)
        return(
            <Fragment>
            <NavigationComponent/>
            <div className="shadow-lg p-3 mb-5 bg-body rounded" style={{ margin: "20px" , minWidth: "fit-content"}}>
            <div className='header'>
                <div className='links'>

                </div>
            </div >
            <div className="chart-container" >
            <Line data={{
                    labels: label,
                    datasets: this.lineGraphData(),
                }} />
            </div>
        </div>
        </Fragment>
        )  
    }
}
export default Chart