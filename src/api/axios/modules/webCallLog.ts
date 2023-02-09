import {AxiosInstance, AxiosResponse} from 'axios'
import axiosConfig from '../../../config/api/axiosСonfig';

export default function (instance: AxiosInstance) {
  const url = 'log/webcallEvent'

  return {
    connect(userId: string) {
      return instance.post(`${axiosConfig.baseUrl}${url}`, {
        data: `connect_${userId}`
      })
    },
    disconnect(userId: string) {
      return instance.post(`${axiosConfig.baseUrl}${url}`, {
        data: `disconnect_${userId}`
      })
    },
    connectError(userId: string) {
      return instance.post(`${axiosConfig.baseUrl}${url}`, {
        data: `connect_error_${userId}`
      })
    },

  }
}
