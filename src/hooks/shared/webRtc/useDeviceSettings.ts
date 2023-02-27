import {IDeviceItem} from '../../../ts/interfaces/IDeviceItem';
import {IResolutionItem} from '../../../ts/interfaces/IResolutionItem';
import {useAppDispatch} from '../../store/useAppDispatch';
import {useAppSelector} from '../../store/useAppSelector';
import {useCallback, useEffect} from 'react';
import {
  setCameraInDeviceSettings,
  setFrequencyInDeviceSettings,
  setInputAudioInDeviceSettings, setMutedInDeviceSettings,
  setResolutionInDeviceSettings
} from '../../../store/reducers/deviceSettings/deviceSettingsActionCreators';
import {useDevices} from './useDevices';

export function useDeviceSettings(): {
  currentCamera: IDeviceItem | null
  currentInputAudio: IDeviceItem | null
  currentResolution: IResolutionItem
  currentFrequency: number
  currentMuted: boolean

  updateCurrentCamera: (inputAudio: IDeviceItem | null) => void
  updateCurrentInputAudio: (inputAudio: IDeviceItem | null) => void
  updateResolution: (resolution: IResolutionItem) => void
  updateFrequency: (frequency: number) => void
  updateMuted: (muted: boolean) => void
} {
  const dispatch = useAppDispatch()

  const currentCamera: IDeviceItem | null = useAppSelector(state => state.deviceSettings.video)
  const currentInputAudio: IDeviceItem | null = useAppSelector(state => state.deviceSettings.inputAudio)
  const currentResolution: IResolutionItem = useAppSelector(state => state.deviceSettings.resolution)
  const currentFrequency: number = useAppSelector(state => state.deviceSettings.frequency)
  const currentMuted: boolean = useAppSelector(state => state.deviceSettings.muted)

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

  const updateMuted = useCallback((muted: boolean) => {
    dispatch(setMutedInDeviceSettings(muted))
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
    currentMuted,
    updateCurrentCamera,
    updateResolution,
    updateCurrentInputAudio,
    updateFrequency,
    updateMuted
  }
}
