import exam, { IExamSocket } from './modules/exam'
import { Socket } from 'socket.io-client'
import { notifyInstance } from './init/notifyInstance'

export interface IRequestSocket {
  exam: IExamSocket
}

export const socket: IRequestSocket = {
  exam: exam(notifyInstance)
}
