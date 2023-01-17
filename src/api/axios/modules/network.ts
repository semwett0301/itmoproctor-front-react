import { AxiosInstance, AxiosResponse } from 'axios'

export type IpInfo = {
  ip: string
  country: string
  city: string
}

export interface INetworkAxios {
  getIpInfo: () => Promise<AxiosResponse<IpInfo>>
  checkPing: () => Promise<AxiosResponse<void>>
  getRX: (onUploadProgress?: (event: ProgressEvent) => void) => Promise<AxiosResponse<void>>
  getTX: (
    data: string,
    onUploadProgress?: (event: ProgressEvent) => void
  ) => Promise<AxiosResponse<void>>
}

export default function (instance: AxiosInstance): INetworkAxios {
  return {
    getIpInfo(): Promise<AxiosResponse<IpInfo>> {
      return instance.get('tools/ip')
    },
    checkPing(): Promise<AxiosResponse<void>> {
      return instance.get('tools/ping', { headers: { 'Cache-Control': 'no-cache' } })
    },
    getRX(onUploadProgress): Promise<AxiosResponse<void>> {
      return instance.post(
        'tools/rx',
        {},
        {
          onUploadProgress: onUploadProgress,
          headers: { 'Cache-Control': 'no-cache' }
        }
      )
    },
    getTX(data, onUploadProgress): Promise<AxiosResponse<void>> {
      return instance.post('tools/tx', data, {
        onUploadProgress: onUploadProgress,
        headers: {
          'Content-Type': 'application/octet-stream',
          'Cache-Control': 'no-cache'
        }
      })
    }
  }
}
