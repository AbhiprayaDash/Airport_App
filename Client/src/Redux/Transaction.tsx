import axios from "axios" 
import {savetransaction} from './TransactionSlice'
export const FetchTransaction=()=> {
    console.log('the inside thunk transaction function')
    return async (dispatch:any) => {
        console.log('inside transaction')
      try {
          // make an async call in the thunk
          console.log('fetching')
          const response = await axios.get('http://localhost:9000/transaction')
          // dispatch an action when we get the response back
          console.log(response)
          dispatch(savetransaction(response.data))
      } catch (err) {
          console.log(err)
      }
    }
}

export const SortTransaction =(value:any)=>{
    console.log('the inside thunk sort transaction function')
    return async (dispatch:any) => {
        console.log('inside sort')
        var result:any; 
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
        dispatch(savetransaction(result.data));
    }
}