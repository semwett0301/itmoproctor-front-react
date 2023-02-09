import {io, Socket} from 'socket.io-client'
import socketConfig from '../../../config/api/socketConfig'
import {request} from '../../axios/request';

export type webCallInstanceParams = {
  userId: string
  beforeConnect?: () => void
}

export const webCallInstance: (params: webCallInstanceParams) => Socket = ({beforeConnect, userId}) => {
  const instance = io(socketConfig.baseUrl + 'webcall')

  instance.on('connect', () => {
    beforeConnect && beforeConnect()
    request.webCallLog.connect(userId).catch(e => console.error(e))
  })

  instance.on('connect_error', () => {
    request.webCallLog.connectError(userId).catch(e => console.log(e))
  })

  instance.on('disconnect', () => {
    request.webCallLog.disconnect(userId).catch(e => console.error(e))
  })

  return instance
}
