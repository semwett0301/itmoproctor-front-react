import {IUser} from "../../../ts/interfaces/IUser";
import {UserActionTypes} from "./userActionTypes";
import {UserAction} from "./userReducer";

export function setUserActionCreator(payload: IUser) : UserAction{
    return {
        type: UserActionTypes.SET_USER,
        payload: payload
    }
}
