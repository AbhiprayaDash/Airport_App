import { Paper } from "@mui/material"
import { FC, Fragment, useEffect, useState } from "react"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import { useAppSelector } from "../../hooks"

type BarProps = {
    airportlabel:any,
    datasets:any,
    BarChartOptions:any,
    plugin:any
}
type LineProps = {
    label:any,
    datasets:any,
    Options:any,
    plugin:any
}
// type DoughnutProps = {
//     totalOuttransaction:Number,
//     totalIntransaction:Number
// }
type TotalProptypes = {
    totaltransaction:Number,
    totalfuelavailable:Number,
    totalfuelcapacity:Number
}
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
export const BarCharts:FC<BarProps> = (props:BarProps) =>{
    return(
        <Bar data={{
            labels:props.airportlabel,
            datasets:props.datasets,
            }} className="linedata" options={props.BarChartOptions} plugins={[plugin]}/>
    )
}
export const LineCharts:FC<LineProps> = (props:LineProps) =>{
    return(
        <Line data={{
            labels: props.label,
            datasets: props.datasets,
        }}  className="linedata" style={{position: 'relative', height:'400px', width:'80vw'}} options={props.Options} plugins={[plugin]}/>
    )
}

export const DoughnutData:FC= () =>{
    const response:Array<any>= useAppSelector((state:any) => state.Transaction.response);
    const [totalIntransaction,settotalIntransaction] = useState<Number>(0)
    const [totalOuttransaction,settotalOuttransaction] = useState<Number>(0)
    const [totaltransaction,settotaltransaction] = useState<Number>(0)
    useEffect(()=>{
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
    },[response])
    return(
        <Doughnut data={{
            labels: [
                'Out Transaction',
                'In Transaction'
    
            ],
            datasets: [{
                data: [totalOuttransaction, totalIntransaction],
                backgroundColor: [
                    '#4895ef',
                    '#6c757d'
                ],
                hoverBackgroundColor: [
                    '#7b2cbf',
                    '#76c893'
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
    )
    
}
export const TotalCharts:FC<TotalProptypes> = (props:TotalProptypes) =>{
    return(
    <Fragment>
    <Paper style={{backgroundColor:'#343a40'}} elevation={10}>
        <h4 style={{color:'white'}}>Total Transaction</h4>
        <br/>
        <h5 style={{color:'white'}}>{props.totaltransaction} Litres</h5>
    </Paper>
    <br/><br/>
    <Paper style={{backgroundColor:'#343a40'}} elevation={10}>
        <h4 style={{color:'white'}}>Total FuelAvailable</h4>
        <br/>
        <h5 style={{color:'white'}}>{props.totalfuelavailable} Litres</h5>
    </Paper>
    <br/><br/>
    <Paper style={{backgroundColor:'#343a40'}} elevation={10}>
        <h4 style={{color:'white'}}>Total FuelCapacity</h4>
        <br/>
        <h5 style={{color:'white'}}>{props.totalfuelcapacity} Litres</h5>
    </Paper>
    </Fragment>
    )
}