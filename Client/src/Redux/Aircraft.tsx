import { saveAircrafts } from "./AircraftSlice"
import axios from "axios"
export const fetchAircaft =()=> {
    return async (dispatch:any) => {
      try {
          // make an async call in the thunk
          const response = await axios.get('http://localhost:9000/aircraft')
          // dispatch an action when we get the response back
          dispatch(saveAircrafts(response.data))
      } catch (err) {
          console.log(err)
      }
    }
}

export const SortAircraft =()=>{
    return async (dispatch:any,value:any) => {
        var result:any; 
        if(value==="numberasc")
        {
            result = await axios.get('http://localhost:9000/aircraft/sort/aircraft_no?sort=asc')
        }
        else if(value==="numberdesc")
        {
            result = await axios.get('http://localhost:9000/aircraft/sort/aircraft_no?sort=desc')
        }
        else if(value==="airlineasc")
        {
            result = await axios.get('http://localhost:9000/aircraft/sort/airline?sort=asc')
        }
        else if(value==="airlinedesc")
        {
            result = await axios.get('http://localhost:9000/aircraft/sort/airline?sort=desc')
        }
        else if(value==="recent")
        {
            result = await axios.get('http://localhost:9000/aircraft/sort/recent')
        }
        else if(value==="older")
        {
            result = await axios.get('http://localhost:9000/aircraft/sort/older')
        }
        dispatch(saveAircrafts(result.data));
    }
}
export const FilterAircraft =()=>{
    return async (dispatch:any,airline:any) => {
        const result = await axios.post('http://localhost:9000/aircraft/filter/airline',{airline})
        dispatch(saveAircrafts(result.data));
    }
}