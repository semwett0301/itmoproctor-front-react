import {IAction} from "../../../ts/interfaces/IAction";
import {UserLoadedActionTypes} from "./userLoadedActionTypes";

export const userLoadedReducer = (state = false, action: IAction<UserLoadedActionTypes>) => {
    switch (action.type) {
        case UserLoadedActionTypes.USER_LOADED:
            return true;
        default:
            return state
    }
}
