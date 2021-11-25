import React, { FC, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import SortIcon from "@mui/icons-material/ArrowDownward";
import { useAppDispatch} from '../../hooks';
import { fetchAircaft } from '../../Redux/Aircraft';

const customStyles = {
    rows: {
        style: {
            minHeight: '52px', 
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', 
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
type propTypes={
    response:any
}
const Aircrafttable:FC<propTypes> =(props:propTypes)=>{
    const response:any = props.response;
    const dispatch = useAppDispatch();
    const loaddata=async()=>{
        if(response.length===0)
        {
            try{
                const fetchfunc=fetchAircaft()
                await fetchfunc(dispatch)
            }
            catch(e:any)
            {
                console.log(e)
            }
        }
    }
    useEffect(() => {
        loaddata()
    }, []);
    return(
        <DataTable
        columns={columns}
        data={response}
        defaultSortFieldId={-1}
        pagination
        customStyles={customStyles}
        sortIcon={<SortIcon />}
        />
    )
}
export default Aircrafttable