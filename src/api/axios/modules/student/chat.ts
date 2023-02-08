import { AxiosInstance, AxiosResponse } from 'axios'
import { IChatMessage, IPostChatMessage } from '../../../../ts/interfaces/IChat'
import axiosConfig from '../../../../config/api/axiosСonfig'

export interface IStudentChatAxios {
  getMessages: (examId: string) => Promise<AxiosResponse<IChatMessage[]>>
  postMessage: (examId: string, message: IPostChatMessage) => Promise<AxiosResponse<IChatMessage>>
}

export default function (instance: AxiosInstance): IStudentChatAxios {
  return {
    getMessages(examId) {
      return instance.get(`${axiosConfig.baseUrl}chat/${examId}`)
    },
    postMessage(examId, message) {
      return instance.post(`${axiosConfig.baseUrl}chat/${examId}`, message)
    }
  }
}
