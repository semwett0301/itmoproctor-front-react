import {io, Socket} from 'socket.io-client'
import socketConfig from '../../../config/api/socketConfig'

export type WebCallInstanceParams = {
  userId: string
  beforeConnect?: () => void
}

export const webCallInstance: (params: WebCallInstanceParams) => Socket = ({beforeConnect, userId}) => {
  const instance = io(socketConfig.baseUrl + 'webcall')

  instance.on('connect', () => {
    beforeConnect && beforeConnect()
  })

  return instance
}
