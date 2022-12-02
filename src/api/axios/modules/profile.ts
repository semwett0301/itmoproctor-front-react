import { AxiosInstance, AxiosResponse } from 'axios'
import { IUser } from '../../../ts/interfaces/IUser'
import axiosConfig from '../../../config/axiosСonfig'

export interface IProfileAxios {
  getProfileById: (userId: string) => Promise<AxiosResponse<IUser>>
  getProfileBySession: () => Promise<AxiosResponse<IUser>>
  updateProfile: (userId: string, data: IUser) => Promise<AxiosResponse>
}

export default function (instance: AxiosInstance): IProfileAxios {
  return {
    getProfileById(userId: string): Promise<AxiosResponse<IUser>> {
      return instance.get(`${axiosConfig.authUrl}/${userId}`)
    },

    getProfileBySession(): Promise<AxiosResponse<IUser>> {
      return instance.get(`${axiosConfig.authUrl}`)
    },
    updateProfile(userId: string, data: IUser): Promise<AxiosResponse> {
      return instance.put(`${axiosConfig.authUrl}/${userId}`, data)
    }
  }
}
