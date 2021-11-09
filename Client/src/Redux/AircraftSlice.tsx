import { createSlice } from '@reduxjs/toolkit'

interface AircraftState {
    response:Array<any>
}
const initialState:AircraftState={
    response:[]
}
export const AircraftSlice = createSlice({
    name: 'Aircraft',
    initialState,
    reducers: {
      saveAircrafts:(state,action)=>{
          state.response=action.payload;
      },
    }
})

// Action creators are generated for each case reducer function
export const { saveAircrafts} = AircraftSlice.actions

export default AircraftSlice.reducer
