import axios from "axios"


export const getaircraftdata= async ()=>{
    const res = await axios.get('http://localhost:9000/aircraft')
    return res;
}