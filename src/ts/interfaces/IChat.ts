import { IAttach, IPostAttach } from './IVerify'
import { INote, IShortUser } from './INotes'

export interface IChatMessage extends INote {
  _id: string
  exam: string
  author: IShortUser
  time: string
  text: string
  attach: IAttach[] | []
}

export interface IPostChatMessage {
  author: IShortUser
  text: string
  attach: IPostAttach[]
}
