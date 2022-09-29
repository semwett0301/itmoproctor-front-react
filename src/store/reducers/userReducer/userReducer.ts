import {IUser} from "../../../ts/interfaces/IUser";
import {ProviderEnum, RoleEnum} from "../../../config/authСonfig";
import {UserActionTypes} from "./userActionTypes";
import {UserAction} from "./userActionCreators";

const initialState: IUser = {
    active: false,
    address: "",
    attach: [],
    birthday: "",
    citizenship: "",
    created: "",
    description: "",
    documentIssueDate: "",
    documentNumber: "",
    documentType: "",
    email: "",
    expert: false,
    firstname: "",
    gender: "",
    lastname: "",
    middlename: "",
    organization: {
        _id: "",
        code: ""
    },
    provider: ProviderEnum.OPENEDU,
    role: RoleEnum.UNAUTHORIZED,
    username: "",
    _id: ""
}


export const userReducer = (state: IUser = initialState, action: UserAction) => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
