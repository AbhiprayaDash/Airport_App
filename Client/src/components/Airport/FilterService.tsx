import axios from "axios"
export const FilterTransaction = async (reqbody:any,value:string)=>{
    var result:any
        console.log(reqbody)
        if(value==="IN"||value==="OUT")
        {
            result = await axios.post('http://localhost:9000/transaction/filter/',{},{params:{type:reqbody.type,category:"Type"}})
        }
        return result;
}