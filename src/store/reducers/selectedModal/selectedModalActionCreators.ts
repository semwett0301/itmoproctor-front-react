import {IAction} from '../../../ts/interfaces/IAction'
import {SelectedModalActionTypes} from './selectedModalActionTypes';

export function setComponentActionCreator(component: JSX.Element): IAction<SelectedModalActionTypes> {
  return {
    type: SelectedModalActionTypes.SET_COMPONENT,
    payload: component
  }
}

export function setInvisibleActionCreator(): IAction<SelectedModalActionTypes> {
  return {
    type: SelectedModalActionTypes.SET_INVISIBLE,
  }
}

export function setVisibleActionCreator(): IAction<SelectedModalActionTypes> {
  return {
    type: SelectedModalActionTypes.SET_VISIBLE,
  }
}


