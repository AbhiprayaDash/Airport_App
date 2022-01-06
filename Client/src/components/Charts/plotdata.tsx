const colorHex = ["#937B63", "#1e88e5", "#64ffda", "#aa00ff", "#cddc39", "#7e57c2", "#81c784", "#0091ea", "#f06292", "#5e35b1", "#eeff41"]
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


export const TopOutTransactionBarplot = (dataArray:any) =>{
    const data:any = dataArray?.map((response:any, Index:any) => {
        return (
            {
                label: `${response.airport.name}`,
                data: `${response.quantity}`,
                fill: false,
                backgroundColor: colorHex[Index],
                borderColor: colorHex[Index],
                options: {
                    maintainAspectRatio : false,
                },
                borderWidth: 1
                
            })
    })
    return data
}
export const TopOutTransactionLineplot = (dataArray:any) =>{
    const data:any = dataArray?.map((response:any, Index:any) => {
        return (
            {
                label: `${response.airport.name}`,
                data: `${response.quantity}`,
                fill: false,
                backgroundColor: colorHex[Index],
                borderColor: colorHex[Index],
                pointStyle:'circle',
                hoverRadius:10,
                pointRadius:3,
                yAxisID: 'y-axis-0',
                plugins: [plugin],
                options: {
                    maintainAspectRatio : false,
                    responsive:true,
                    plugins: {
                        yAxes: [{
                            ticks: {
                                fontSize: 52
                            }
                        }],
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
export const TopFuelcapacityLinePlot =(dataArray:any)=>{
    const data:any = dataArray?.map((airport:any, airportIndex:any) => {
        return (
            {
                label: `${airport.name}`,
                data: `${airport.fuelcapacity}`,
                fill: false,
                backgroundColor: colorHex[airportIndex],
                borderColor: colorHex[airportIndex],
                pointStyle:'circle',
                hoverRadius:10,
                pointRadius:3,
                yAxisID: 'y-axis-0',
                plugins: [plugin],
                options: {
                    maintainAspectRatio : false,
                    responsive:true,
                    plugins: {
                        yAxes: [{
                            ticks: {
                                fontSize: 52
                            }
                        }],
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
export const TopIntransactionLinePlot =(dataArray:any)=>{
    const data:any = dataArray?.map((airport:any, airportIndex:any) => {
        return (
            {
                label: `${airport.airport.name}`,
                data: `${airport.quantity}`,
                fill: false,
                backgroundColor: colorHex[airportIndex],
                borderColor: colorHex[airportIndex],
                pointStyle:'circle',
                hoverRadius:10,
                pointRadius:3,
                yAxisID: 'y-axis-0',
                plugins: [plugin],
                options: {
                    maintainAspectRatio : false,
                    responsive:true,
                    plugins: {
                        yAxes: [{
                            ticks: {
                                fontSize: 52
                            }
                        }],
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
export const lineGraphData =(dataArray:any,response:any)=>{
    const data:any = dataArray?.sort(function (a:any, b:any) {
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
                        yAxes: [{
                            ticks: {
                                fontSize: 52
                            }
                        }],
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
export const TopIntransactionBarPlot = (dataArray:any)=>{
    const data:any = dataArray?.map((response:any, Index:any) => {
        return (
            {
                label: `${response.airport.name}`,
                data: `${response.quantity}`,
                fill: false,
                backgroundColor: colorHex[Index],
                borderColor: colorHex[Index],
                options: {
                    maintainAspectRatio : false,
                },
                borderWidth: 1
                
            })
    })
    return data
}
export const TopFuelcapacityBarPlot = (dataArray:any)=>{
    const data:any = dataArray?.map((airport:any, airportIndex:any) => {
        return (
            {
                label: `${airport.name}`,
                data: `${airport.fuelcapacity}`,
                fill: false,
                backgroundColor: colorHex[airportIndex],
                borderColor: colorHex[airportIndex],
                options: {
                    maintainAspectRatio : false,
                },
                borderWidth: 1
                
            })
    })
    return data
}
export const FuelcapacityPlot = (dataArray:any)=>{
    const data:any = dataArray?.sort(function (a:any, b:any) {
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