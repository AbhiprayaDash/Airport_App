import {Fragment,FC, useEffect} from "react";
import { Line,Bar,Doughnut} from 'react-chartjs-2'
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchAirport } from "../../Redux/Airport";
import { FetchTransaction } from "../../Redux/Transaction";
import ChartNavigation from "./chartnavigation";
import '../../css/charts.css'
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
function isMobileDevice(){
    return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}
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
            .slice(0, 15)
        var responsedata = Airportresponse.map((airports:any)=>{
            return response.filter((data:any)=>data.airport._id===airports._id )
        })
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
        const BarChartOptions:any = {
            plugins: {
                legend: {
                  display: !isMobileDevice()  
                }
            },
            scales:{
                x: {
                    ticks: {
                      display: !isMobileDevice(),
                    }
                }
            }
        }
        const Options:any = {
            scales: {
                // yAxes: [{
                //     // xAxesOptions,
                //     ticks: {
                //         fontSize: 52
                //     }
                // }],
                x: {
                    ticks: {
                      display: !isMobileDevice(),
                    }
                }
            },
            
            plugins: {
                legend: {
                  display: !isMobileDevice()
                  
                }
            },
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

                            }).slice(0,15)
                        ,
                        fill: false,
                        backgroundColor: colorHex[airportIndex],
                        borderColor: colorHex[airportIndex],
                        pointStyle:'circle',
                        hoverRadius:10,
                        pointRadius:3,
                        yAxisID: 'y-axis-0',
                         //borderWidth:5,
                        plugins: [plugin],
                        options: {
                            maintainAspectRatio : false,
                            responsive:true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Custom Chart Title'
                                },
                                
                                // legend:{
                                //     display:false,
                                //     labels: {
                                //         // This more specific font property overrides the global property
                                //         font: {
                                //             size: 14
                                //         }
                                //     }
                                // },
                                yAxes: [{
                                    // xAxesOptions,
                                    ticks: {
                                        fontSize: 52
                                    }
                                }],
                                // x: {
                                //     ticks: {
                                //         font: {
                                //             size: 62,
                                //         }
                                //     }
                                // },
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
                        data: `${airport.fuelavailable}`,
                        fill: false,
                        backgroundColor: colorHex[airportIndex],
                        borderColor: colorHex[airportIndex],
                        barThickness: 'flex',
                        categoryPercentage:1.0,
                        barPercentage:1.0,
                        maxBarThickness:15,
                        options: {
                            maintainAspectRatio : false,
                        }
                        
                    })
            })
            return data
        }
            return(
                <Fragment>
                <ChartNavigation/>
                <br/><br/><br/><br/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                        <h1 className="ui teal header" style={{marginTop:'2%',textAlign:'center',fontSize: 60,fontWeight:"bold"}}>Report</h1>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-12">
                            <div className="shadow-lg p-3 mb-5 bg-body rounded" id="chartcontainer">
                            <h2 className="heading" >Fuel Quantity Line Chart</h2>
                            <br/>                         
                            <div className="chart-container" > 
                            <Line data={{
                                    labels: label,
                                    datasets: lineGraphData(),
                                }}  className="linedata" style={{position: 'relative', height:'400px', width:'80vw'}} options={Options} plugins={[plugin]}/>
                            </div><br/><br/><br/><br/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-12">
                            <div className="shadow-lg p-3 mb-5 bg-body rounded">
                            <br/>
                            <h2 className="heading">Fuel Available Bar Chart</h2>
                            <div className="chart-container" >
                            <Bar data={{
                                labels:airportlabel,
                                datasets:FuelcapacityPlot(),
                                }} className="linedata" options={BarChartOptions} plugins={[plugin]}/>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                        <h1 className="heading">Transaction(In/Out) Doughnut Chart</h1>
                            <br/>
                        <div className="shadow-lg p-3 mb-5 bg-body rounded" style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        
                        // height: "50%",
                        
                        // justifyContent: "space-around",
                        justifyContent: "center"
                     }}>
                         <br/>
                          
                          <br/><br/><br/>
                    {
                    responsedata?.map((response:any) => {
                        var insum=0;
                        var outsum=0;
                        console.log(response)
                        response?.map((res:any)=>
                        {
                            if(res.Type==="IN")
                                insum+=res.quantity
                            if(res.Type=="OUT")
                                outsum+=-res.quantity
                        })
                        return (
                        response.length>0&&<div key={'1'} className="card" style={{ width: "20rem", margin: "5px",display:'block' }}>
                            <div className="card-body" style={{paddingTop:'20%'}}>
                                <div className="bardata">

                                    <Doughnut data={{
                                        labels: [
                                            'In',
                                            'Out'

                                        ],
                                        datasets: [{
                                            data: [insum, outsum],
                                            backgroundColor: [
                                                '#023e8a',
                                                '#52b788'
                                            ],
                                            hoverBackgroundColor: [
                                                '#7b2cbf',
                                                '#d81b60'
                                            ]
                                        }]
                                    }}  options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                        aspectRatio: 2,
                                        plugins: {
                                            legend: {
                                                display: true,
                                                position: 'bottom',
                                                labels: {
                                                    padding: 4,
                                                },
                                            },
                                        },

                                    }}  />
                                    <br/>
                                    <label style={{fontWeight:'bold',textAlign:'center'}}>{response[0].airport.name}</label>
                                </div>
                            </div>
                        </div>
                        )
                        })
                    }
                    </div>
                    </div>
                    </div>
                </div>
            </Fragment>
            )  
}

export default Chart
