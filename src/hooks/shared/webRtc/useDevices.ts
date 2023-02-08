import {IDeviceItem} from '../../../ts/interfaces/IDeviceItem';
import {useCallback, useEffect, useState} from 'react';
import {IResolutionItem} from '../../../ts/interfaces/IResolutionItem';
import {useAppDispatch} from '../../store/useAppDispatch';
import {useAppSelector} from '../../store/useAppSelector';
import {
  setCameraInDeviceSettings, setFrequencyInDeviceSettings,
  setInputAudioInDeviceSettings, setResolutionInDeviceSettings
} from '../../../store/reducers/deviceSettings/deviceSettingsActionCreators';

export function useDevices(): {
  waitDevices: boolean,
  videoDevices: IDeviceItem[]
  inputAudioDevices: IDeviceItem[]
} {
  const [videoDevices, updateVideoDevices] = useState<IDeviceItem[]>([])
  const [inputAudioDevices, updateInputAudioDevices] = useState<IDeviceItem[]>([])
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
    inputAudioDevices
  }
}

