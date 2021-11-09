import axios from "axios"
import { saveAirports } from "./AirportSlice"
export const fetchAirport=()=> {
    console.log('the inside thunk function')
    return async (dispatch:any) => {
        console.log('inside')
      try {
          // make an async call in the thunk
          console.log('fetching')
          const response = await axios.get('http://localhost:9000/airport')
          // dispatch an action when we get the response back
          console.log(response)
          dispatch(saveAirports(response.data))
      } catch (err) {
          console.log(err)
      }
    }
}

export const SortAirport =(value:any)=>{
    console.log('the inside thunk sort function')
    return async (dispatch:any) => {
        console.log('inside sort')
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