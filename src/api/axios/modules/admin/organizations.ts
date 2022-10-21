import { AxiosInstance, AxiosResponse } from 'axios'
import axiosConfig from '../../../../config/axiosСonfig'
import { IExams } from '../../../../ts/interfaces/IExams'
import { IOrganization } from '../../../../ts/interfaces/IOrganizations'

export interface IOrganizationsAxios {
  getListOfOrganizations: () => Promise<AxiosResponse<IOrganization[]>>
}

export default function (instance: AxiosInstance): IOrganizationsAxios {
  return {
    getListOfOrganizations(): Promise<AxiosResponse<IOrganization[]>> {
      return instance.get(`${axiosConfig.adminUrl}/organizations`)
    }
  }
}
