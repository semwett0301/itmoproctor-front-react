import { AxiosInstance, AxiosResponse } from 'axios'
import axiosConfig from '../../../../config/axiosСonfig'
import {IExamRow} from '../../../../ts/interfaces/IExams'
import {IResponseArray} from '../../../../ts/interfaces/IResponseInterfaces';

export interface filterInterface {
  from: string
  to: string
  text: string | null
  status: string | null
  reset: boolean | null
  organization: string | null
  myStudents: boolean
  async: boolean | null
  page: number
  rows: number
}

export interface IExamsAxios {
  getListOfExams: (filter?: filterInterface) => Promise<AxiosResponse<IResponseArray<IExamRow>>>
}

export default function (instance: AxiosInstance): IExamsAxios {
  return {
    getListOfExams(
      filter: filterInterface = {
        from: `2022-07-06T21:00:00.000Z`,
        to: `2022-10-03T21:00:00.000Z`,
        text: null,
        status: null,
        reset: null,
        organization: null,
        myStudents: false,
        async: null,
        page: 1,
        rows: 10
      }
    ): Promise<AxiosResponse<IResponseArray<IExamRow>>> {
      return instance.get(`${axiosConfig.adminUrl}/exams`, { params: filter })
    }
  }
}
