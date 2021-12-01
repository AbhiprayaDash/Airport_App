import {FC} from 'react'
import DataTable from 'react-data-table-component';
import SortIcon from "@mui/icons-material/ArrowDownward";

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
            fontSize:'22px'
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
    return(
        <div className="table-responsive">
            <DataTable
            columns={columns}
            data={response}
            defaultSortFieldId={-1}
            pagination
            customStyles={customStyles}
            sortIcon={<SortIcon />}
            />           
        </div>
    )
}
export default Aircrafttable