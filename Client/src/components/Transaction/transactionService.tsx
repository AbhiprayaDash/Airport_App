import axios from 'axios'
import {errormsg, successmsg} from "../Toast/toastservice"
type stateTypes= {
    type:string,
    airport_name:string,
    aircraft_no:Number,
    quantity:Number
}
export const errorhandling=async (reqbody:any)=>{
    console.log('entered')
    try{
        console.log(reqbody)
        await axios.post('http://localhost:9000/transaction',reqbody)
        successmsg("Transaction Added Successfully")
    }
    catch(e:any){
        const message=e.response.data
        errormsg(message)
    }
}
export async function PostTransactionService(state:stateTypes):Promise<any>{
    console.log('hit')
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