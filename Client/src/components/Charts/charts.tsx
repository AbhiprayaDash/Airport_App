import {Fragment,FC, useEffect} from "react";
import { Line,Bar} from 'react-chartjs-2'
import NavigationComponent from "../Navigation/navcomponent";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchAirport } from "../../Redux/Airport";
import { FetchTransaction } from "../../Redux/Transaction";

// Note: changes to the plugin code is not reflected to the chart, because the plugin is loaded at chart construction time and editor changes only trigger an chart.update().
const image = new Image();
image.src = 'https://www.chartjs.org/img/chartjs-logo.svg';

const plugin = {
  id: 'custom_canvas_background_image',
  beforeDraw: (chart:any) => {
    if (image.complete) {
      const ctx = chart.ctx;
      const {top, left, width, height} = chart.chartArea;
      const x = left + width / 2 - image.width / 2;
      const y = top + height / 2 - image.height / 2;
      ctx.drawImage(image, x, y);
    } else {
      image.onload = () => chart.draw();
    }
  }
};

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
    .slice(0, 25)
    var airportlabel:Array<string> =Airportresponse?.sort(function (a:any, b:any) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase(); 
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }).map((airport:any)=>airport.name)
    var xAxesOptions = [{
        scaleLabel: {
          display: true,
          labelString: 'probability'
        }
    }];
    const Options:any = {
        scales: {
            yAxes: xAxesOptions
        }
    };
    const loaddata=async() =>{
        if(response.length===0)
        {
            const fetchfunctransaction =FetchTransaction()
            await fetchfunctransaction(dispatch)
        }
        if(airportresponse.length===0)
        {
            const fetchfunc=fetchAirport()
            await fetchfunc(dispatch)
        }
    }

    useEffect(()=>{
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

                        }).slice(0,25)
                    ,
                    fill: false,
                    backgroundColor: colorHex[airportIndex],
                    borderColor: colorHex[airportIndex],
                    pointStyle:'circle',
                    hoverRadius:10,
                    pointRadius:5,
                    yAxisID: 'y-axis-0',
                    borderWidth:5,
                    plugins: [plugin],
                    options: {
                        plugins: {
                            title: {
                                display: true,
                                text: 'Custom Chart Title'
                            },
                            legend:{
                                display:true
                            },
                            datasets:{
                                line:{
                                    borderWidth:20
                                }
                            }
                        }                      
                    }
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
                    data: `${airport.fuelcapacity}`,
                    fill: false,
                    backgroundColor: colorHex[airportIndex],
                    borderColor: colorHex[airportIndex],
                    barThickness: 'flex',
                    categoryPercentage:1.0,
                    barPercentage:1.0,
                    maxBarThickness:15
                })
        })
        return data
    }
        return(
            <Fragment>
            <NavigationComponent/>
            <h1 style={{marginLeft:"800px",fontSize: 64,fontWeight:"bold"}}>Report</h1>
            <div className="shadow-lg p-3 mb-5 bg-body rounded" style={{ margin: "20px" , minWidth: "fit-content"}}>
            <div className='header'>
                <div className='links'>

                </div>
            </div >
            <div className="chart-container" >
            <h3 style={{fontWeight:"bold"}}>X Axis-<span>Date & Time</span></h3>
            <h3 style={{fontWeight:"bold"}}>Y Axis-<span>Fuel Available</span></h3>
            <Line data={{
                    labels: label,
                    datasets: lineGraphData(),
                }} height={100} options={Options} plugins={[plugin]}/>
            </div><br/><br/><br/><br/>
            <div className="chart-container" >
            <Bar data={{
                labels:airportlabel,
                datasets:FuelcapacityPlot(),
                }} height={100} plugins={[plugin]}/>
            </div>
        </div>
        </Fragment>
        )  
}

export default Chart
