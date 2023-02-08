import {AppDispatch} from '../../store';
import {Location, NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import {request} from '../../api/axios/request';
import {dropUserActionCreator} from '../../store/reducers/userReducer/userActionCreators';
import {useAppDispatch} from '../store/useAppDispatch';
import {useAppSelector} from '../store/useAppSelector';

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
