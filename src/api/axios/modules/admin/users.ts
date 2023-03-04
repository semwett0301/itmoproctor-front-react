import {AxiosInstance, AxiosResponse} from 'axios'
import axiosConfig from '../../../../config/api/axiosСonfig'
import {IUsersRow} from '../../../../ts/interfaces/IUsers'
import {IResponseArray} from '../../../../ts/interfaces/IResponseInterfaces'
import {IUserApp} from '../../../../ts/interfaces/IUserApp'

export interface IUserFilter {
  text?: string | null
  organization?: string | null
  role?: string | null
  provider?: string | null
  page?: number
  rows?: number
}

export interface IUsersAxios {
  getListOfUsers: (filter?: IUserFilter) => Promise<AxiosResponse<IResponseArray<IUsersRow>>>
  getUser: (userId: string) => Promise<AxiosResponse<IUserApp>>
  deleteUser: (userId: string) => Promise<AxiosResponse<IUsersRow>>
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
      return instance.get(`${axiosConfig.adminUrl}/users`, { params: filter })
    },
    getUser(userId) {
      return instance.get(`${axiosConfig.baseUrl}user/${userId}`)
    },
    deleteUser(userId) {
      return instance.delete(`${axiosConfig.baseUrl}user/${userId}`)
    },

  }
}
