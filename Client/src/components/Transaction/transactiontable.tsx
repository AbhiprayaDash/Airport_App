import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import moment from 'moment'
import {StyledTableCell,StyledTableRow} from '../Airport/tablestyle';

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

type propTypes={
    data:any
}

type stateTypes={
    response:any
}

class TransactionTable extends React.Component<propTypes,stateTypes>
{
    constructor(props:propTypes)
    {
        super(props)
        var responsedata=this.props.data
        this.state={
            response:responsedata
        }
    }
    componentDidUpdate()
    {
        if(this.state.response!==this.props.data)
        {
            this.setState({response:this.props.data})
        }
    }
    render(){
        return(
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
                    this.state.response
                    .map(function(value:typeProvider,index:number){
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
       )
    }
}
export default TransactionTable