import { configureStore} from '@reduxjs/toolkit'
import AircraftReducer from './Redux/AircraftSlice'
import AirportReducer from './Redux/AirportSlice'
import TransactionReducer from './Redux/TransactionSlice';
export const store= configureStore({
  reducer:{
    Aircraft:AircraftReducer,
    Airport:AirportReducer,
    Transaction:TransactionReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch