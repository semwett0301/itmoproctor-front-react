import axios from 'axios'
import axiosConfig from '../../../config/api/axiosСonfig'
import errors from './errors'
import store from '../../../store'
import {isLoadedActionCreator, isLoadingActionCreator} from '../../../store/reducers/isLoading/isLoadingActionCreators'

const mainInstance = axios.create({
  baseURL: axiosConfig.baseUrl,
  headers: axiosConfig.baseHeaders,
  withCredentials: axiosConfig.withCredentials
})

mainInstance.interceptors.request.use((request) => {
  store.dispatch(isLoadingActionCreator())
  return request
})

mainInstance.interceptors.response.use(
  (response) => {
    store.dispatch(isLoadedActionCreator())
    return response
  },
  (error) => {
    store.dispatch(isLoadedActionCreator())
    const status: number = error?.response?.status
    if (Object.keys(errors).filter((val) => val === status?.toString()).length === 1) {
      if (error?.response?.request?.responseURL !== axiosConfig.baseUrl + axiosConfig.authUrl) {
        errors[status]()
      }
    }
    return Promise.reject(`${status} error`)
  }
)

export default mainInstance
