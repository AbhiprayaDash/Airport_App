import {Fragment,FC, useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchAirport } from "../../Redux/Airport";
import { FetchTransaction } from "../../Redux/Transaction";
import MediaQuery from "react-responsive";
import '../../css/charts.css'
import DashboardNavigation from "../Dashboard/DashboardNav";
import { Chartdata } from "./chartnavdata";
import { headersData } from "./chartheader";
import { ComparisionTables } from "./comparisiontable";
import { BarCharts, DoughnutData, LineCharts,TotalCharts } from "./displaychart";
import { Bar, Line } from "react-chartjs-2";
import { FuelcapacityPlot, lineGraphData, TopFuelcapacityBarPlot, TopFuelcapacityLinePlot, TopIntransactionBarPlot, TopIntransactionLinePlot, TopOutTransactionBarplot, TopOutTransactionLineplot } from "./plotdata";
import { BarChartOptions, Options } from "./chartoptions";

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

type PropTypes={
    history:any
}
const Chart:FC<PropTypes> =(props:PropTypes) =>{
        const response:Array<any>= useAppSelector((state:any) => state.Transaction.response);
        const airportresponse:Array<any> = useAppSelector((state:any) => state.Airport.response);
        const Airportresponse:Array<any> = [...airportresponse];
        var totalfuelavailable:Number=0;
        var totalfuelcapacity:Number=0;
        const dispatch = useAppDispatch();
        var transactiondata:Array<any> = response
        const [topfuelcap,settopfuelcapacity]= useState<Array<any>>([])
        const [topfuelavailable,settopfuelavailable] = useState<Array<any>>([])
        const [topOuttransaction,setOuttransaction] = useState<Array<any>>([]) 
        const [topIntransaction,setIntransaction] = useState<Array<any>>([]) 
        const [totalIntransaction,settotalIntransaction] = useState<Number>(0)
        const [totalOuttransaction,settotalOuttransaction] = useState<Number>(0)
        const [totaltransaction,settotaltransaction] = useState<Number>(0)
        var label:Array<string>=transactiondata.map((transaction) => new Date(transaction.Duration.date)
            .toLocaleString("en-US", { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })
            .toString())
            .slice(0, 15)
        var topairportcapacitylabel:Array<string> = topfuelcap?.map((response:any)=>response.name)
        var topIntransactionlabel:Array<string> = topIntransaction?.map((response:any)=>response.airport.name)
        var topOuttransactionlabel:Array<string> = topOuttransaction?.map((response:any)=>response.airport.name)
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
        }).map((airport:any)=>{
            totalfuelavailable+=airport.fuelavailable
            totalfuelcapacity+=airport.fuelcapacity
            return airport.name
        })
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
        useEffect(()=>{
            settopfuelcapacity(Airportresponse.sort(function(a,b){
                return b.fuelcapacity-a.fuelcapacity
            }).slice(0,5))
            settopfuelavailable(Airportresponse.sort(function(a,b){
                return b.fuelavailable-a.fuelavailable
            }).slice(0,5))
            setOuttransaction(response.filter((res:any)=>{
                return res.Type==="OUT"
            }).sort(function(a,b){
                return b.quantity-a.quantity
            }).slice(0,5))
            setIntransaction(response.filter((res:any)=>{
                return res.Type==="IN"
            }).sort(function(a,b){
                return b.quantity-a.quantity
            }).slice(0,5))
            var totalin:any=0;
            var totalout:any=0
            response.filter((res:any)=>{
                return res.Type==="IN"
            }).map((transaction:any)=>{
                totalin+=transaction.quantity
            })
            response.filter((res:any)=>{
                return res.Type==="OUT"
            }).map((transaction:any)=>{
                totalout+=transaction.quantity
            })
            settotalIntransaction(totalin)
            settotalOuttransaction(totalout)
            settotaltransaction(totalin+totalout)
        },[airportresponse])
            return(
                <Fragment>
                <DashboardNavigation SidebarData={Chartdata} headersData={headersData} history={props.history}/>
                <br/><br/><br/><br/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                        <h1 className="ui teal header" style={{marginTop:'2%',textAlign:'center',fontSize: 60,fontWeight:"bold"}}>Report</h1>
                        </div>
                    </div>
                    <br/>
                </div>
                <MediaQuery minWidth={1200}>
                <div className="container-fluid" style={{paddingLeft:'270px'}}>
                    <div className="row">
                        <div className="col-12">
                            <div className="shadow-lg p-3 mb-5 bg-body rounded" id="chartcontainer">
                            <h2 className="heading" >Fuel Quantity Line Chart</h2>
                            <br/>                         
                            <div className="chart-container" > 
                            <LineCharts label={label} datasets={lineGraphData(Airportresponse,response)} Options={Options} plugin={[plugin]}/>
                            </div><br/><br/><br/><br/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    
                    <div className="shadow-lg p-3 mb-5 bg-body rounded" >
                    <div className="row">
                        <h2 className="heading" >Top 5 Fuel Capacity Reports</h2>
                        <div className="col-1">

                        </div>                    
                        <div className="col-5">
                        <div className="shadow-lg p-3 mb-5 bg-body rounded" id="chartcontainer">
                            <br/>                         
                            <div className="chart-container" > 
                                <Bar data={{
                                labels:topairportcapacitylabel,
                                datasets:TopFuelcapacityBarPlot(topfuelcap),
                                }}  options={BarChartOptions} plugins={[plugin]}/>
                            </div>
                        </div>
                        </div>
                        <div className="col-5">
                        <div className="shadow-lg p-3 mb-5 bg-body rounded" id="chartcontainer">
                            <br/>                         
                            <div className="chart-container" > 
                                <Line data={{
                                labels: topairportcapacitylabel,
                                datasets: TopFuelcapacityLinePlot(topfuelcap),
                            }}   style={{position: 'relative', height:'400px', width:'80vw'}} options={Options} plugins={[plugin]}/> 
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="shadow-lg p-3 mb-5 bg-body rounded" >
                    <div className="row">
                        <h2 className="heading" >Top 5 In Transaction Reports</h2>
                        <div className="col-1">

                        </div>                    
                        <div className="col-5">
                        <div className="shadow-lg p-3 mb-5 bg-body rounded" id="chartcontainer">
                            <br/>                         
                            <div className="chart-container" > 
                                <Bar data={{
                                labels:topIntransactionlabel,
                                datasets:TopIntransactionBarPlot(topIntransaction),
                                }}  options={BarChartOptions} plugins={[plugin]}/>
                            </div>
                        </div>
                        </div>
                        <div className="col-5">
                        <div className="shadow-lg p-3 mb-5 bg-body rounded" id="chartcontainer">
                            <br/>                         
                            <div className="chart-container" > 
                                <Line data={{
                                labels: topIntransactionlabel,
                                datasets: TopIntransactionLinePlot(topIntransaction),
                            }}   style={{position: 'relative', height:'400px', width:'80vw'}} options={Options} plugins={[plugin]}/> 
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="shadow-lg p-3 mb-5 bg-body rounded" >
                    <div className="row">
                        <h2 className="heading" >Top 5 Out Transaction Reports</h2>
                        <div className="col-1">

                        </div>                    
                        <div className="col-5">
                        <div className="shadow-lg p-3 mb-5 bg-body rounded" id="chartcontainer">
                            <br/>                         
                            <div className="chart-container" > 
                                <Bar data={{
                                labels:topOuttransactionlabel,
                                datasets:TopOutTransactionBarplot(topOuttransaction),
                                }}  options={BarChartOptions} plugins={[plugin]}/>
                            </div>
                        </div>
                        </div>
                        <div className="col-5">
                        <div className="shadow-lg p-3 mb-5 bg-body rounded" id="chartcontainer">
                            <br/>                         
                            <div className="chart-container" > 
                                <Line data={{
                                labels: topOuttransactionlabel,
                                datasets: TopOutTransactionLineplot(topOuttransaction),
                            }}   style={{position: 'relative', height:'400px', width:'80vw'}} options={Options} plugins={[plugin]}/> 
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="row" >
                        
                        {/* <div className="col-4">
                        <div className="shadow-lg p-3 mb-5 bg-body rounded" id="chartcontainer">
                        <h2 className="heading" >In/Out Transaction Reports</h2>
                            <DoughnutData/>
                        </div>
                        </div> */}
                        {/* <div className="col-3">
                            <TotalCharts totalfuelavailable={totalfuelavailable} totaltransaction={totaltransaction} totalfuelcapacity={totalfuelcapacity}/>                                                       
                        </div> */}
                        <ComparisionTables topfuelcap={topfuelcap} topfuelavailable={topfuelavailable} topOuttransaction={topOuttransaction} topIntransaction={topIntransaction} totalIntransaction={totalIntransaction} totalOuttransaction={totalOuttransaction}/>
                    </div>
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={600}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="shadow-lg p-3 mb-5 bg-body rounded" id="chartcontainer">
                            <h2 className="heading" >Fuel Quantity Line Chart</h2>
                            <br/>                         
                            <div className="chart-container" > 
                            <LineCharts label={label} datasets={lineGraphData(Airportresponse,response)} Options={Options} plugin={[plugin]}/>
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
                            <BarCharts airportlabel={airportlabel} datasets={FuelcapacityPlot(Airportresponse)} BarChartOptions={BarChartOptions} plugin={[plugin]}/>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                    <ComparisionTables topfuelcap={topfuelcap} topfuelavailable={topfuelavailable} topOuttransaction={topOuttransaction} topIntransaction={topIntransaction} totalIntransaction={totalIntransaction} totalOuttransaction={totalOuttransaction}/>
                    </div>
                </div>
                </MediaQuery>
            </Fragment>
            )  
}

export default Chart
