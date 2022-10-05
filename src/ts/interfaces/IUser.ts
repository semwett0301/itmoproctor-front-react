import {ProviderEnum, RoleEnum} from "../../config/authСonfig";


export interface IUser {
    birthday: string,
    email: string,
    firstname: string,
    middlename: string,
    lastname: string,
    username: string,
    citizenship: string,
    documentIssueDate: string,
    documentNumber: string,
    documentType: string,
    description: string,
    active: boolean,
    address: string,
    attach?: any,
    created: string,
    expert?: boolean,
    system?: boolean,
    gender: string,
    organization: {
        _id: string,
        fullName?: string,
        shortName?: string,
        code: string
    },
    provider: ProviderEnum,
    role: RoleEnum,
    _id: string,
    __v?: number,
}
