import { dropUserActionCreator } from '../../../store/reducers/userReducer/userActionCreators'
import { AppDispatch } from '../../../store'

interface IErrors {
  [key: number]: (dispatch: AppDispatch) => void
}

const errors: IErrors = {
  401: (dispatch) => {
    console.log('A')
    dispatch(dropUserActionCreator())
    window.location.reload()
  }
}

export default errors
