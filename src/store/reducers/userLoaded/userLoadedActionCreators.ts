import { IAction } from '../../../ts/interfaces/IAction'
import { UserLoadedActionTypes } from './userLoadedActionTypes'

export function userLoadedActionCreator(): IAction<UserLoadedActionTypes> {
  return {
    type: UserLoadedActionTypes.USER_LOADED
  }
}
