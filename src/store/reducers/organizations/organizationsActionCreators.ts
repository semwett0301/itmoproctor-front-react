import {OrganizationsActionTypes} from './organizationsActionTypes'
import {IActionOrganizations} from './organizationsReducer'
import {IOrganization, IOrganizations} from '../../../ts/interfaces/IOrganizations'

export function addOrganizationActionCreator(payload: IOrganization): IActionOrganizations {
  return {
    type: OrganizationsActionTypes.ADD_ORGANIZATION,
    currentOrganization: {
      id: payload._id,
      organization: payload
    }
  }
}

export function changeOrganizationActionCreator(payload: IOrganization): IActionOrganizations {
  return {
    type: OrganizationsActionTypes.CHANGE_ORGANIZATION,
    currentOrganization: {
      id: payload._id,
      organization: payload
    }
  }
}


export function deleteOrganizationActionCreator(payload: IOrganization): IActionOrganizations {
  return {
    type: OrganizationsActionTypes.DELETE_ORGANIZATION,
    deletedId: payload._id
  }
}

export function setOrganizationsActionCreator(payload: IOrganizations): IActionOrganizations {
  return {
    type: OrganizationsActionTypes.SET_ORGANIZATIONS,
    payload: payload
  }
}
