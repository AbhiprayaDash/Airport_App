import {Fragment,FC, useEffect} from "react";
import { Line,Bar,Doughnut } from 'react-chartjs-2'
import NavigationComponent from "../Navigation/navcomponent";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchAirport } from "../../Redux/Airport";
import { FetchTransaction } from "../../Redux/Transaction";


const colorHex = ["#937B63", "#1e88e5", "#64ffda", "#aa00ff", "#cddc39", "#7e57c2", "#81c784", "#0091ea", "#f06292", "#5e35b1", "#eeff41"]
const Chart:FC =() =>{
    const response:Array<any>= useAppSelector((state:any) => state.Transaction.response);
    const airportresponse:Array<any> = useAppSelector((state:any) => state.Airport.response);
    const Airportresponse:Array<any> = [...airportresponse];
    const dispatch = useAppDispatch();
    var transactiondata:Array<any> = response
    var label:Array<string>=transactiondata.map((transaction) => new Date(transaction.Duration.date)
    .toLocaleString("en-US", { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })
    .toString())
    .slice(0, 10)
    var airportlabel:Array<string> =airportresponse.map((airport:any)=>airport.name)

    const Options:any = {
        scales: {
        yAxes: [
            {
            ticks: {
                beginAtZero: true,
            },
            },
        ],
        },
    };


    useEffect(()=>{
        const loaddata= async ()=>{
            const fetchfunctransaction =FetchTransaction()
            await fetchfunctransaction(dispatch)
            const fetchfunc=fetchAirport()
            await fetchfunc(dispatch)
        }
        loaddata()
    },[])
    const lineGraphData =()=>{
        const data:any = Airportresponse?.sort(function (a:any, b:any) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase(); 
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        }).map((airport:any, airportIndex:any) => {
            let tempQuantity = airport.fuelavailable
            return (
                {
                    label: `${airport.name}`,
                    data: response
                        .map((transaction:any) => {
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
                })
        })
        return data
    }
    const FuelcapacityPlot = ()=>{
        const data:any = Airportresponse?.sort(function (a:any, b:any) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase(); 
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        }).map((airport:any, airportIndex:any) => {
            return (
                {
                    label: `${airport.name}`,
                    data: `${airport.fuelavailable}`,
                    fill: false,
                    backgroundColor: colorHex[airportIndex],
                    borderColor: colorHex[airportIndex],
                })
        })
        return data
    }
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
                    datasets: lineGraphData(),
                }} />
            <Bar data={{labels:airportlabel,
                datasets:FuelcapacityPlot(),
                }} options={Options}/>
            </div>
        </div>
        </Fragment>
        )  
}

export default Chart
