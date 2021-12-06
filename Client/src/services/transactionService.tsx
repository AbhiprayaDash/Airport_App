import axios from 'axios'
import {errormsg, successmsg} from "./toastservice"
type stateTypes= {
    type:string,
    airport_name:string,
    aircraft_no:Number,
    quantity:Number
}
export const checkFunc = (state:any) =>{
    if(state.airport==="")
        return false;
    if(state.aircraftno==="")
        return false;
    if(state.quantity===0)
        return false;
    return true
}
export const errorhandling=async (reqbody:any)=>{
    try{
        await axios.post('http://localhost:9000/v1/transactions',reqbody)
        successmsg("Transaction Added Successfully")
    }
    catch(e:any){
        const message=e.response.data
        errormsg(message)
    }
}
export async function PostTransactionService(state:stateTypes):Promise<any>{
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