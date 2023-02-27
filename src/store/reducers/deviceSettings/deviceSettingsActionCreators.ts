import {IDeviceItem} from '../../../ts/interfaces/IDeviceItem';
import {IAction} from '../../../ts/interfaces/IAction';
import {DeviceSettingsActionTypes} from './deviceSettingsActionTypes';
import {IResolutionItem} from '../../../ts/interfaces/IResolutionItem';

export function setCameraInDeviceSettings(camera: IDeviceItem | null): IAction<DeviceSettingsActionTypes, IDeviceItem | null> {
  return {
    type: DeviceSettingsActionTypes.SET_CAMERA,
    payload: camera
  }
}

export function setInputAudioInDeviceSettings(inputAudio: IDeviceItem | null): IAction<DeviceSettingsActionTypes, IDeviceItem | null> {
  return {
    type: DeviceSettingsActionTypes.SET_INPUT_AUDIO,
    payload: inputAudio
  }
}

export function setResolutionInDeviceSettings(resolution: IResolutionItem): IAction<DeviceSettingsActionTypes, IResolutionItem> {
  return {
    type: DeviceSettingsActionTypes.SET_RESOLUTION,
    payload: resolution
  }
}

export function setFrequencyInDeviceSettings(frequency: number): IAction<DeviceSettingsActionTypes, number> {
  return {
    type: DeviceSettingsActionTypes.SET_FREQUENCY,
    payload: frequency
  }
}

export function setMutedInDeviceSettings(muted: boolean): IAction<DeviceSettingsActionTypes, boolean> {
  return {
    type: DeviceSettingsActionTypes.SET_MUTED,
    payload: muted
  }
}

