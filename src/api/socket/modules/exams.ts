import {Socket} from 'socket.io-client'
import {SocketCallback} from '../../../ts/types/SocketCallback'
import {IExamRow} from '../../../ts/interfaces/IExams'

export interface IExamsSocket {
  subscribe: (callback: SocketCallback<IExamRow>) => void
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
