function isMobileDevice(){
    return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

export const BarChartOptions:any = {
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
export const Options:any = {
    scales: {
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