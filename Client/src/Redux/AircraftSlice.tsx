import { createSlice } from '@reduxjs/toolkit'

interface AircraftState {
    response:Array<any>,
    AircraftList:Array<any>,
    number:Number
}
const initialState:AircraftState={
    response:[],
    AircraftList:[],
    number:0
}
export const AircraftSlice = createSlice({
    name: 'Aircraft',
    initialState,
    reducers: {
      saveAircrafts:(state,action)=>{
          state.response=action.payload;
      },
      saveAircraftList:(state,action)=>{
          state.AircraftList = action.payload
      },
      saveAircraftNo:(state,action)=>{
          state.number=action.payload
      }
    }
})

// Action creators are generated for each case reducer function
export const { saveAircrafts,saveAircraftList,saveAircraftNo} = AircraftSlice.actions

export default AircraftSlice.reducer
