import { Socket } from 'socket.io-client'
import { IExam } from '../../../ts/interfaces/IExams'
import { SocketCallback } from '../../../ts/types/SocketCallback'

export interface IExamSocket {
  subscribe: (userId: string, callback: SocketCallback<IExam>) => void
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
