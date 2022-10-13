import { IRequestSocket, request } from '../api/socket/request'

export const useSocket: () => IRequestSocket = () => {
  return request()
}
