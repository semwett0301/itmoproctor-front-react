import {IDeviceItem} from '../../../ts/interfaces/IDeviceItem';
import {IResolutionItem} from '../../../ts/interfaces/IResolutionItem';
import {useAppDispatch} from '../../store/useAppDispatch';
import {useAppSelector} from '../../store/useAppSelector';
import {useCallback, useEffect} from 'react';
import {
  setScreenFrequencyInDeviceSettings, setScreenNumberInDeviceSettings, setScreenResolutionInDeviceSettings,
  setVideoCameraInDeviceSettings,
  setVideoFrequencyInDeviceSettings,
  setVideoInputAudioInDeviceSettings, setVideoMutedInDeviceSettings,
  setVideoResolutionInDeviceSettings
} from '../../../store/reducers/deviceSettings/deviceSettingsActionCreators';
import {useDevices} from './useDevices';

type VideoSettingsReturn = {
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
}

type ScreenSettingsReturn = {
  currentScreen: IDeviceItem | null
  currentResolution: IResolutionItem
  currentFrequency: number

  updateCurrentScreen: (inputAudio: IDeviceItem | null) => void
  updateResolution: (resolution: IResolutionItem) => void
  updateFrequency: (frequency: number) => void
}

export type DeviceMode = 'webcam' | 'screen'

export function useDeviceSettings(type: 'screen'): ScreenSettingsReturn;
export function useDeviceSettings(type: 'webcam'): VideoSettingsReturn
export function useDeviceSettings(type: DeviceMode): ScreenSettingsReturn | VideoSettingsReturn {
  const dispatch = useAppDispatch()

  const currentCamera: IDeviceItem | null = useAppSelector(state => state.deviceSettings.videoSettings.video)
  const currentInputAudio: IDeviceItem | null = useAppSelector(state => state.deviceSettings.videoSettings.inputAudio)
  const currentVideoResolution: IResolutionItem = useAppSelector(state => state.deviceSettings.videoSettings.resolution)
  const currentVideoFrequency: number = useAppSelector(state => state.deviceSettings.videoSettings.frequency)
  const currentMuted: boolean = useAppSelector(state => state.deviceSettings.videoSettings.muted)

  const currentScreen: IDeviceItem | null = useAppSelector(state => state.deviceSettings.screenSettings.screen)
  const currentScreenResolution: IResolutionItem = useAppSelector(state => state.deviceSettings.screenSettings.resolution)
  const currentScreenFrequency: number = useAppSelector(state => state.deviceSettings.screenSettings.frequency)

  const updateCurrentCamera = useCallback((camera: IDeviceItem | null) => {
    dispatch(setVideoCameraInDeviceSettings(camera))
  }, [dispatch])

  const updateCurrentInputAudio = useCallback((inputAudio: IDeviceItem | null) => {
    dispatch(setVideoInputAudioInDeviceSettings(inputAudio))
  }, [dispatch])

  const updateVideoResolution = useCallback((resolution: IResolutionItem) => {
    dispatch(setVideoResolutionInDeviceSettings(resolution))
  }, [dispatch])

  const updateVideoFrequency = useCallback((frequency: number) => {
    dispatch(setVideoFrequencyInDeviceSettings(frequency))
  }, [dispatch])

  const updateMuted = useCallback((muted: boolean) => {
    dispatch(setVideoMutedInDeviceSettings(muted))
  }, [dispatch])

  const updateCurrentScreen = useCallback((camera: IDeviceItem | null) => {
    dispatch(setScreenNumberInDeviceSettings(camera))
  }, [dispatch])

  const updateScreenResolution = useCallback((resolution: IResolutionItem) => {
    dispatch(setScreenResolutionInDeviceSettings(resolution))
  }, [dispatch])

  const updateScreenFrequency = useCallback((frequency: number) => {
    dispatch(setScreenFrequencyInDeviceSettings(frequency))
  }, [dispatch])

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

  if (type === 'webcam') {
    return {
      currentCamera,
      currentInputAudio,
      currentResolution: currentVideoResolution,
      currentFrequency: currentVideoFrequency,
      currentMuted,
      updateCurrentCamera,
      updateResolution: updateVideoResolution,
      updateCurrentInputAudio,
      updateFrequency: updateVideoFrequency,
      updateMuted
    }
  } else {
    return {
      currentScreen,
      currentResolution: currentScreenResolution,
      currentFrequency: currentScreenFrequency,
      updateCurrentScreen,
      updateResolution: updateScreenResolution,
      updateFrequency: updateScreenFrequency
    }
  }
}
