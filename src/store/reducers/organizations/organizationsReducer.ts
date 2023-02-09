import {IAction} from '../../../ts/interfaces/IAction'
import {OrganizationsActionTypes} from './organizationsActionTypes'
import {Reducer} from 'redux'
import {IOrganization, IOrganizations} from '../../../ts/interfaces/IOrganizations'

export interface IActionOrganizations extends IAction<OrganizationsActionTypes, IOrganizations> {
  currentOrganization?: {
    id: string
    organization: IOrganization
  },
  deletedId?: string
}

export const organizationsReducer: Reducer<IOrganizations, IActionOrganizations> = (
  state = {},
  action: IActionOrganizations
): IOrganizations => {
  switch (action.type) {
    case OrganizationsActionTypes.ADD_ORGANIZATION:
      if (action.currentOrganization) {
        Reflect.set(state, action.currentOrganization.id, action.currentOrganization.organization)
      }
      return state

    case OrganizationsActionTypes.CHANGE_ORGANIZATION:
      if (action.currentOrganization) state[action.currentOrganization.id] = action.currentOrganization.organization
      return {
        ...state
      }

    case OrganizationsActionTypes.DELETE_ORGANIZATION:
      if (typeof action.deletedId === 'string') Reflect.deleteProperty(state, action.deletedId)
      return state

    case OrganizationsActionTypes.SET_ORGANIZATIONS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
