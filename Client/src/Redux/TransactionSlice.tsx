import { createSlice } from '@reduxjs/toolkit'

interface TransactionState {
    response:Array<any>,
    filterResponse:Array<any>
}
const initialState:TransactionState={
    response:[],
    filterResponse:[]
}
export const TransactionSlice = createSlice({
    name: 'Transaction',
    initialState,
    reducers: {
      savetransaction:(state,action)=>{
          state.response=action.payload;
      },
      saveFilterTransaction:(state,action)=>{
          state.filterResponse = action.payload
      }
    }
})

// Action creators are generated for each case reducer function
export const { savetransaction,saveFilterTransaction} = TransactionSlice.actions

export default TransactionSlice.reducer
