import { AxiosInstance, AxiosResponse } from 'axios'
import axiosConfig from '../../../../config/axiosСonfig'
import { IMaintenance } from '../../../../ts/interfaces/IMaintenance'

export interface IMaintenanceFilter {
  from: string
  to: string | null
  page: number
  rows: number
}

export interface IMaintenanceAxios {
  getMaintenance: (filter?: IMaintenanceFilter) => Promise<AxiosResponse<IMaintenance>>
}

export default function (instance: AxiosInstance): IMaintenanceAxios {
  return {
    getMaintenance(
      filter: IMaintenanceFilter = {
        from: `2022-07-06T21:00:00.000Z`,
        to: `2022-10-03T21:00:00.000Z`,
        page: 1,
        rows: 5
      }
    ): Promise<AxiosResponse<IMaintenance>> {
      return instance.get(`${axiosConfig.baseUrl}maintenance`, { params: filter })
    }
  }
}
