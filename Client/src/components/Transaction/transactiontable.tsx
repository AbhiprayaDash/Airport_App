import  { FC, useEffect, useState } from 'react'
import DataTable,{ createTheme } from 'react-data-table-component';
import SortIcon from "@mui/icons-material/ArrowDownward";
import moment from 'moment';

type propTypes={
    data:any
}
const customStyles = {
    rows: {
        style: {
            minHeight: '52px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            fontSize:'20px'
        },
    },
    cells: {
        style: {
            fontSize:'15px'
        },
    },
};
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
createTheme('solarized', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');
  
const TransactionTable:FC<propTypes> =(props:propTypes)=>
{
        var responsedata=props.data
        const [filteredRes,setfilteredRes]=useState<Array<any>>([])
        var filterResponse = [...responsedata]
        var filteredResponse = filterResponse.map((response:any)=>{
            let res:any = Object.assign({}, response);
            let DurationObj={
                date:moment(res.Duration.date).format("dddd, MMMM Do YYYY, h:mm:ss a")
            }
            res.Duration=DurationObj
            res.aircraft=res.hasOwnProperty('aircraft')?res.aircraft.aircraft_no:'No Aircraft'
            return res
        })
        useEffect(() => {
            setfilteredRes(filteredResponse)
        }, [responsedata]);
        useEffect(() => {
            setfilteredRes(filteredResponse)
        }, []);
    return(
        <DataTable
        columns={columns}
        data={filteredRes}
        defaultSortFieldId={1}
        pagination
        customStyles={customStyles}
        sortIcon={<SortIcon />}
        />
    )
}
export default TransactionTable