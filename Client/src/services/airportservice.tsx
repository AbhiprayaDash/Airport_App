import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { fetchAirport, FetchAirportList } from "../Redux/Airport";
import { saveAirportName } from "../Redux/AirportSlice";
import { errormsg, successmsg } from "./toastservice";

export const checkInput = (state:any) =>{
        if(state.fuelavailable<0||state.fuelcapacity<0)
            return false
        if(state.name===""||String(state.fuelavailable)===""||state.fuelcapacity===0)
        {
            return false
        }
        if(state.fuelcapacity<state.fuelavailable)
            return false
        if(state.fuelcapacity<1000)
        {
            return false
        }
        if(state.fuelcapacity>100000)
        {
            return false;
        }
        return true;
}
export async function postAirportData(reqbody:any,state:any,Airports:any,index:number):Promise<any>{
    try{
        if(state.fuelavailable<0||state.fuelcapacity<0)
            return errormsg('Fuel cannot be negative')
        if(reqbody.name===""||String(reqbody.fuelavailable)===""||reqbody.fuelcapacity===0)
        {
            return errormsg("Input is required")
        }
        if(state.fuelcapacity<1000)
        {
            return errormsg("Fuel Capacity cannot be less than 1000")
        }
        reqbody.fuelcapacity=Number(reqbody.fuelcapacity)
        if(Number(reqbody.fuelavailable)>Number(reqbody.fuelcapacity))
        {
            return errormsg("Capacity should be greater than available")
        }
        await axios.post('http://localhost:9000/v1/airports',reqbody)
        const request:any=
        {
            indexvalue:index
        }
        await axios.delete('http://localhost:9000/v1/airportlist', { data: request, headers: { "Authorization": "***" } });
        successmsg("Airport Added Successfully")
    }
    catch(e:any){
        return errormsg(e.response.data)
    }
}
export const airportformhandler = async (reqbody:any,state:any,AirportList:any,index:any,dispatch:any) =>{
    try{
        await postAirportData(reqbody,state,AirportList,index)
        const fetchfunc = FetchAirportList()
        await fetchfunc(dispatch)
        dispatch(saveAirportName(''))
        const fetchAirports=fetchAirport()
        await fetchAirports(dispatch)
    }
    catch(e:any)
    {
        console.log(e);
    }
}