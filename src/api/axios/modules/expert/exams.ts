import { AxiosInstance, AxiosResponse } from 'axios'
import { IExam } from '../../../../ts/interfaces/IExam'
import axiosConfig from '../../../../config/axiosСonfig'
import { INote } from '../../../../ts/interfaces/INotes'

export interface IExpertExamsAxios {
  getExam: (examId: string) => Promise<AxiosResponse<IExam>>
  getNotes: (examId: string) => Promise<AxiosResponse<Array<INote>>>
}

export default function ExpertExams(instance: AxiosInstance): IExpertExamsAxios {
  return {
    getExam(examId) {
      return instance.get(`${axiosConfig.expertUrl}/exam/${examId}`)
    },
    getNotes(examId) {
      return instance.get(`${axiosConfig.baseUrl}notes/${examId}`)
    }
  }
}
