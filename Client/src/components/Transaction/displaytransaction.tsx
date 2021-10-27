import React, { Fragment } from "react"
import axios from 'axios'
import Typography from '@mui/material/Typography';
import moment from 'moment'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import {StyledTableCell,StyledTableRow} from '../Airport/tablestyle'

type durationType={
    date:Date
}
interface typeProvider{
    Duration:durationType,
    Type:string,
    airport:any,
    aircraft:any,
    quantity:number
}
type statetypes={
    response:any
}
type proptypes={
    
}
class DisplayTransaction extends React.Component<proptypes,statetypes>{

    constructor(props:proptypes){
        super(props)
        this.state={
            response:[]
        }
    }
    componentDidMount()
    {
        var loaddata = async()=>{
            const response = await axios.get('http://localhost:9000/transaction')
            this.setState({response:response.data})
        }
        loaddata()
    }
    render()
    {
        return(
            <Fragment>
                <Typography
                component="h1"
                variant="h3"
                color="inherit"
                align="left"
                noWrap
                sx={{ flex: 1 }}
            >
            Transaction Details
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                   <TableHead>
                    <StyledTableRow>
                    <StyledTableCell>Date/Time</StyledTableCell>
                    <StyledTableCell >Type</StyledTableCell>
                    <StyledTableCell >Fuel</StyledTableCell>
                    <StyledTableCell >Aircraft</StyledTableCell>
                    </StyledTableRow>
                   </TableHead>
                   <TableBody>
                    {
                    this.state.response.sort(function(a:any,b:any){
                        var date1:any = moment(a.Duration.date).format('YYYYMMDD')
                        var date2:any = moment(b.Duration.date).format('YYYYMMDD')
                        var time1:any = moment(a.Duration.date).format('HH')
                        var time2:any = moment(b.Duration.date).format('HH')
                        if(date1===date2)
                        {
                            return time2-time1
                        }
                        return date2-date1
                     }).map(function(value:typeProvider,index:number){
                        return(
                            <StyledTableRow
                              key={index}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <StyledTableCell component="th" scope="row">
                              {moment(value.Duration.date).format('DD/MM/YYYY')} {moment(value.Duration.date).format('HH:mm:ss')}
                              </StyledTableCell>
                              <StyledTableCell >{value.Type}</StyledTableCell>
                              <StyledTableCell >{value.quantity}</StyledTableCell>
                              <StyledTableCell >{value.aircraft&&value.aircraft.aircraft_no}</StyledTableCell>
                            </StyledTableRow>
                            )
                    })
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            </Fragment>
        )
    }
}
export default DisplayTransaction