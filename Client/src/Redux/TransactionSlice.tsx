import { createSlice } from '@reduxjs/toolkit'

interface TransactionState {
    response:Array<any>
}
const initialState:TransactionState={
    response:[]
}
export const TransactionSlice = createSlice({
    name: 'Transaction',
    initialState,
    reducers: {
      savetransaction:(state,action)=>{
          state.response=action.payload;
      },
    }
})

// Action creators are generated for each case reducer function
export const { savetransaction} = TransactionSlice.actions

export default TransactionSlice.reducer
