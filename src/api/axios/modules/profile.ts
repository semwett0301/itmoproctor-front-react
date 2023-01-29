import { AxiosInstance, AxiosResponse } from 'axios'
import { IUser } from '../../../ts/interfaces/IUser'
import axiosConfig from '../../../config/axiosСonfig'
import { IOrganization } from '../../../ts/interfaces/IOrganizations'

export interface IProfilePost {
  birthday: string
  email: string
  firstname: string
  middlename: string
  lastname: string
  username: string
  password: string | null
  citizenship: string | null
  documentIssueDate: string
  documentNumber: string
  documentType: string | null
  description: string
  active: boolean | string
  activityDate?: string
  address: string
  created?: string
  expert: string | null
  system?: boolean
  gender: string
  organization: string | IOrganization
  provider: string
  role: string
  _id?: string
  __v?: number
  attach?: unknown[]
}

export interface IProfileAxios {
  getProfileById: (userId: string) => Promise<AxiosResponse<IUser>>
  getProfileBySession: () => Promise<AxiosResponse<IUser>>
  updateProfile: (userId: string, data: IUser | IProfilePost) => Promise<AxiosResponse<IUser>>
  addProfile: (data: IProfilePost) => Promise<AxiosResponse<IUser>>
}

export default function (instance: AxiosInstance): IProfileAxios {
  return {
    getProfileById(userId: string): Promise<AxiosResponse<IUser>> {
      return instance.get(`${axiosConfig.authUrl}/${userId}`)
    },
    getProfileBySession(): Promise<AxiosResponse<IUser>> {
      return instance.get(`${axiosConfig.authUrl}`)
    },
    updateProfile(userId, data) {
      return instance.put(`${axiosConfig.baseUrl}user/${userId}`, data)
    },
    addProfile(data) {
      return instance.post(`${axiosConfig.baseUrl}user`, data)
    }
  }
}
