import {AxiosInstance, AxiosResponse} from 'axios'
import axiosConfig from '../../../../config/api/axiosСonfig'
import {ISchedulePostResponse, IScheduleRow} from '../../../../ts/interfaces/IShedule'
import {IResponseArray} from '../../../../ts/interfaces/IResponseInterfaces'

export interface IScheduleFilter {
  from: string
  to: string
  text: string | null
  page: number
  rows: number
}

export interface ISchedulePost {
  beginDate: string
  endDate: string
  concurrent: string
  inspector: string
  maxExamsBeginnings: string
}

export interface IScheduleAxios {
  getSchedules: (filter?: IScheduleFilter) => Promise<AxiosResponse<IResponseArray<IScheduleRow>>>
  getSchedule: (scheduleId: string) => Promise<AxiosResponse<ISchedulePostResponse>>
  addSchedule: (schedule: ISchedulePost) => Promise<AxiosResponse<ISchedulePostResponse>>
  editSchedule: (
    schedule: ISchedulePost,
    scheduleId: string
  ) => Promise<AxiosResponse<ISchedulePostResponse>>
  deleteSchedule: (scheduleId: string) => Promise<AxiosResponse<ISchedulePostResponse>>
}

export default function (instance: AxiosInstance): IScheduleAxios {
  return {
    getSchedules(
      filter: IScheduleFilter = {
        from: `2022-07-06T21:00:00.000Z`,
        to: `2022-10-03T21:00:00.000Z`,
        text: null,
        page: 1,
        rows: 5
      }
    ): Promise<AxiosResponse<IResponseArray<IScheduleRow>>> {
      return instance.get(`${axiosConfig.adminUrl}/schedules`, { params: filter })
    },
    getSchedule(scheduleId) {
      return instance.get(`${axiosConfig.baseUrl}schedule/${scheduleId}`)
    },
    addSchedule(schedule) {
      return instance.post(`${axiosConfig.baseUrl}schedule`, schedule)
    },
    editSchedule(schedule, scheduleId: string) {
      return instance.put(`${axiosConfig.baseUrl}schedule/${scheduleId}`, schedule)
    },
    deleteSchedule(scheduleId: string) {
      return instance.delete(`${axiosConfig.baseUrl}schedule/${scheduleId}`)
    }
  }
}
