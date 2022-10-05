import {combineReducers} from "redux";
import {userReducer} from "./userReducer/userReducer";
import {userLoadedReducer} from "./userLoaded/userLoadedReducer";
import {isLoadingReducer} from "./isLoading/isLoadingReducer";


export const combineReducer = combineReducers({
    user: userReducer,
    userLoaded: userLoadedReducer,
    isLoading: isLoadingReducer
})
