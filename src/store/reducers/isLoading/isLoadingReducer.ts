import {IAction} from "../../../ts/interfaces/IAction";
import {IsLoadingActionTypes} from "./isLoadingActionTypes";

export const isLoadingReducer = (state = true, action: IAction<IsLoadingActionTypes>) => {
    switch (action.type) {
        case IsLoadingActionTypes.LOADING:
            return true;
        case IsLoadingActionTypes.LOADED:
            return false;
        default:
            return state
    }
}
