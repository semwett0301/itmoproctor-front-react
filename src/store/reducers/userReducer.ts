import {IUserState, UserAction} from "../../ts/types/UserReducer";

const initialState:IUserState = {
    name: ""
}

export const userReducer = (state = initialState, action:UserAction) => {
    switch(action){
        default:
            return state
    }
}