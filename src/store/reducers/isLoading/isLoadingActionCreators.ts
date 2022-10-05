import {IAction} from "../../../ts/interfaces/IAction";
import {IsLoadingActionTypes} from "./isLoadingActionTypes";

export function isLoadingActionCreator() : IAction<IsLoadingActionTypes>{
    return {
        type: IsLoadingActionTypes.LOADING
    }
}

export function isLoadedActionCreator() : IAction<IsLoadingActionTypes>{
    return {
        type: IsLoadingActionTypes.LOADED
    }
}
