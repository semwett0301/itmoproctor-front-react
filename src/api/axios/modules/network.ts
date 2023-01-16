import {AxiosInstance, AxiosResponse} from 'axios';

export type IpInfo = {
  ip: string,
  country: string,
  city: string
}

export interface INetworkAxios {
  getIpInfo: () => Promise<AxiosResponse<IpInfo>>,
  checkPing: () => Promise<AxiosResponse<void>>
}

export default function (instance: AxiosInstance): INetworkAxios {
  return {
    getIpInfo(): Promise<AxiosResponse<IpInfo>> {
      return instance.get('tools/ip')
    },
    checkPing(): Promise<AxiosResponse<void>> {
      return instance.get('tools/ping')
    }
  }
}
