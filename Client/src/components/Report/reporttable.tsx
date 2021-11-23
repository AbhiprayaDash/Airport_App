import moment from 'moment'
import React,{Fragment} from 'react'

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
    componentDidUpdate()
    {
        if(this.state.response!==this.props.data)
        {
            this.setState({response:this.props.data})
        }
    }
    render(){
        var output="No Aircraft"
        return(
            <Fragment>
            {
            this.state.response.length===0?<h2 style={{marginLeft:'840px',fontWeight:'bold'}}>No data</h2>:
            <table id="example" className="table table-striped table-bordered" style={{width:"100%"}}>
                <thead>
                <tr>
                <th>Date/Time</th>
                <th >Type</th>
                <th>Fuel</th>
                <th>Aircraft</th>
                </tr>
               </thead>
               <tbody>
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
                return(
                    <tr
                        key={moment(val.Duration.date).format('HH:mm:ss')}
                    >
                    <td >
                        {moment(val.Duration.date).format('DD/MM/YYYY')} {moment(val.Duration.date).format('HH:mm:ss')}
                    </td>
                    <td >{val.Type}</td>
                    <td >{val.quantity}</td>
                    <td >{
                        val.hasOwnProperty('aircraft')===true?<p>{val.aircraft.aircraft_no}</p>:<p>{output}</p>
                        }
                    </td>
                    </tr>
                    )
                })
                }
              </tbody>
            </table>
            }
            </Fragment>
        )
    }
}
export default Reporttable