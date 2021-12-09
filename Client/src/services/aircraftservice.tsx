import axios from "axios";
import { fetchAircaft, FetchAircraftList } from "../Redux/Aircraft";
import { saveAircraftNo } from "../Redux/AircraftSlice";
import { successmsg } from "./toastservice";

export const checkFunc = (state:any) =>{
    if(state.number===0)
        return false;
    if(state.airline==="")
        return false;
    return true;
}
export const aircraftformhandler = async (AircraftList:any,reqbody:any,dispatch:any) =>{
    await axios.post('http://localhost:9000/v1/aircrafts',reqbody)
    var indexvalue = AircraftList.indexOf(Number(reqbody.aircraft_no))
    await axios.delete('http://localhost:9000/v1/aircraftlist', { data: {indexvalue}, headers: { "Authorization": "***" } });
    successmsg("Aircraft Added Successfully")
    const fetchfunc = FetchAircraftList()
    fetchfunc(dispatch)
    dispatch(saveAircraftNo(0))
    const fetchAircraft = fetchAircaft()
    fetchAircraft(dispatch)
}