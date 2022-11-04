import {createStore} from 'redux'
import {combineReducer} from './reducers/combineReducer'

export const store = createStore(combineReducer)

export default store

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
