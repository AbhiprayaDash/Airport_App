import React,{Fragment} from 'react'
import axios from 'axios'
import NavigationComponent from '../Navigation/navcomponent'
import Typography from '@mui/material/Typography';
import Pagination from '../Pagination/pagination'
import Reporttable from './reporttable'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
            this.setState({response:result.data})
            const airportresult = await axios.get('http://localhost:9000/airport')
            this.setState({airportresponse:airportresult.data});
            console.log('result data')
            console.log(airportresult)
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
                <Fragment>
                <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <Typography>{value.name}</Typography>
                </AccordionSummary>
                {
                    <AccordionDetails>
                    <Pagination RenderedComponent={Reporttable} data={this.state.response.filter((data:any)=>data.airport._id===value._id )} title={"report"} pageLimit={5} dataLimit={4} />
                    </AccordionDetails>
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
                </Accordion>
                <br/>
                </Fragment>
                )
            })
        }
        </Fragment>
      )
    }
}       
        
export default ReportComponent
