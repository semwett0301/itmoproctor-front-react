import { AxiosInstance, AxiosResponse } from 'axios'
import axiosConfig from '../../../../config/axiosСonfig'
import { IOrganizationsResponse } from '../../../../ts/interfaces/IOrganizations'

export interface IOrganizationsAxios {
  getListOfOrganizations: () => Promise<AxiosResponse<IOrganizationsResponse>>
}

export default function (instance: AxiosInstance): IOrganizationsAxios {
  return {
    getListOfOrganizations(): Promise<AxiosResponse<IOrganizationsResponse>> {
      return instance.get(`${axiosConfig.adminUrl}/organizations`)
    }
  }
}
