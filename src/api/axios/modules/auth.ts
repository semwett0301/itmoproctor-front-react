import {AxiosInstance, AxiosResponse} from 'axios'
import {ILogin} from '../../../ts/interfaces/ILogin'
import {IUserApp} from '../../../ts/interfaces/IUserApp'
import axiosConfig from '../../../config/axiosСonfig'

export interface IAuthAxios {
  login: (data: ILogin) => Promise<AxiosResponse<IUserApp>>
  logout: (userId: string) => Promise<AxiosResponse>
}

export default function (instance: AxiosInstance): IAuthAxios {
  return {
    login(data): Promise<AxiosResponse<IUserApp>> {
      return instance.post(axiosConfig.authUrl, data)
    },
    logout(userId): Promise<AxiosResponse> {
      return instance.delete(`${axiosConfig.authUrl}/${userId}`)
    }
  }
}
