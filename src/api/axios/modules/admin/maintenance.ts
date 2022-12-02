import { AxiosInstance, AxiosResponse } from 'axios'
import axiosConfig from '../../../../config/axiosСonfig'
import { IMaintenance, IMaintenancePost } from '../../../../ts/interfaces/IMaintenance'
import { IResponseArray } from '../../../../ts/interfaces/IResponseInterfaces'

export interface IMaintenanceFilter {
  from: string
  to: string | null
  page: number
  rows: number
}

export interface IMaintenanceAxios {
  getMaintenances: (
    filter?: IMaintenanceFilter
  ) => Promise<AxiosResponse<IResponseArray<IMaintenance>>>
  getMaintenance: (maintenanceId: string) => Promise<AxiosResponse<IMaintenance>>
  addMaintenance: (maintenance: IMaintenancePost) => Promise<AxiosResponse<IMaintenance>>
  editMaintenance: (
    maintenance: IMaintenancePost,
    maintenanceId: string
  ) => Promise<AxiosResponse<IMaintenance>>
  deleteMaintenance: (maintenanceId: string) => Promise<AxiosResponse<IMaintenance>>
}

export default function (instance: AxiosInstance): IMaintenanceAxios {
  return {
    getMaintenances(
      filter: IMaintenanceFilter = {
        from: `2022-07-06T21:00:00.000Z`,
        to: `2022-10-03T21:00:00.000Z`,
        page: 1,
        rows: 5
      }
    ) {
      return instance.get(`${axiosConfig.baseUrl}maintenance`, { params: filter })
    },
    getMaintenance(maintenanceId) {
      return instance.get(`${axiosConfig.baseUrl}maintenance/${maintenanceId}`)
    },
    addMaintenance(maintenance) {
      return instance.post(`${axiosConfig.baseUrl}maintenance`, maintenance)
    },
    editMaintenance(maintenance, maintenanceId) {
      return instance.put(`${axiosConfig.baseUrl}maintenance/${maintenanceId}`, maintenance)
    },
    deleteMaintenance(maintenanceId) {
      return instance.delete(`${axiosConfig.baseUrl}maintenance/${maintenanceId}`)
    }
  }
}
