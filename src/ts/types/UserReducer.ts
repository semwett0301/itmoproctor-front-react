
export interface IUserState{
    name: string;
}

export enum UserActionTypes{
    ACTION = "ACTION"
}

export interface DefaultUserAction{
    type: UserActionTypes.ACTION
}


export type UserAction = DefaultUserAction // | next interface | next interface