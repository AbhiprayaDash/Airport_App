import axios from "axios"
import { saveAirports,saveAirportList,saveFilterAirportList} from "./AirportSlice"
export const fetchAirport=()=> {
    return async (dispatch:any) => {
      try {
          // make an async call in the thunk
          var AccessToken:string=localStorage.getItem('user')|| 'null'
          const token = JSON.parse(AccessToken);
          const response = await axios.get('http://localhost:9000/v1/airports',{ headers: {"x-auth-token" : `${token}`} })
          // dispatch an action when we get the response back
          dispatch(saveAirports(response.data))
          dispatch(saveFilterAirportList(''))
      } catch (err) {
          console.log(err)
      }
    }
}

export const SortAirport =()=>{
    return async (dispatch:any,value:any) => {
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
export const FilterAirport =()=>{
    return async (dispatch:any,name:any) => {
        const result = await axios.get(`http://localhost:9000/v1/airports/filter/${name}/${'name'}`)
        dispatch(saveFilterAirportList(result.data));
    }
}

export const FetchAirportList = () =>{
    return async (dispatch:any)=>{
        const result:any = await axios.get('http://localhost:9000/v1/airportlist/')
        dispatch(saveAirportList(result.data[0].airportList))
    }
}