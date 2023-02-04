import {useCallback, useEffect, useState} from 'react';
import {IDeviceItem} from '../ts/interfaces/IDeviceItem';
import {IResolutionItem} from '../ts/interfaces/IResolutionItem';
import {useAppDispatch, useAppSelector} from './reduxHooks';
import {
  setCameraInDeviceSettings, setFrequencyInDeviceSettings,
  setInputAudioInDeviceSettings, setResolutionInDeviceSettings
} from '../store/reducers/deviceSettings/deviceSettingsActionCreators';

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

export function useDeviceSettings(): {
  currentCamera: IDeviceItem | null
  currentInputAudio: IDeviceItem | null
  currentResolution: IResolutionItem
  currentFrequency: number

  updateCurrentCamera: (inputAudio: IDeviceItem | null) => void
  updateCurrentInputAudio: (inputAudio: IDeviceItem | null) => void
  updateResolution: (resolution: IResolutionItem) => void
  updateFrequency: (frequency: number) => void
} {
  const dispatch = useAppDispatch()

  const currentCamera: IDeviceItem | null = useAppSelector(state => state.deviceSettings.video)
  const currentInputAudio: IDeviceItem | null = useAppSelector(state => state.deviceSettings.inputAudio)
  const currentResolution: IResolutionItem = useAppSelector(state => state.deviceSettings.resolution)
  const currentFrequency: number = useAppSelector(state => state.deviceSettings.frequency)

  const updateCurrentCamera = useCallback((camera: IDeviceItem | null) => {
    dispatch(setCameraInDeviceSettings(camera))
  }, [])

  const updateCurrentInputAudio = useCallback((inputAudio: IDeviceItem | null) => {
    dispatch(setInputAudioInDeviceSettings(inputAudio))
  }, [])

  const updateResolution = useCallback((resolution: IResolutionItem) => {
    dispatch(setResolutionInDeviceSettings(resolution))
  }, [])

  const updateFrequency = useCallback((frequency: number) => {
    dispatch(setFrequencyInDeviceSettings(frequency))
  }, [])

  const {waitDevices, videoDevices, inputAudioDevices} = useDevices()

  useEffect(() => {
    if (!waitDevices) {
      if (currentCamera == null && videoDevices.length) {
        updateCurrentCamera(videoDevices[0])
      }

      if (currentInputAudio == null && inputAudioDevices.length) {
        updateCurrentInputAudio(inputAudioDevices[0])
      }
    }
  }, [waitDevices, currentCamera, currentInputAudio])

  return {
    currentCamera,
    currentInputAudio,
    currentResolution,
    currentFrequency,
    updateCurrentCamera,
    updateResolution,
    updateCurrentInputAudio,
    updateFrequency
  }
}
