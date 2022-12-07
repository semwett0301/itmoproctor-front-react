import { AxiosInstance, AxiosResponse } from 'axios'
import axiosConfig from '../../../../config/axiosСonfig'
import { IExamRow } from '../../../../ts/interfaces/IExams'
import { IResponseArray } from '../../../../ts/interfaces/IResponseInterfaces'
import dayjs from 'dayjs'
import { IExam } from '../../../../ts/interfaces/IExam'
import { IUser } from '../../../../ts/interfaces/IUser'

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

export interface IUserFilter {
  userId: string
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
  getUserExams: (filter: IUserFilter) => Promise<AxiosResponse<IResponseArray<IExamRow>>>
  getExam: (examId: string) => Promise<AxiosResponse<IExam>>
  getProfile: (proctorId: string) => Promise<AxiosResponse<IUser>>
}

export default function (instance: AxiosInstance): IExamsAxios {
  return {
    getListOfExams(
      filter = {
        from: dayjs().startOf('D').toISOString(),
        to: dayjs().endOf('D').toISOString(),
        text: null,
        status: null,
        reset: null,
        organization: null,
        myStudents: false,
        async: null,
        page: 1,
        rows: 10
      }
    ) {
      return instance.get(`${axiosConfig.adminUrl}/exams`, { params: filter })
    },
    getUserExams(filter) {
      console.log(filter)
      return instance.get(`${axiosConfig.adminUrl}/exams`, { params: filter })
    },
    getExam(examId) {
      return instance.get(`${axiosConfig.studentUrl}/info/${examId}`)
    },
    getProfile(profileId) {
      return instance.get(`${axiosConfig.baseUrl}profile/${profileId}`)
    }
  }
}
