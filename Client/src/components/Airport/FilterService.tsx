import axios from "axios"
export const FilterTransaction = async (reqbody:any,value:string)=>{
    var result:any
        console.log(reqbody)
        const type=reqbody.type
        if(value==="IN"||value==="OUT")
        {
            result = await axios.get(`http://localhost:9000/transactions/filter/${type}/${'Type'}`)
        }
        return result;
}