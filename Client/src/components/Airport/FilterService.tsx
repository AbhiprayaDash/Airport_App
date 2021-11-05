import axios from "axios"
export const FilterTransaction = async (reqbody:any,value:string)=>{
    var result:any
        if(value==="IN"||value==="OUT")
        {
            console.log('entered into')
            result = await axios.post('http://localhost:9000/transaction/filter/type',reqbody)
        }
        else if(value==="airportname")
        {
            result = await axios.post('http://localhost:9000/transaction/filter/airportname',reqbody)
        }
        else if(value==="aircraftname")
        {
            result = await axios.post('http://localhost:9000/transaction/filter/aircraftname',reqbody)
        }
        return result;
}
export const FilterAirport=async (reqbody:any,value:string)=>{
    var result:any
        if(value==="name")
        {
            result = await axios.post('http://localhost:9000/airport/filter/name',reqbody)
        }
        return result;
}

export const FilterAircraft = async (reqbody:any,value:string)=>{
    var result:any
        if(value==="name")
        {
            result = await axios.post('http://localhost:9000/aircraft/filter/airline',reqbody)
        }
        return result;

}