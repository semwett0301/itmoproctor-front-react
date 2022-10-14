import axios, { AxiosInstance } from 'axios'
import axiosConfig from '../../../config/axiosСonfig'
import errors from './errors'
import { AppDispatch } from '../../../store'
import {
  isLoadedActionCreator,
  isLoadingActionCreator
} from '../../../store/reducers/isLoading/isLoadingActionCreators'

export default function (dispatch: AppDispatch): AxiosInstance {
  const mainInstance = axios.create({
    baseURL: axiosConfig.baseUrl,
    headers: axiosConfig.baseHeaders,
    withCredentials: axiosConfig.withCredentials
  })

  mainInstance.interceptors.request.use((request) => {
    dispatch(isLoadingActionCreator())
    return request
  })

  mainInstance.interceptors.response.use(
    (response) => {
      dispatch(isLoadedActionCreator())
      return response
    },
    (error) => {
      dispatch(isLoadedActionCreator())
      const status: number = error.response.status
      if (Object.keys(errors).filter((val) => val === status.toString()).length === 1) {
        if (error.response.request.responseURL !== axiosConfig.baseUrl + axiosConfig.authUrl) {
          errors[status](dispatch)
        }
      }
      return Promise.reject(`${status} error`)
    }
  )

  return mainInstance
}
