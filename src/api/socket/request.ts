import exam, { IExamSocket } from './modules/exam'
import { Socket } from 'socket.io-client'
import { notifyInstance } from './init/notifyInstance'

export interface IRequestSocket {
  exam: IExamSocket
}

export function request(): IRequestSocket {
  const notify: Socket = notifyInstance()

  return {
    exam: exam(notify)
  }
}
