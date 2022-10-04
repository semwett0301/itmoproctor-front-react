import mainInstance from "./init/mainInstance";
import auth, {IAuthAxios} from "./modules/auth";
import profile, {IProfileAxios} from "./modules/profile";
import {AppDispatch} from "../../store";
import {NavigateFunction} from "react-router-dom";

export interface IRequest {
    auth: IAuthAxios,
    profile: IProfileAxios
}

export function request(dispatch: AppDispatch, navigate: NavigateFunction ): IRequest {
    return {
        auth: auth(mainInstance(dispatch, navigate)),
        profile: profile(mainInstance(dispatch, navigate)),
    }
}

