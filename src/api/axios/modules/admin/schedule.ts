import { AxiosInstance, AxiosResponse } from 'axios'
import axiosConfig from '../../../../config/axiosСonfig'
import {IScheduleRow} from '../../../../ts/interfaces/IShedule'
import {IResponseArray} from '../../../../ts/interfaces/IResponseInterfaces';

export interface IScheduleFilter {
  from: string
  to: string
  text: string | null
  page: number
  rows: number
}

export interface IScheduleAxios {
  getSchedule: (filter?: IScheduleFilter) => Promise<AxiosResponse<IResponseArray<IScheduleRow>>>
}

export default function (instance: AxiosInstance): IScheduleAxios {
  return {
    getSchedule(
      filter: IScheduleFilter = {
        from: `2022-07-06T21:00:00.000Z`,
        to: `2022-10-03T21:00:00.000Z`,
        text: null,
        page: 1,
        rows: 5
      }
    ): Promise<AxiosResponse<IResponseArray<IScheduleRow>>> {
      return instance.get(`${axiosConfig.adminUrl}/schedules`, { params: filter })
    }
  }
}
