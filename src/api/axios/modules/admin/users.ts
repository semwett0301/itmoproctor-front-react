import { AxiosInstance, AxiosResponse } from 'axios'
import axiosConfig from '../../../../config/axiosСonfig'
import { IUsers } from '../../../../ts/interfaces/IUsers'

export interface IUserFilter {
  text: string | null
  organization: string | null
  role: string | null
  page: number
  rows: number
}

export interface IUsersAxios {
  getListOfExams: (filter?: IUserFilter) => Promise<AxiosResponse<IUsers>>
}

export default function (instance: AxiosInstance): IUsersAxios {
  return {
    getListOfExams(
      filter: IUserFilter = {
        text: null,
        organization: null,
        role: null,
        page: 1,
        rows: 10
      }
    ): Promise<AxiosResponse<IUsers>> {
      return instance.get(`${axiosConfig.adminUrl}/users`, { params: filter })
    }
  }
}
