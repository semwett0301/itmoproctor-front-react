import { Socket } from 'socket.io-client'
import { IExam } from '../../../ts/interfaces/IExams'
import { SocketCallback } from '../../../ts/types/SocketCallback'

export interface IExamSocket {
  examChange: (callback: SocketCallback<IExam>) => void
  examOpen: (userId: string, callback: SocketCallback<string>) => void
}

export default function (instance: Socket): IExamSocket {
  return {
    examChange(callback) {
      instance.on('exam', callback)
    },
    examOpen(userId, callback) {
      instance.on('exam' + userId, callback)
    }
  }
}
