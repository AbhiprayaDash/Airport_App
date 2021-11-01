import axios from "axios"

export const loadAircraftData = async() =>{
        const response = await axios.get('http://localhost:9000/aircraft')
        return response.data
}