import { IUserApp } from '../../../ts/interfaces/IUserApp'
import { ProviderEnum, RoleEnum } from '../../../config/authСonfig'
import { UserActionTypes } from './userActionTypes'
import { IAction } from '../../../ts/interfaces/IAction'
import { Reducer } from 'redux'

const initialState: IUserApp = {
  active: false,
  address: '',
  attach: [],
  birthday: '',
  citizenship: '',
  created: '',
  description: '',
  documentIssueDate: '',
  documentNumber: '',
  documentType: '',
  email: '',
  expert: false,
  system: false,
  firstname: '',
  gender: '',
  lastname: '',
  middlename: '',
  organization: {
    _id: '',
    code: '',
    fullName: ''
  },
  provider: ProviderEnum.OPENEDU,
  role: RoleEnum.UNAUTHORIZED,
  username: '',
  _id: ''
}

export const userReducer: Reducer<IUserApp> = (
  state: IUserApp = initialState,
  action: IAction<UserActionTypes>
) => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return {
        ...state,
        ...action.payload
      }
    case UserActionTypes.UPDATE_USER:
      return {
        ...state,
        ...action.payload
      }
    case UserActionTypes.DROP_USER:
      return {
        ...state,
        ...initialState
      }
    default:
      return state
  }
}
