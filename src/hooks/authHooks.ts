import { IRequest } from '../api/axios/request'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useRequest } from './requestHooks'
import { AppDispatch } from '../store'
import {
  dropUserActionCreator,
  setUserActionCreator
} from '../store/reducers/userReducer/userActionCreators'

export const useLogout: () => () => void = () => {
  const request: IRequest = useRequest()
  const userId: string = useAppSelector((state) => state.user._id)
  const dispatch: AppDispatch = useAppDispatch()
  const navigate: NavigateFunction = useNavigate()

  return async () => {
    await request.auth.logout(userId)
    dispatch(dropUserActionCreator())
    navigate('/login')
  }
}

export const useLogin: (username: string | null, password: string | null) => () => void = (
  username,
  password
) => {
  const request = useRequest()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return () => {
    if (username !== null && password !== null) {
      request.auth.login({ username: username, password: password }).then((r) => {
        dispatch(setUserActionCreator(r.data))
        navigate('/')
      })
    }
  }
}
