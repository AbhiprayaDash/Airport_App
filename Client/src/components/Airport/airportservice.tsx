import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const airporterrormsg=(msg:string)=>{
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
      theme: "colored"
    });
  }
const inputerrormsg=()=>{
    toast.error("Fuel quantity should not be greater than 100000", {
      position: toast.POSITION.TOP_CENTER,
      theme: "colored"
    });
  }
const errormsg=()=>{
  {
      toast.error("Capacity should be greater than available", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored"
      });
  }
}
export async function postAircraftData(reqbody:any):Promise<any>{
    try{
        if(Number(reqbody.fuelavailable)>Number(reqbody.fuelcapacity))
        {
            throw "error";
        }
        const response = await axios.post('http://localhost:9000/airport',reqbody)
        if(response.data==="Number exeeded")
        {   
            throw "inputerror"
        }
        if(response.data==="Airport Exists")
        {
            throw "exists"
        }
    }
    catch(e){
        if(e==="error")
        {
            errormsg()
        }
        else if(e==="inputerror"){
            inputerrormsg()
        }
        else if(e==="exists")
        {
            airporterrormsg("Airport Already Exists")
        }
    }
}