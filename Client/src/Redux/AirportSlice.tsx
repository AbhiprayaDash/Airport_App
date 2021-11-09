import { createSlice } from '@reduxjs/toolkit'

interface AircraftState {
    response:Array<any>
}
const initialState:AircraftState={
    response:[]
}
export const AirportSlice = createSlice({
    name: 'Airport',
    initialState,
    reducers: {
      saveAirports:(state,action)=>{
          state.response=action.payload;
      },
    }
})

// Action creators are generated for each case reducer function
export const { saveAirports} = AirportSlice.actions

export default AirportSlice.reducer
