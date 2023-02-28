import {IDeviceItem} from '../../../ts/interfaces/IDeviceItem';
import {IAction} from '../../../ts/interfaces/IAction';
import {DeviceSettingsActionTypes} from './deviceSettingsActionTypes';
import {IResolutionItem} from '../../../ts/interfaces/IResolutionItem';

type DeviceSettings = {
  videoSettings: {
    video: IDeviceItem | null
    inputAudio: IDeviceItem | null,
    resolution: IResolutionItem
    frequency: number
    muted: boolean
  },
  screenSettings: {
    screen: IDeviceItem | null
    resolution: IResolutionItem
    frequency: number
  }
}

export const defaultResolution = {
  label: '1280 x 720',
  id: '1',
  width: 1280,
  height: 720
}

export const defaultDeviceSettings: DeviceSettings = {
  videoSettings: {
    video: null,
    inputAudio: null,
    resolution: defaultResolution,
    frequency: 15,
    muted: false
  },
  screenSettings: {
    screen: null,
    resolution: defaultResolution,
    frequency: 15
  }
}

export const deviceSettingsReducer = (state: DeviceSettings = defaultDeviceSettings, action: IAction<DeviceSettingsActionTypes, IDeviceItem | IResolutionItem | number | boolean>): DeviceSettings => {
  switch (action.type) {
    case DeviceSettingsActionTypes.SET_VIDEO_CAMERA:
      return {
        ...state,
        videoSettings: {
          ...state.videoSettings,
          video: action.payload as IDeviceItem
        }
      }
    case DeviceSettingsActionTypes.SET_VIDEO_INPUT_AUDIO:
      return {
        ...state,
        videoSettings: {
          ...state.videoSettings,
          inputAudio: action.payload as IDeviceItem
        }
      }
    case DeviceSettingsActionTypes.SET_VIDEO_RESOLUTION:
      return {
        ...state,
        videoSettings: {
          ...state.videoSettings,
          resolution: action.payload as IResolutionItem
        }
      }
    case DeviceSettingsActionTypes.SET_VIDEO_FREQUENCY:
      return {
        ...state,
        videoSettings: {
          ...state.videoSettings,
          frequency: action.payload as number
        }
      }
    case DeviceSettingsActionTypes.SET_VIDEO_MUTED:
      return {
        ...state,
        videoSettings: {
          ...state.videoSettings,
          muted: action.payload as boolean
        }
      }
    case DeviceSettingsActionTypes.SET_SCREEN_NUMBER:
      return {
        ...state,
        screenSettings: {
          ...state.screenSettings,
          screen: action.payload as IDeviceItem
        }
      }
    case DeviceSettingsActionTypes.SET_SCREEN_RESOLUTION:
      return {
        ...state,
        screenSettings: {
          ...state.screenSettings,
          resolution: action.payload as IResolutionItem
        }
      }
    case DeviceSettingsActionTypes.SET_SCREEN_FREQUENCY:
      return {
        ...state,
        screenSettings: {
          ...state.screenSettings,
          frequency: action.payload as number
        }
      }
    default:
      return state
  }
}
