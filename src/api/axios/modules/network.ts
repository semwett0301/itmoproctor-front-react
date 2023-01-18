import { AxiosInstance, AxiosResponse } from 'axios'

export type IpInfo = {
  ip: string
  country: string
  city: string
}

export interface INetworkAxios {
  getIpInfo: (controller?: AbortController) => Promise<AxiosResponse<IpInfo>>
  checkPing: (controller?: AbortController) => Promise<AxiosResponse<void>>
  getRX: (
    onUploadProgress?: (event: ProgressEvent) => void,
    controller?: AbortController
  ) => Promise<AxiosResponse<void>>
  getTX: (
    data: string,
    onUploadProgress?: (event: ProgressEvent) => void,
    controller?: AbortController
  ) => Promise<AxiosResponse<void>>
}

export default function (instance: AxiosInstance): INetworkAxios {
  return {
    getIpInfo(controller): Promise<AxiosResponse<IpInfo>> {
      return instance.get('tools/ip', { signal: controller?.signal })
    },
    checkPing(controller): Promise<AxiosResponse<void>> {
      return instance.get('tools/ping', {
        headers: { 'Cache-Control': 'no-cache' },
        signal: controller?.signal
      })
    },
    getRX(onUploadProgress, controller): Promise<AxiosResponse<void>> {
      return instance.post(
        'tools/rx',
        {},
        {
          onDownloadProgress: onUploadProgress,
          headers: { 'Cache-Control': 'no-cache' },
          signal: controller?.signal
        }
      )
    },
    getTX(data, onUploadProgress, controller): Promise<AxiosResponse<void>> {
      return instance.post('tools/tx', data, {
        onUploadProgress: onUploadProgress,
        headers: {
          'Content-Type': 'application/octet-stream',
          'Cache-Control': 'no-cache'
        },
        signal: controller?.signal
      })
    }
  }
}
