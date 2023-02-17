import {io, Socket} from 'socket.io-client'
import socketConfig from '../../../config/api/socketConfig'



export const webCallInstance: (beforeConnect?: () => void) => Socket = (beforeConnect) => {
  const instance = io(`${socketConfig.baseUrl}webcall`)

  instance.on('connect', () => {
    beforeConnect && beforeConnect()
  })

  return instance
}
