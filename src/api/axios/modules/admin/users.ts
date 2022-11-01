import { AxiosInstance, AxiosResponse } from 'axios'
import axiosConfig from '../../../../config/axiosСonfig'
import {IUsersRow} from '../../../../ts/interfaces/IUsers'
import {IResponseArray} from '../../../../ts/interfaces/IResponseInterfaces';

export interface IUserFilter {
  text: string | null
  organization: string | null
  role: string | null
  page: number
  rows: number
}

export interface IUsersAxios {
  getListOfUsers: (filter?: IUserFilter) => Promise<AxiosResponse<IResponseArray<IUsersRow>>>
}

export default function (instance: AxiosInstance): IUsersAxios {
  return {
    getListOfUsers(
      filter: IUserFilter = {
        text: null,
        organization: null,
        role: null,
        page: 1,
        rows: 10
      }
    ): Promise<AxiosResponse<IResponseArray<IUsersRow>>> {
      return instance.get(`${axiosConfig.adminUrl}/users`, { params: filter })
    }
  }
}
