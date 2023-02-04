import {dropUserActionCreator} from '../../../store/reducers/userReducer/userActionCreators'
import store from '../../../store'

interface IErrors {
  [key: number]: () => void
}

const errors: IErrors = {
  401: () => {
    store.dispatch(dropUserActionCreator())
  }
}

export default errors
