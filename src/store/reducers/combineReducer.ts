import {combineReducers} from "redux";
import {userReducer} from "./userReducer/userReducer";
import {userLoadedReducer} from "./userLoaded/userLoadedReducer";


export const combineReducer = combineReducers({
    user: userReducer,
    userLoaded: userLoadedReducer
})
