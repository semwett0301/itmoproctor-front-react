import { AxiosInstance, AxiosResponse } from 'axios'
import { IExam } from '../../../../ts/interfaces/IExam'
import axiosConfig from '../../../../config/api/axiosСonfig'
import { INote, IPostNote } from '../../../../ts/interfaces/INotes'

interface IAttachResponse {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

export interface IExpertExamsAxios {
  getExam: (examId: string) => Promise<AxiosResponse<IExam>>
  getNotes: (examId: string) => Promise<AxiosResponse<Array<INote>>>
  addNote: (examId: string, note: IPostNote) => Promise<AxiosResponse<Array<INote>>>
  addAttach: (file: FormData) => Promise<AxiosResponse<IAttachResponse>>
  startCheck: (exam: IExam) => Promise<AxiosResponse<IExam>>
  stopCheck: (exam: IExam) => Promise<AxiosResponse<IExam>>
  setResolution: (
    exam: IExam,
    resolution: boolean,
    comment: string,
    note: string | null,
    reset: boolean
  ) => Promise<AxiosResponse<IExam>>
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
    },
    startCheck(exam) {
      return instance.put(`${axiosConfig.expertUrl}/exam/${exam._id}`, {
        ...exam,
        task: 'startChecking'
      })
    },
    stopCheck(exam) {
      return instance.put(`${axiosConfig.expertUrl}/exam/${exam._id}`, {
        ...exam,
        task: 'cancelChecking'
      })
    },
    setResolution(exam: IExam, resolution, comment, note, reset) {
      return instance.put(`${axiosConfig.expertUrl}/exam/${exam._id}`, {
        _id: exam._id,
        task: 'setResolution',
        resolution: resolution,
        comment: comment,
        note: note,
        reset: reset // или false - попытка сброшена или нет
      })
    }
  }
}
