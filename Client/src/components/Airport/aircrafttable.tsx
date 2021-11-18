import React, { FC, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import SortIcon from "@mui/icons-material/ArrowDownward";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchAircaft } from '../../Redux/Aircraft';

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
      name: "Aircraft No",
      selector: "aircraft_no",
      sortable: true,
    },
    {
      name: "Airline",
      selector: "airline",
      sortable: true,
      
    },
  ];
const Aircrafttable:FC =()=>{
    const response:any = useAppSelector((state:any) => state.Aircraft.response);
    const dispatch = useAppDispatch();
    if(response.length===0)
    {
        console.log('aircraft table')
        const loaddata=async()=>{
            const fetchfunc=fetchAircaft()
            await fetchfunc(dispatch)
        } 
        loaddata()
    }
    return(
        <DataTable
        columns={columns}
        data={response}
        defaultSortFieldId={1}
        pagination
        customStyles={customStyles}
        sortIcon={<SortIcon />}
        />
    )
}
export default Aircrafttable