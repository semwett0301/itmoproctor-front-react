import {AxiosInstance, AxiosResponse} from 'axios'
import {IVersion} from '../../../ts/interfaces/IVersion';

export interface IDistMetadata {
  versions: IVersion[]
}

export interface IDistAxios {
  getInfo: () => Promise<AxiosResponse<IDistMetadata>>
}

export default function (instance: AxiosInstance): IDistAxios {
  return {
    getInfo(): Promise<AxiosResponse<IDistMetadata>> {
      return instance.get('/dist/metadata')
    }
  }
}
