import axios from "axios"

export const loadAircraftData = async() =>{
        try{
           const response = await axios.get('http://localhost:9000/aircraft')
           return response.data
        }
        catch(e)
        {
           throw new Error(String(e))
        }
}