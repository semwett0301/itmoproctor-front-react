import {Socket} from 'socket.io-client'
import {SocketCallback} from '../../../ts/types/SocketCallback'
import {IResponseArray} from '../../../ts/interfaces/IResponseInterfaces';
import {IExamRow} from '../../../ts/interfaces/IExams';

export interface IExamSocket {
  subscribe: (userId: string, callback: SocketCallback<IResponseArray<IExamRow>>) => void
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
