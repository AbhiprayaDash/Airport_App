import { createSlice } from '@reduxjs/toolkit'

interface AircraftState {
    response:Array<any>,
    AircraftList:Array<any>,
    number:Number,
    FilterAircraftList:Array<any>
}
const initialState:AircraftState={
    response:[],
    AircraftList:[],
    number:0,
    FilterAircraftList:[]
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
      },
      saveFilterAircraftList:(state,action)=>{
          state.FilterAircraftList=action.payload
      }
    }
})

// Action creators are generated for each case reducer function
export const { saveAircrafts,saveAircraftList,saveAircraftNo,saveFilterAircraftList} = AircraftSlice.actions

export default AircraftSlice.reducer
