import {IDeviceItem} from '../../../ts/interfaces/IDeviceItem';
import {useEffect, useState} from 'react';

export function useDevices(): {
  waitDevices: boolean,
  videoDevices: IDeviceItem[],
  inputAudioDevices: IDeviceItem[],
  screenDevices: IDeviceItem[]
} {
  const [videoDevices, updateVideoDevices] = useState<IDeviceItem[]>([])
  const [inputAudioDevices, updateInputAudioDevices] = useState<IDeviceItem[]>([])
  const [screenDevices, updateScreenDevices] = useState<IDeviceItem[]>([])
  const [waitDevices, setWaitDevices] = useState<boolean>(true)

  useEffect(() => {
    const checkDevices: () => Promise<void> = async () => {
      const castToItem: (devices: MediaDeviceInfo[]) => IDeviceItem[] = devices => {
        return devices.map((el, idx) => {
          return {
            id: idx.toString(),
            label: el.label,
            device: el
          }
        })
      }

      const currentDevices: MediaDeviceInfo[] = await navigator.mediaDevices.enumerateDevices()

      updateVideoDevices(castToItem(currentDevices.filter(e => e.kind === 'videoinput')))
      updateInputAudioDevices(castToItem(currentDevices.filter(e => e.kind === 'audioinput')))
    }

    checkDevices().then(() => {
      setWaitDevices(false)
    })
  }, [])

  return {
    waitDevices,
    videoDevices,
    inputAudioDevices,
    screenDevices
  }
}

