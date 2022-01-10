import { combineReducers, configureStore, Store } from '@reduxjs/toolkit'
import UserReducer from './reducers/UserReducer'
import AlertsReducer from './reducers/AlertsReducer'

const RootState = combineReducers({
    User:UserReducer,
    Alert:AlertsReducer 
})

const store:Store = configureStore({reducer:RootState})

export type rootState = ReturnType<typeof RootState>

export type AppDispatch = typeof store.dispatch

export default store