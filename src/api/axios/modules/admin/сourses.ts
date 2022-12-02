import { AxiosInstance, AxiosResponse } from 'axios'
import axiosConfig from '../../../../config/axiosСonfig'
import { IResponseArray } from '../../../../ts/interfaces/IResponseInterfaces'
import { ICourseRow } from '../../../../ts/interfaces/ICourses'
import { VerificationType } from '../../../../ts/types/Verifications'
import { IGetCourse } from '../../../../ts/interfaces/ICourse'

export interface ICoursesFilter {
  text: string | null
  organization: string | null
  page: number
  rows: number
}

export interface ICoursePost {
  accessAllowed: string[] | null
  courseCode: string
  organization: string
  sessionCode: string
  verifications: VerificationType[] | null
}

export interface ICoursesAxios {
  getListOfCourses: (filter?: ICoursesFilter) => Promise<AxiosResponse<IResponseArray<ICourseRow>>>
  getCourse: (courseId: string) => Promise<AxiosResponse<IGetCourse>>
  addCourse: (course: ICoursePost) => Promise<AxiosResponse<ICourseRow>>
  editCourse: (course: ICoursePost, courseId: string) => Promise<AxiosResponse<ICourseRow>>
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
    ) {
      return instance.get(`${axiosConfig.adminUrl}/courses`, { params: filter })
    },
    getCourse(courseId) {
      return instance.get(`${axiosConfig.baseUrl}course/${courseId}`)
    },
    addCourse(course) {
      return instance.post(`${axiosConfig.baseUrl}course`, course)
    },
    editCourse(course, courseId) {
      return instance.put(`${axiosConfig.baseUrl}course/${courseId}`, course)
    }
  }
}
