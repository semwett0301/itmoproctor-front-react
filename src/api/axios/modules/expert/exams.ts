import { AxiosInstance, AxiosResponse } from 'axios'
import { IExam } from '../../../../ts/interfaces/IExam'
import axiosConfig from '../../../../config/axiosСonfig'
import { INote, IPostNote } from '../../../../ts/interfaces/INotes'
import exams from '../../../../components/admin/Exams/Exams'

export interface IExpertExamsAxios {
  getExam: (examId: string) => Promise<AxiosResponse<IExam>>
  getNotes: (examId: string) => Promise<AxiosResponse<Array<INote>>>
  addNote: (examId: string, note: IPostNote) => Promise<AxiosResponse<Array<INote>>>
  addAttach: (file: FormData) => Promise<AxiosResponse<unknown>>
}

export default function ExpertExams(instance: AxiosInstance): IExpertExamsAxios {
  return {
    getExam(examId) {
      return instance.get(`${axiosConfig.expertUrl}/exam/${examId}`)
    },
    getNotes(examId) {
      return instance.get(`${axiosConfig.baseUrl}notes/${examId}`)
    },
    addNote(examId, note) {
      return instance.post(`${axiosConfig.baseUrl}notes/${examId}`, note)
    },
    addAttach(file) {
      return instance.post(`${axiosConfig.baseUrl}storage`, file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  }
}
