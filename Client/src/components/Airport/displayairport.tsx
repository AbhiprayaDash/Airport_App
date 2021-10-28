import React, { Fragment } from "react"
import axios from 'axios'
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import {StyledTableCell,StyledTableRow} from './tablestyle'

interface typeProvider{
    name:string,
    fuelcapacity:number,
    fuelavailable:number
}
type statetypes={
    response:any
}
type proptypes={
    
}
class DisplayAirports extends React.Component<proptypes,statetypes>{

    constructor(props:proptypes){
        super(props)
        this.state={
            response:[]
        }
    }
    componentDidMount()
    {
        var loaddata = async()=>{
            const response = await axios.get('http://localhost:9000/airport')
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
                fontFamily="Roboto"
                noWrap
                sx={{ flex: 1 }}
            >
            Aiport Details
            </Typography>
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
                    this.state.response.sort(function(a:any,b:any){
                        return a.name.localeCompare(b.name);
                     }).map(function(value:typeProvider,index:number){
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
        </Fragment>
        )
    }
}
export default DisplayAirports
