import { dropUserActionCreator } from '../../../store/reducers/userReducer/userActionCreators'
import store, { AppDispatch } from '../../../store'

interface IErrors {
  [key: number]: () => void
}

const errors: IErrors = {
  401: () => {
    console.log('A')
    store.dispatch(dropUserActionCreator())
  }
}

export default errors
