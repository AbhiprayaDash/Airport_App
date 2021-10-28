import React,{Fragment} from 'react'
import axios from 'axios'
import moment from 'moment'
import NavigationComponent from '../Navigation/navcomponent'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import {StyledTableCell,StyledTableRow} from '../Airport/tablestyle'
import Typography from '@mui/material/Typography';


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
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                   <TableHead>
                    <StyledTableRow>
                    <StyledTableCell>Date/Time</StyledTableCell>
                    <StyledTableCell >Type</StyledTableCell>
                    <StyledTableCell>Fuel</StyledTableCell>
                    <StyledTableCell>Aircraft</StyledTableCell>
                    </StyledTableRow>
                   </TableHead>
                   <TableBody>
                    {
                    airportdata =this.state.response.filter((data:any)=>data.airport._id===value._id ).sort(function(a:any,b:any){
                        var date1:any = moment(a.Duration.date).format('YYYYMMDD')
                        var date2:any = moment(b.Duration.date).format('YYYYMMDD')
                        var time1:any = moment(a.Duration.date).format('HH')
                        var time2:any = moment(b.Duration.date).format('HH')
                        if(date1===date2)
                        {
                            return time2-time1
                        }
                        return date2-date1
                    })
                .map((val:any)=>{ 
                    return(
                        <StyledTableRow
                            key={moment(val.Duration.date).format('HH:mm:ss')}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <StyledTableCell component="th" scope="row">
                            {moment(val.Duration.date).format('DD/MM/YYYY')} {moment(val.Duration.date).format('HH:mm:ss')}
                        </StyledTableCell>
                        <StyledTableCell >{val.Type}</StyledTableCell>
                        <StyledTableCell >{val.quantity}</StyledTableCell>
                        <StyledTableCell >{
                            val.hasOwnProperty('aircraft')===true?<p>{val.aircraft.aircraft_no}</p>:<p></p>
                            }
                        </StyledTableCell>
                        </StyledTableRow>
                        )
                    })
                    }
                  </TableBody>
                </Table>
                </TableContainer>
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
