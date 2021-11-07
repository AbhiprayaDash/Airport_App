import {StyledTableCell,StyledTableRow} from '../Airport/tablestyle'
import moment from 'moment'
import React,{Fragment} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';

type statetypes={
    response:any,
    sortname:any
}
type proptypes={
    data:any
}
class Reporttable extends React.Component<proptypes,statetypes>{
    constructor(props:proptypes)
    {
        super(props)
        var responsedata= this.props.data
        this.state={
            response:responsedata,
            sortname:'Sort By'
        }
    }
    handlesortname = async (event:any)=>{
        
    }
    componentDidUpdate()
    {
        if(this.state.response!==this.props.data)
        {
            this.setState({response:this.props.data})
        }
    }
    render(){
        var output="Not Aircraft"
        return(
            <Fragment>
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
                })
            .map((val:any)=>{ 
                console.log(val)
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
                        val.hasOwnProperty('aircraft')===true?<p>{val.aircraft.aircraft_no}</p>:<p>{output}</p>
                        }
                    </StyledTableCell>
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
export default Reporttable