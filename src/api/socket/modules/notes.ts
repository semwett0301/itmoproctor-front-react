import { SocketCallback } from '../../../ts/types/SocketCallback'
import { IExamRow } from '../../../ts/interfaces/IExams'
import { INote } from '../../../ts/interfaces/INotes'
import { Socket } from 'socket.io-client'
import { IExamsSocket } from './exams'

export interface INotesSocket {
  subscribe: (examId: string, callback: SocketCallback<INote[]>) => void
  unsubscribe: () => void
}

export default function (instance: Socket): INotesSocket {
  return {
    subscribe(examId: string, callback) {
      instance.on('notes-' + examId, callback)
    },
    unsubscribe() {
      instance.off('notes-')
    }
  }
}
