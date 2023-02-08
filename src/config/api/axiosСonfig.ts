import {AxiosRequestHeaders} from 'axios'

interface IAxiosConfig {
  baseUrl: string

  authUrl: string
  adminUrl: string
  expertUrl: string
  studentUrl: string
  baseHeaders: AxiosRequestHeaders
  withCredentials: boolean
}

const axiosConfig: IAxiosConfig = {
  baseUrl: 'https://de-dev.itmo.ru/',
  authUrl: 'profile',
  adminUrl: 'admin',
  expertUrl: 'expert',
  studentUrl: 'student',
  baseHeaders: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

export default axiosConfig
