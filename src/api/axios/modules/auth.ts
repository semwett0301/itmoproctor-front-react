import { AxiosInstance, AxiosResponse } from 'axios'
import { ILogin } from '../../../ts/interfaces/ILogin'
import { IUser } from '../../../ts/interfaces/IUser'

export interface IAuthAxios {
  login: (data: ILogin) => Promise<AxiosResponse<IUser>>
  logout: (userId: string) => Promise<AxiosResponse>
}

export default function (instance: AxiosInstance): IAuthAxios {
  return {
    login(data): Promise<AxiosResponse<IUser>> {
      return instance.post('/profile', data)
    },
    logout(userId): Promise<AxiosResponse> {
      return instance.delete(`/profile/${userId}`)
    }
  }
}
