import { IAttach } from './IVerify'

interface IShortUser {
  _id: string
  lastname: string
  firstname: string
  middlename: string
}

export interface INote {
  _id: string
  exam: string
  author: IShortUser
  text: string
  // ISO Date
  time: string
  __v: number
  attach: IAttach[]
}