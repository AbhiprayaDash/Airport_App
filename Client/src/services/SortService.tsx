import axios from 'axios'
export const SortAirport =async (value:string)=>{
        var result:any
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
        return result
}
export const SortTransaction = async (value:string) =>{
        var result:any
        if(value==="dateasc")
        {
            result = await axios.get('http://localhost:9000/transaction/sort/date?sort=asc')
        }
        else if(value==="datedesc")
        {
            result = await axios.get('http://localhost:9000/transaction/sort/date?sort=desc')
        }
        else if(value==="quantityasc")
        {
            result = await axios.get('http://localhost:9000/transaction/sort/quantity?sort=asc')
        }
        else if(value==="quantitydesc")
        {
            result = await axios.get('http://localhost:9000/transaction/sort/quantity?sort=desc')
        }
        else if(value==="recent")
        {
            result = await axios.get('http://localhost:9000/transaction/sort/recent')
        }
        else if(value==="older")
        {
            result = await axios.get('http://localhost:9000/transaction/sort/older')
        }
        return result
}