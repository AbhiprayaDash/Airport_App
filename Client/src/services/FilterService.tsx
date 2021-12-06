import axios from "axios"
export const FilterTransaction = async (reqbody:any,value:string)=>{
    var result:any
        const type=reqbody.type
        if(value==="IN"||value==="OUT")
        {
            result = await axios.get(`http://localhost:9000/v1/transactions/filter/${type}/${'Type'}`)
        }
        return result;
}