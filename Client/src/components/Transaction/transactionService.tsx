import axios from 'axios'
import {errormsg, successmsg} from "../Toast/toastservice"
type stateTypes= {
    type:string,
    airport_name:string,
    aircraft_no:Number,
    quantity:Number
}
type propTypes={
    history:any
}
export const errorhandling=async (reqbody:any)=>{
    try{
        const result=await axios.post('http://localhost:9000/transaction',reqbody)
        console.log(result)
        if(result.data==="NoAirport")
            throw new Error("AirportError");
        if(result.data==="NoAircraft")
            throw new Error("AircraftError");
        if(result.data==="NoFuel")
            throw new Error("FuelError");
        if(result.data==="NoCapacity")
            throw new Error("CapacityError");
        successmsg("Transaction Added Successfully")
    }
    catch(e:any){
        if(e.message==="AirportError")
            errormsg("No Airport Found")
        if(e.message==="AircraftError")
            errormsg("No Aircraft Found")
        if(e.message==="FuelError")
            errormsg("Fuel Not available")
        if(e.message==="CapacityError")
            errormsg("No Capacity")
    }
}
export async function PostTransactionService(state:stateTypes,props:propTypes):Promise<any>{
    if(state.type==="IN")
    {
        const reqbody = {type:state.type,airport_name:state.airport_name,quantity:state.quantity}
        errorhandling(reqbody)
    }
    else{
        const reqbody = {type:state.type,airport_name:state.airport_name,aircraft_no:state.aircraft_no,quantity:state.quantity}
        errorhandling(reqbody)
    }     
}