import { AxiosRequestHeaders } from 'axios'

interface IAxiosConfig {
  baseUrl: string
  baseHeaders: AxiosRequestHeaders
  withCredentials: boolean
}

const axiosConfig: IAxiosConfig = {
  baseUrl: 'https://de-dev.itmo.ru/',
  baseHeaders: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

export default axiosConfig
