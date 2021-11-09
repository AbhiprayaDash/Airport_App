import { saveAircrafts } from "./AircraftSlice"
import axios from "axios"
export const fetchAircaft =()=> {
    console.log('the inside thunk function')
    return async (dispatch:any) => {
        console.log('inside')
      try {
          // make an async call in the thunk
          console.log('fetching')
          const response = await axios.get('http://localhost:9000/aircraft')
          // dispatch an action when we get the response back
          console.log(response)
          dispatch(saveAircrafts(response.data))
      } catch (err) {
          console.log(err)
      }
    }
}

export const SortAircraft =(value:any)=>{
    console.log('the inside thunk sort function')
    return async (dispatch:any) => {
        console.log('inside sort')
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