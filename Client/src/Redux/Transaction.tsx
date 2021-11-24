import axios from "axios" 
import {savetransaction} from './TransactionSlice'
export const FetchTransaction=()=> {
    return async (dispatch:any) => {
      try {
          // make an async call in the thunk
          const response = await axios.get('http://localhost:9000/transactions')
          // dispatch an action when we get the response back
          dispatch(savetransaction(response.data))
      } catch (err) {
          console.log(err)
      }
    }
}

export const SortTransaction =()=>{
    return async (dispatch:any,value:any) => {
        var result:any; 
    try{
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
            console.log('result is ')
            console.log(result.data)
        }
        else if(value==="older")
        {
            result = await axios.get('http://localhost:9000/transaction/sort/older')
        }
        dispatch(savetransaction(result.data));
    }
    catch(e)
    {
        console.log(e)
    }}
}