import { configureStore,applyMiddleware } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import AircraftReducer from './Redux/AircraftSlice'
import AirportReducer from './Redux/AirportSlice'
import TransactionReducer from './Redux/TransactionSlice'
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

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