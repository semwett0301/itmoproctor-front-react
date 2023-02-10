import {Socket} from 'socket.io-client';
import {WebCallSendMessage, WebCallGetMessage} from '../../../config/webCall/webCallConfig';

export type IWebCallSocket = {
  sendMessage(message: WebCallSendMessage): void,
  getMessage(messageCallback: (message: WebCallGetMessage) => void): void,
  disconnect(): void,
}


export function webCall(instance: Socket): IWebCallSocket {
  return {
    sendMessage(message) {
      console.log(message)
      instance.send(JSON.stringify(message))
    },
    getMessage(messageCallback) {
      instance.on('message', messageCallback)
    },
    disconnect() {
      instance.removeListener('message');
      instance.disconnect();
    }
  }
}
