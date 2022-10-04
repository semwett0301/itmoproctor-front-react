import {IUser} from "../../../ts/interfaces/IUser";
import {UserActionTypes} from "./userActionTypes";
import {IAction} from "../../../ts/interfaces/IAction";


export function setUserActionCreator(payload: IUser) : IAction<UserActionTypes>{
    return {
        type: UserActionTypes.SET_USER,
        payload: payload
    }
}

export function updateUserActionCreator(payload: Partial<IUser>): IAction<UserActionTypes> {
    return {
        type: UserActionTypes.UPDATE_USER,
        payload: payload
    }
}

export function dropUserActionCreator() : IAction<UserActionTypes> {
    return {
        type: UserActionTypes.DROP_USER
    }
}
