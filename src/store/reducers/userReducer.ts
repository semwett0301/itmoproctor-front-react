import {IUser} from "../../ts/interfaces/IUser";
import {RoleNumbers} from "../../ts/enums/RoleNumbers";

interface UserAction {
    type: UserActionTypes,
    payload?: object
}

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
    provider: "",
    role: RoleNumbers.UNAUTHORIZED,
    username: "",
    _id: ""
}

export enum UserActionTypes {
    SET_USER = "SET_USER"
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

export function setUserActionCreator(payload: IUser) : UserAction{
    return {
        type: UserActionTypes.SET_USER,
        payload: payload
    }
}
