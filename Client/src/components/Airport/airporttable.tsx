import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import {StyledTableCell,StyledTableRow} from './tablestyle'
import React from 'react'

interface typeProvider{
    name:string,
    fuelcapacity:number,
    fuelavailable:number
}
type statetypes={
    response:any
}
type proptypes={
    data:any
}
class Airporttable extends React.Component<proptypes,statetypes>{
    constructor(props:proptypes)
    {
        super(props)
        var responsedata = this.props.data
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
                    <StyledTableCell>Airport Name</StyledTableCell>
                    <StyledTableCell >Fuel Available</StyledTableCell>
                    </StyledTableRow>
                   </TableHead>
                   <TableBody>
                    {
                    this.state.response.map(function(value:typeProvider,index:number){
                        return(
                            <StyledTableRow
                              key={index}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <StyledTableCell component="th" scope="row">
                                {value.name}
                              </StyledTableCell>
                              <StyledTableCell >{value.fuelavailable}</StyledTableCell>
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
export default Airporttable