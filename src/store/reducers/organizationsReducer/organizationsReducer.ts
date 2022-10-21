import { IAction } from '../../../ts/interfaces/IAction'
import { OrganizationsActionTypes } from './organizationsActionTypes'
import { Reducer } from 'redux'
import { IOrganization, IOrganizations } from '../../../ts/interfaces/IOrganizations'

export interface IActionOrganizations extends IAction<OrganizationsActionTypes, IOrganizations> {
  newOrganization?: {
    id: string
    organization: IOrganization
  }
}
export const organizationsReducer: Reducer<IOrganizations> = (
  state = {},
  action: IActionOrganizations
): IOrganizations => {
  switch (action.type) {
    case OrganizationsActionTypes.ADD_ORGANIZATION:
      if (action.newOrganization) {
        const newId = action.newOrganization?.id
        const newOrganization = action.newOrganization?.organization
        return {
          ...state,
          [newId]: newOrganization
        }
      }
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
