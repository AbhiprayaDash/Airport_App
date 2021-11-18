import React from 'react'
import DataTable from 'react-data-table-component';
import SortIcon from "@mui/icons-material/ArrowDownward";

type propTypes={
    data:any
}

type stateTypes={
    response:any
}

const columns:any = [
    {
      name: "Date/Time",
      selector: "Duration.date",
      sortable: true,
    },
    {
      name: "Type",
      selector: "Type",
      sortable: true,
      
    },
    {
        name: "Fuel",
        selector: "quantity",
        sortable: true,
        
      },
      {
        name: "aircraft",
        selector: "aircraft",
        sortable: true,
        
      },
];


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
        <DataTable
        columns={columns}
        data={this.state.response}
        defaultSortFieldId={1}
        pagination
        sortIcon={<SortIcon />}
        />
       )
    }
}
export default TransactionTable