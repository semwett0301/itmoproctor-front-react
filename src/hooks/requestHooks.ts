import { IRequestAxios, request } from '../api/axios/request'
import { useAppDispatch } from './reduxHooks'

export const useRequest: () => IRequestAxios = () => {
  const dispatch = useAppDispatch()

  return request(dispatch)
}
