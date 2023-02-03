import { AxiosInstance, AxiosResponse } from 'axios'
import { IUserApp } from '../../../ts/interfaces/IUserApp'
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
  getProfileById: (userId: string) => Promise<AxiosResponse<IUserApp>>
  getProfileBySession: () => Promise<AxiosResponse<IUserApp>>
  updateProfile: (userId: string, data: IUserApp | IProfilePost) => Promise<AxiosResponse<IUserApp>>
  addProfile: (data: IProfilePost) => Promise<AxiosResponse<IUserApp>>
}

export default function (instance: AxiosInstance): IProfileAxios {
  return {
    getProfileById(userId: string): Promise<AxiosResponse<IUserApp>> {
      return instance.get(`${axiosConfig.authUrl}/${userId}`)
    },
    getProfileBySession(): Promise<AxiosResponse<IUserApp>> {
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
