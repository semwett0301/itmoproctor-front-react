import { AxiosInstance, AxiosResponse } from 'axios'
import { IExams } from '../../../../ts/interfaces/IExams'

interface filterInterface {
  from: string
  to: string
  text: string
  status: string | null
  reset: boolean | null
  organizations: string | null
  myStudents: boolean
  async: boolean | null
  page: number
  rows: number
}

export interface IExamsAxios {
  getListOfExams: (filter?: filterInterface) => Promise<AxiosResponse<IExams>>
}

export default function (instance: AxiosInstance): IExamsAxios {
  return {
    getListOfExams(
      filter: filterInterface = {
        from: new Date().toISOString(),
        to: new Date().toISOString(),
        text: '',
        status: null,
        reset: null,
        organizations: null,
        myStudents: false,
        async: null,
        page: 1,
        rows: 50
      }
    ): Promise<AxiosResponse<IExams>> {
      return instance.get(`admin/exams`, { data: filter })
    }
  }
}