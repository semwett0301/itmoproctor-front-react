import {AxiosInstance, AxiosResponse} from 'axios'

export interface IDistMetadata {
  version: string,
  date: Date,
  md5: {
    [key: string]: string
  }
}

export interface IDistAxios {
  getInfo: () => Promise<AxiosResponse<IDistMetadata>>
}

export default function (instance: AxiosInstance): IDistAxios {
  return {
    getInfo(): Promise<AxiosResponse<IDistMetadata>> {
      return instance.get('/dist/metadata.json')
    }
  }
}
