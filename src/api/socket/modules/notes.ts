import { SocketCallback } from '../../../ts/types/SocketCallback'
import { INote } from '../../../ts/interfaces/INotes'
import { Socket } from 'socket.io-client'

export interface INotesSocket {
  subscribe: (examId: string, callback: SocketCallback<INote[]>) => void
  unsubscribe: (examId: string) => void
}

export default function (instance: Socket): INotesSocket {
  return {
    subscribe(examId: string, callback) {
      instance.on('notes-' + examId, callback)
    },
    unsubscribe(examId: string) {
      instance.off('notes-' + examId)
    }
  }
}
