import React,{Fragment} from 'react'
import axios from 'axios'
import NavigationComponent from '../Navigation/navcomponent'
import Typography from '@mui/material/Typography';
import Pagination from '../Pagination/pagination'
import Reporttable from './reporttable'

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
            console.log(result)
            this.setState({response:result.data})
            const airportresult = await axios.get('http://localhost:9000/airport')
            this.setState({airportresponse:airportresult.data});
        }
        loaddata()
    }

    render()
    {   
        var airportdata:any=[]
      return(
        <Fragment>
        <NavigationComponent/>
        <br/><br/><br/>
        {
          this.state.airportresponse.map((value:any)=>{
            return (
                <div>
                <Typography
                component="h2"
                variant="h3"
                color="inherit"
                align="left"
                noWrap
                sx={{ flex: 1 }}
                fontFamily="Roboto"
                >
                 {value.name}
                </Typography>
                {
                    <Pagination RenderedComponent={Reporttable} data={this.state.response.filter((data:any)=>data.airport._id===value._id )} title={"report"} pageLimit={5} dataLimit={4} />
                }
                <Typography
                    component="h4"
                    variant="h4"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                    fontFamily="Roboto"
                >
                Fuel Available: {value.fuelavailable}
                </Typography>
                <br/><br/><br/>
                </div>
                )
            })
        }
        </Fragment>
      )
    }
}       
        
export default ReportComponent
