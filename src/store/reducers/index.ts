import {combineReducers} from "redux";
import {userReducer} from "./userReducer";

export const combineReducer = combineReducers({
    user: userReducer
})

export type CombineReducer = ReturnType<typeof combineReducer>