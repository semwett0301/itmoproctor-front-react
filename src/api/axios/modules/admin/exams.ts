import { AxiosInstance, AxiosResponse } from 'axios'
import { IExams } from '../../../../ts/interfaces/IExams'

export interface filterInterface {
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
  getListOfOrganizations: (filter?: filterInterface) => Promise<AxiosResponse<IExams>>
}

export default function (instance: AxiosInstance): IExamsAxios {
  return {
    getListOfOrganizations(
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
