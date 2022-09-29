import {IUser} from "../../../ts/interfaces/IUser";
import {UserActionTypes} from "./userActionTypes";

export interface UserAction {
    type: UserActionTypes,
    payload?: object
}

export function setUserActionCreator(payload: IUser) : UserAction{
    return {
        type: UserActionTypes.SET_USER,
        payload: payload
    }
}
