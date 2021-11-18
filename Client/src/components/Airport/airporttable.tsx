import  { Fragment,FC } from 'react'
import DataTable from "react-data-table-component";
import SortIcon from "@mui/icons-material/ArrowDownward";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchAirport } from "../../Redux/Airport";
const caseInsensitiveSort = (rowA:any, rowB:any) => {
    const a = rowA.name.toLowerCase().split(' ')[0];
    const b = rowB.name.toLowerCase().split(' ')[0];
    return a.localeCompare(b);
};
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
      name: "Airport Name",
      selector: "name",
      sortable: true,
      sortFunction: caseInsensitiveSort
    },
    {
      name: "Fuel Available",
      selector: "fuelavailable",
      sortable: true,
      
    },
];
type propTypes={
    response:any
}
const Airporttable:FC<propTypes>= (props:propTypes)=>{
    var response:any = props.response
    const dispatch = useAppDispatch();
    return(
            <Fragment>
                <DataTable
                columns={columns}
                data={response}
                defaultSortFieldId={1}
                pagination
                customStyles={customStyles}
                sortIcon={<SortIcon />}
                />
            </Fragment>
        )
}
export default Airporttable