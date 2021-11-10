import axios from "axios"
import { saveAirports } from "./AirportSlice"
export const fetchAirport=()=> {
    return async (dispatch:any) => {
      try {
          // make an async call in the thunk
          const response = await axios.get('http://localhost:9000/airport')
          // dispatch an action when we get the response back
          console.log(response.data)
          dispatch(saveAirports(response.data))
      } catch (err) {
          console.log(err)
      }
    }
}

export const SortAirport =(value:any)=>{
    return async (dispatch:any) => {
        var result:any; 
        if(value==="nameasc")
        {
            result = await axios.get('http://localhost:9000/airport/sort/name?sort=asc')
        }
        else if(value==="namedesc")
        {
            result = await axios.get('http://localhost:9000/airport/sort/name?sort=desc')
        }
        else if(value==="fuelavailableasc")
        {
            result = await axios.get('http://localhost:9000/airport/sort/fuelavailable?sort=asc')
        }
        else if(value==="fuelavailabledesc")
        {
            result = await axios.get('http://localhost:9000/airport/sort/fuelavailable?sort=desc')
        }
        else if(value==="fuelcapacityasc")
        {
            result = await axios.get('http://localhost:9000/airport/sort/fuelcapacity?sort=asc')
        }
        else if(value==="fuelcapacitydesc")
        {
            result = await axios.get('http://localhost:9000/airport/sort/fuelcapacity?sort=desc')
        }
        else if(value==="recent")
        {
            result = await axios.get('http://localhost:9000/airport/sort/recent')
        }
        else if(value==="older")
        {
            result = await axios.get('http://localhost:9000/airport/sort/older')
        }
        dispatch(saveAirports(result.data));
    }
}