import {IDeviceItem} from '../../../ts/interfaces/IDeviceItem';
import {IAction} from '../../../ts/interfaces/IAction';
import {DeviceSettingsActionTypes} from './deviceSettingsActionTypes';
import {IResolutionItem} from '../../../ts/interfaces/IResolutionItem';

type DeviceSettings = {
  video: IDeviceItem | null
  inputAudio: IDeviceItem | null,
  resolution: IResolutionItem
  frequency: number
}

export const defaultResolution = {
  label: '1280 x 720',
  id: '1',
  width: 1280,
  height: 720
}

export const defaultDeviceSettings = {
  video: null,
  inputAudio: null,
  resolution: defaultResolution,
  frequency: 15
}

export const deviceSettingsReducer = (state: DeviceSettings = defaultDeviceSettings, action: IAction<DeviceSettingsActionTypes, IDeviceItem | IResolutionItem | number>): DeviceSettings => {
  switch (action.type) {
    case DeviceSettingsActionTypes.SET_CAMERA:
      return {
        ...state,
        video: action.payload as IDeviceItem
      }
    case DeviceSettingsActionTypes.SET_INPUT_AUDIO:
      return {
        ...state,
        inputAudio: action.payload as IDeviceItem
      }
    case DeviceSettingsActionTypes.SET_RESOLUTION:
      return {
        ...state,
        resolution: action.payload as IResolutionItem
      }
    case DeviceSettingsActionTypes.SET_FREQUENCY:
      return {
        ...state,
        frequency: action.payload as number
      }
    default:
      return state
  }
}
