import {request} from '../api/axios/request'
import {useAppDispatch, useAppSelector} from './reduxHooks'
import {Location, NavigateFunction, useLocation, useNavigate} from 'react-router-dom'
import {AppDispatch} from '../store'
import {dropUserActionCreator, setUserActionCreator} from '../store/reducers/userReducer/userActionCreators'

type LogPass = string | null

export const useLogout: () => () => void = () => {
  const userId: string = useAppSelector((state) => state.user._id)
  const dispatch: AppDispatch = useAppDispatch()
  const navigate: NavigateFunction = useNavigate()
  const location: Location = useLocation()

  return async () => {
    await request.auth.logout(userId)
    dispatch(dropUserActionCreator())
    navigate('/login', { state: { from: location } })
  }
}

export const useLogin: (username: LogPass, password: LogPass) => () => void = (
  username: string | null,
  password: string | null
) => {
  const dispatch: AppDispatch = useAppDispatch()
  const navigateFunction: NavigateFunction = useNavigate()
  const location: Location = useLocation()

  return () => {
    if (username !== null && password !== null) {
      request.auth.login({ username: username, password: password }).then(async (r) => {
        await dispatch(setUserActionCreator(r.data))
        location.state.from?.pathname
          ? navigateFunction(location.state.from.pathname)
          : navigateFunction('/')
      })
    }
  }
}
