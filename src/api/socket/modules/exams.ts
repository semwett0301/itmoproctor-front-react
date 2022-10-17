import { Socket } from 'socket.io-client'
import { IExam } from '../../../ts/interfaces/IExams'
import { SocketCallback } from '../../../ts/types/SocketCallback'

export interface IExamsSocket {
  subscribe: (callback: SocketCallback<IExam>) => void
  unsubscribe: () => void
}

export default function (instance: Socket): IExamsSocket {
  return {
    subscribe(callback) {
      instance.on('exam', callback)
    },
    unsubscribe() {
      instance.off('exam')
    }
  }
}
