import {AppDispatch} from '../../store';
import {Location, NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import {request} from '../../api/axios/request';
import {setUserActionCreator} from '../../store/reducers/userReducer/userActionCreators';
import {useAppDispatch} from '../store/useAppDispatch';

type LogPass = string | null

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
