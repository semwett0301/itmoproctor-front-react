import {io, Socket} from 'socket.io-client'
import socketConfig from '../../../config/socketConfig'

export const notifyInstance: Socket = io(socketConfig.baseUrl + 'notify')
