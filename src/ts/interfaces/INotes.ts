import { IAttach, IPostAttach } from './IVerify'

export interface IShortUser {
  _id: string
  lastname: string
  firstname: string
  middlename: string
  role?: number
}

export interface IPostNote {
  text: string
  editable: true
  attach: IPostAttach[]
}

export interface INote {
  _id: string
  exam: string
  author: IShortUser
  text: string
  // ISO Date
  time: string
  attach: IAttach[]
}
