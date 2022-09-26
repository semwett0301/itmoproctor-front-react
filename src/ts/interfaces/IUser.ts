export interface IUser{
    active: boolean,
    address: string,
    attach?: any,
    birthday: string,
    citizenship: string,
    created: string,
    description: string,
    documentIssueDate: string,
    documentNumber: string,
    documentType: string,
    email: string,
    expert: boolean,
    system: boolean,
    firstname: string,
    gender: string,
    lastname: string,
    middlename: string,
    organization: {
        _id: string,
        fullName?: string,
        shortName: string,
        code: string
    },
    provider: string,
    role: number,
    username: string,
    _id: string,
    __v: number
}