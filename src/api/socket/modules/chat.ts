import { SocketCallback } from '../../../ts/types/SocketCallback'
import { INote } from '../../../ts/interfaces/INotes'
import { Socket } from 'socket.io-client'

export interface IChatSocket {
  subscribe: (examId: string, callback: SocketCallback<INote[]>) => void
  unsubscribe: (examId: string) => void
}

export default function (instance: Socket): IChatSocket {
  return {
    subscribe(examId: string, callback) {
      instance.on('chat-' + examId, callback)
    },
    unsubscribe(examId: string) {
      instance.off('chat-' + examId)
    }
  }
}
