import { Socket } from 'socket.io-client'
import { SocketCallback } from '../../../ts/types/SocketCallback'
import { IExams } from '../../../ts/interfaces/IExams'

export interface IExamSocket {
  subscribe: (userId: string, callback: SocketCallback<IExams>) => void
  unsubscribe: (userId: string) => void
}

export default function (instance: Socket): IExamSocket {
  return {
    subscribe(userId, callback) {
      instance.on('exam' + userId, callback)
    },
    unsubscribe(userId) {
      instance.off('exam' + userId)
    }
  }
}
