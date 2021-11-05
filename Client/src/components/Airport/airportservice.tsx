import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { errormsg, successmsg } from "../Toast/toastservice";

export async function postAircraftData(reqbody:any):Promise<any>{
    try{
        reqbody.fuelcapacity=Number(reqbody.fuelcapacity)
        console.log(reqbody)
        if(Number(reqbody.fuelavailable)>Number(reqbody.fuelcapacity))
        {
            throw new Error('error');
        }
        const response = await axios.post('http://localhost:9000/airport',reqbody)
        if(response.data==="Number exeeded")
        {   
            throw new Error('inputerror')
        }
        if(response.data==="Airport Exists")
        {
            throw new Error('exists')
        }
        if(response.data==="Input Required")
            throw new Error("InputError")
        successmsg("Airport Added Successfully")
    }
    catch(e:any){

        if(e.message==="error")
        {
            errormsg("Capacity should be greater than available")
        }
        if(e.message==="inputerror"){
            errormsg("Fuel quantity should not be greater than 100000")
        }
        if(e.message==="exists")
        {
            errormsg("Airport Already Exists")
        }
    }
}