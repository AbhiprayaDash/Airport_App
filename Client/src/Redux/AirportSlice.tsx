import { createSlice } from '@reduxjs/toolkit'

interface AircraftState {
    response:Array<any>,
    AirportList:Array<any>,
    name:string
}
const initialState:AircraftState={
    response:[],
    AirportList:[],
    name:''
}
export const AirportSlice = createSlice({
    name: 'Airport',
    initialState,
    reducers: {
      saveAirports:(state,action)=>{
          state.response=action.payload;
      },
      saveAirportList:(state,action)=>{
          state.AirportList=action.payload
      },
      saveAirportName:(state,action)=>{
          state.name=action.payload
      }

    }
})

// Action creators are generated for each case reducer function
export const { saveAirports,saveAirportList,saveAirportName} = AirportSlice.actions

export default AirportSlice.reducer
