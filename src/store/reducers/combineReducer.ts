import {combineReducers} from "redux";
import {userReducer} from "./userReducer/userReducer";


export const combineReducer = combineReducers({
    user: userReducer
})
