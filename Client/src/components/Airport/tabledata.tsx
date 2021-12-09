import moment from "moment";

const caseInsensitiveSort = (rowA:any, rowB:any) => {
    const a = rowA.name.toLowerCase().split(' ')[0];
    const b = rowB.name.toLowerCase().split(' ')[0];
    return a.localeCompare(b);
};
export const Aircraftcolumns:any = [
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
export const Airportcolumns:any =[
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
]
export const Transactioncolumns:any = [
    {
      name: "Date/Time",
      selector: "Duration.date",
      sortMethod: (a:any, b:any)=>{
        const time1:any=moment(a).format("LLL")
        const time2:any=moment(b).format("LLL")
        return  time1-time2 
      },
      sortable:true
    },
    {
      name: "Type",
      selector: "Type",
      sortable:true
      
    },
    {
        name: "Fuel Quantity",
        selector: "quantity",
        sortable:true
        
    },
    {
        name: "Aircraft",
        selector: "aircraft",
        sortable:true
        
    },
];