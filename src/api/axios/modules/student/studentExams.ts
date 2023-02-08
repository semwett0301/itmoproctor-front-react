import {AxiosInstance, AxiosResponse} from 'axios'
import {IResponseArray} from '../../../../ts/interfaces/IResponseInterfaces'
import {IExamRow} from '../../../../ts/interfaces/IExams'
import axiosConfig from '../../../../config/api/axiosСonfig'
import {IExam} from '../../../../ts/interfaces/IExam'

export interface IStudentExamsAxios {
  getExams: () => Promise<AxiosResponse<IResponseArray<IExamRow>>>
  getExamWithHistory: () => Promise<AxiosResponse<IResponseArray<IExamRow>>>
  getExamInfo: (examId: string) => Promise<AxiosResponse<IExam>>
}

export default function (instance: AxiosInstance): IStudentExamsAxios {
  return {
    getExams() {
      return instance.get(`${axiosConfig.studentUrl}/exams`)
    },
    getExamWithHistory() {
      return instance.get(`${axiosConfig.studentUrl}/exams`, { params: { history: true } })
    },
    getExamInfo(examId) {
      return instance.get(`${axiosConfig.studentUrl}/info/${examId}`)
    }
  }
}
