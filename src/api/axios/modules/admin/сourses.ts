import { AxiosInstance, AxiosResponse } from 'axios'
import { ICourses } from '../../../../ts/interfaces/ICourses'
import axiosConfig from '../../../../config/axiosСonfig'

export interface ICoursesFilter {
  text: string | null
  organization: string | null
  page: number
  rows: number
}

export interface ICoursesAxios {
  getListOfCourses: (filter?: ICoursesFilter) => Promise<AxiosResponse<ICourses>>
}

export default function (instance: AxiosInstance): ICoursesAxios {
  return {
    getListOfCourses(
      filter: ICoursesFilter = {
        text: null,
        organization: null,
        page: 1,
        rows: 10
      }
    ): Promise<AxiosResponse<ICourses>> {
      return instance.get(`${axiosConfig.adminUrl}/courses`, { params: filter })
    }
  }
}
