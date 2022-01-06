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
            paddingLeft: '18px', 
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
type propTypes={
    response:any,
    columns:any
}
const TableComponent:FC<propTypes> =(props:propTypes)=>{
    const response:any = props.response;
    const columns:any = props.columns
    return(
        <div className="table-responsive">
        {
            props.response.length>5
            &&
            <DataTable
            columns={columns}
            data={response}
            defaultSortFieldId={-1}
            pagination
            customStyles={customStyles}
            sortIcon={<SortIcon />}
            />           
        }
        {
            props.response.length<=5
            &&
            <DataTable
            columns={columns}
            data={response}
            defaultSortFieldId={-1}
            customStyles={customStyles}
            sortIcon={<SortIcon />}
            />   
        }
            
        </div>
    )
}
export default TableComponent