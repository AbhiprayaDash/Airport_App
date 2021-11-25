import { createSlice } from '@reduxjs/toolkit'

interface AircraftState {
    response:Array<any>,
    AirportList:Array<any>,
    name:string,
    FilterAirportList:Array<any>
}
const initialState:AircraftState={
    response:[],
    AirportList:[],
    name:'',
    FilterAirportList:[]
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
      },
      saveFilterAirportList:(state,action)=>{
        state.FilterAirportList=action.payload
    }

    }
})

// Action creators are generated for each case reducer function
export const { saveAirports,saveAirportList,saveAirportName,saveFilterAirportList} = AirportSlice.actions

export default AirportSlice.reducer
