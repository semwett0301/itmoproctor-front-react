import { OrganizationsActionTypes } from './organizationsActionTypes'
import { IActionOrganizations } from './organizationsReducer'
import { IOrganization, IOrganizations } from '../../../ts/interfaces/IOrganizations'

export function addOrganizationActionCreator(payload: IOrganization): IActionOrganizations {
  return {
    type: OrganizationsActionTypes.ADD_ORGANIZATION,
    newOrganization: {
      id: payload._id,
      organization: payload
    }
  }
}

export function setOrganizationActionCreator(payload: IOrganizations): IActionOrganizations {
  return {
    type: OrganizationsActionTypes.SET_ORGANIZATIONS,
    payload: payload
  }
}
