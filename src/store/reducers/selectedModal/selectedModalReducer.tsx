import {IAction} from '../../../ts/interfaces/IAction'
import {SelectedModalActionTypes} from './selectedModalActionTypes';

interface ISelectedModal {
  visible: boolean,
  component: JSX.Element
}

const initialState: ISelectedModal = {
  visible: false,
  component: <></>
}

export const selectedModalReducer = (
  state: ISelectedModal = initialState,
  action: IAction<SelectedModalActionTypes, JSX.Element>
): ISelectedModal => {
  switch (action.type) {
    case SelectedModalActionTypes.SET_COMPONENT:
      return {
        ...state,
        component: action.payload as JSX.Element
      }
    case SelectedModalActionTypes.SET_VISIBLE:
      return {
        ...state,
        visible: true
      }
    case SelectedModalActionTypes.SET_INVISIBLE:
      return {
        ...state,
        visible: false
      }
    default:
      return state
  }
}
