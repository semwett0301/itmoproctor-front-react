import {Socket} from 'socket.io-client';

export function webCall(instance: Socket): {
  sendMessage(message: string): void,
  getMessage(messageCallback: (message: string) => void): void,
  disconnect(): void,

} {
  return {
    sendMessage(message) {
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
