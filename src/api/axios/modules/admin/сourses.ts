import { AxiosInstance, AxiosResponse } from 'axios'
import axiosConfig from '../../../../config/axiosСonfig'
import {IResponseArray} from '../../../../ts/interfaces/IResponseInterfaces';
import {ICourseRow} from '../../../../ts/interfaces/ICourses';

export interface ICoursesFilter {
  text: string | null
  organization: string | null
  page: number
  rows: number
}

export interface ICoursesAxios {
  getListOfCourses: (filter?: ICoursesFilter) => Promise<AxiosResponse<IResponseArray<ICourseRow>>>
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
    ): Promise<AxiosResponse<IResponseArray<ICourseRow>>> {
      return instance.get(`${axiosConfig.adminUrl}/courses`, { params: filter })
    }
  }
}
