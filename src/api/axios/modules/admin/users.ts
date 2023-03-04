import {AxiosInstance, AxiosResponse} from 'axios'
import axiosConfig from '../../../../config/api/axiosСonfig'
import {IUsersRow} from '../../../../ts/interfaces/IUsers'
import {IResponseArray} from '../../../../ts/interfaces/IResponseInterfaces'
import {IUserApp} from '../../../../ts/interfaces/IUserApp'
import {IOrganization} from '../../../../ts/interfaces/IOrganizations';

export interface IUserFilter {
  text?: string | null
  organization?: string | null
  role?: string | null
  provider?: string | null
  page?: number
  rows?: number
}

type ImportUsersParams = {
  organization: IOrganization,
  fileData: string
}

type ImportResponse = {
  success: {
    actual: number
    expected: number
  },
}

export interface IUsersAxios {
  getListOfUsers: (filter?: IUserFilter) => Promise<AxiosResponse<IResponseArray<IUsersRow>>>
  getUser: (userId: string) => Promise<AxiosResponse<IUserApp>>
  deleteUser: (userId: string) => Promise<AxiosResponse<IUsersRow>>
  importUsers: (data: ImportUsersParams) => Promise<AxiosResponse<ImportResponse>>
}

export default function (instance: AxiosInstance): IUsersAxios {
  return {
    getListOfUsers(
      filter: IUserFilter = {
        text: null,
        organization: null,
        role: null,
        provider: null,
        page: 1,
        rows: 10
      }
    ) {
      return instance.get(`${axiosConfig.adminUrl}/users`, {params: filter})
    },
    getUser(userId) {
      return instance.get(`${axiosConfig.baseUrl}user/${userId}`)
    },
    deleteUser(userId) {
      return instance.delete(`${axiosConfig.baseUrl}user/${userId}`)
    },
    importUsers({
                  organization,
                  fileData
                }
    ) {
      return instance.post(`${axiosConfig.baseUrl}user/import`, {
        fileData: fileData,
        organization: organization._id
      })
    }
  }
}
