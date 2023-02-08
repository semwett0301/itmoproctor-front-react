import {IUserApp, IUserBackend} from '../../../ts/interfaces/IUserApp'
import {UserActionTypes} from './userActionTypes'
import {IAction} from '../../../ts/interfaces/IAction';
import {rolesToBackendConfig} from '../../../config/router/authСonfig';

export function setUserActionCreator(payload: IUserBackend | IUserApp): IAction<UserActionTypes> {
  const user = payload

  if (typeof user.role === 'number') {
    if (!rolesToBackendConfig[user.role]) throw new TypeError('Нет соотвествия для полученной роли (цифры)')

    user.role = rolesToBackendConfig[user.role]
  }

  return {
    type: UserActionTypes.SET_USER,
    payload: payload
  }
}

export function updateUserActionCreator(payload: Partial<IUserApp>): IAction<UserActionTypes> {
  return {
    type: UserActionTypes.UPDATE_USER,
    payload: payload
  }
}

export function dropUserActionCreator(): IAction<UserActionTypes> {
  return {
    type: UserActionTypes.DROP_USER
  }
}
