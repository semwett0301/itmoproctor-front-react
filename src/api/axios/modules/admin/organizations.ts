import {AxiosInstance, AxiosResponse} from 'axios'
import axiosConfig from '../../../../config/api/axiosСonfig'
import {IOrganizationFull, IOrganizationsResponse} from '../../../../ts/interfaces/IOrganizations'

export interface IOrganizationsAxios {
  getListOfOrganizations: () => Promise<AxiosResponse<IOrganizationsResponse>>
  getFullOrganization: (id: string) => Promise<AxiosResponse<IOrganizationFull>>
  putOrganization: (organization: IOrganizationFull) => Promise<AxiosResponse<IOrganizationFull>>
  postOrganization: (organization: IOrganizationFull) => Promise<AxiosResponse<IOrganizationFull>>
  deleteOrganization: (organizationId: string) => Promise<AxiosResponse<IOrganizationFull>>
}

export default function (instance: AxiosInstance): IOrganizationsAxios {
  return {
    getListOfOrganizations() {
      return instance.get(`${axiosConfig.adminUrl}/organizations`)
    },
    getFullOrganization(id) {
      return instance.get(`${axiosConfig.baseUrl}organization/${id}`)
    },
    putOrganization(organization) {
      return instance.put(`${axiosConfig.baseUrl}organization/${organization._id}`, {
        organization
      })
    },
    postOrganization(organization) {
      return instance.post(`${axiosConfig.baseUrl}organization`, organization)
    },
    deleteOrganization(organizationId) {
      return instance.delete(`${axiosConfig.baseUrl}organization/${organizationId}`)
    }
  }
}
