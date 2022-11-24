import { io, Socket } from 'socket.io-client'
import socketConfig from '../../../config/socketConfig'

export const notifyInstance: () => Socket = () => {
  return io(socketConfig.baseUrl + 'notify')
}
