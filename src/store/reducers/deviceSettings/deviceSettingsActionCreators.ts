import {IDeviceItem} from '../../../ts/interfaces/IDeviceItem';
import {IAction} from '../../../ts/interfaces/IAction';
import {DeviceSettingsActionTypes} from './deviceSettingsActionTypes';
import {IResolutionItem} from '../../../ts/interfaces/IResolutionItem';

export function setVideoCameraInDeviceSettings(camera: IDeviceItem | null): IAction<DeviceSettingsActionTypes, IDeviceItem | null> {
  return {
    type: DeviceSettingsActionTypes.SET_VIDEO_CAMERA,
    payload: camera
  }
}

export function setVideoInputAudioInDeviceSettings(inputAudio: IDeviceItem | null): IAction<DeviceSettingsActionTypes, IDeviceItem | null> {
  return {
    type: DeviceSettingsActionTypes.SET_VIDEO_INPUT_AUDIO,
    payload: inputAudio
  }
}

export function setVideoResolutionInDeviceSettings(resolution: IResolutionItem): IAction<DeviceSettingsActionTypes, IResolutionItem> {
  return {
    type: DeviceSettingsActionTypes.SET_VIDEO_RESOLUTION,
    payload: resolution
  }
}

export function setVideoFrequencyInDeviceSettings(frequency: number): IAction<DeviceSettingsActionTypes, number> {
  return {
    type: DeviceSettingsActionTypes.SET_VIDEO_FREQUENCY,
    payload: frequency
  }
}

export function setVideoMutedInDeviceSettings(muted: boolean): IAction<DeviceSettingsActionTypes, boolean> {
  return {
    type: DeviceSettingsActionTypes.SET_VIDEO_MUTED,
    payload: muted
  }
}

export function setScreenNumberInDeviceSettings(screen: IDeviceItem | null): IAction<DeviceSettingsActionTypes, IDeviceItem | null> {
  return {
    type: DeviceSettingsActionTypes.SET_SCREEN_NUMBER,
    payload: screen
  }
}

export function setScreenResolutionInDeviceSettings(resolution: IResolutionItem): IAction<DeviceSettingsActionTypes, IResolutionItem> {
  return {
    type: DeviceSettingsActionTypes.SET_SCREEN_RESOLUTION,
    payload: resolution
  }
}

export function setScreenFrequencyInDeviceSettings(frequency: number): IAction<DeviceSettingsActionTypes, number> {
  return {
    type: DeviceSettingsActionTypes.SET_SCREEN_FREQUENCY,
    payload: frequency
  }
}

