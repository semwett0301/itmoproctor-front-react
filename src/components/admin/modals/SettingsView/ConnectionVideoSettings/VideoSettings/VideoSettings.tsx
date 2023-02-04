import {Layout} from '@consta/uikit/Layout'
import React, {FC} from 'react'
import {Select} from '@consta/uikit/Select'
import {TextField} from '@consta/uikit/TextField'
import cl from '../ConnectionVideoSettings.module.scss'
import CheckingConnection from '../../CheckingConnection/CheckingConnection'
import {useDevices, useDeviceSettings} from '../../../../../../hooks/webRtcHooks';
import {IResolutionItem} from '../../../../../../ts/interfaces/IResolutionItem'
import {defaultResolution} from '../../../../../../store/reducers/deviceSettings/deviceSettingsReducer';

const resolutions: IResolutionItem[] = [
  {
    label: '1280 x 720',
    id: '1',
    width: 1280,
    height: 720
  },
  {
    label: '960 x 720',
    id: '2',
    width: 960,
    height: 720
  },
  {
    label: '854 x 480',
    id: '3',
    width: 854,
    height: 480
  }
]

const VideoSettings: FC = () => {
  const {videoDevices, inputAudioDevices, waitDevices} = useDevices()

  const {
    currentCamera,
    currentInputAudio,
    currentResolution,
    currentFrequency,
    updateResolution,
    updateCurrentCamera,
    updateFrequency,
    updateCurrentInputAudio
  } = useDeviceSettings()

  return (
    <Layout className={cl.wrapper} direction={'column'}>
      <Layout flex={6} className={cl.video}>
        <CheckingConnection/>
      </Layout>
      <Layout flex={1}>
        <Select
          size={'s'}
          label={'Камера'}
          items={videoDevices}
          value={currentCamera}
          isLoading={waitDevices}
          onChange={({value}) => updateCurrentCamera(value)}
        />
      </Layout>
      <Layout flex={1}>
        <Select
          size={'s'}
          label={'Микрофон'}
          items={inputAudioDevices}
          value={currentInputAudio}
          isLoading={waitDevices}
          onChange={({value}) => updateCurrentInputAudio(value)}
        />
      </Layout>
      <Layout className={cl.resolution} flex={1}>
        <Select
          size={'s'}
          label={'Разрешение'}
          items={resolutions}
          value={currentResolution}
          onChange={({value}) => updateResolution(value ?? defaultResolution)}
        />
        <TextField
          size={'s'}
          label={'Частота кадров'}
          value={currentFrequency.toString()}
          onChange={({value}) => {
            if (Number(value) && Number(value) >= 5 && Number(value) <= 30) updateFrequency(Number(value))
          }}
          type="number"
          step={'1'}
          min={'5'}
          max={'30'}
        />
      </Layout>
    </Layout>
  )
}

export default VideoSettings
