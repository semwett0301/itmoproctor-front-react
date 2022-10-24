import { combineReducers } from 'redux'
import { userReducer } from './userReducer/userReducer'
import { userLoadedReducer } from './userLoaded/userLoadedReducer'
import { isLoadingReducer } from './isLoading/isLoadingReducer'
import { organizationsReducer } from './organizationsReducer/organizationsReducer'

export const combineReducer = combineReducers({
  user: userReducer,
  userLoaded: userLoadedReducer,
  isLoading: isLoadingReducer,
  organizations: organizationsReducer
})
