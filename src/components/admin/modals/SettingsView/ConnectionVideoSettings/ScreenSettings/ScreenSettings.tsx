import React, {FC, useState} from 'react'
import cl from '../ConnectionVideoSettings.module.scss'
import {Layout} from '@consta/uikit/Layout'
import CheckingConnection from '../../../../../shared/CheckingConnection/CheckingConnection'
import {Select} from '@consta/uikit/Select'
import {TextField} from '@consta/uikit/TextField'
import {Item} from '../../../../../../ts/types/Item'
import {useAppSelector} from '../../../../../../hooks/store/useAppSelector';
import {IResolutionItem} from '../../../../../../ts/interfaces/IResolutionItem';
import {useDeviceSettings} from '../../../../../../hooks/shared/webRtc/useDeviceSettings';
import {defaultResolution} from '../../../../../../store/reducers/deviceSettings/deviceSettingsReducer';
import {useDevices} from '../../../../../../hooks/shared/webRtc/useDevices';

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
  }
]

const ScreenSettings: FC = () => {
  const { screenDevices } = useDevices()

  const userId = useAppSelector(state => state.user._id)

  const {
    currentScreen,
    currentResolution,
    currentFrequency,
    updateCurrentScreen,
    updateFrequency,
    updateResolution
  } = useDeviceSettings('screen')

  return (
    <Layout className={cl.wrapper} direction={'column'}>
      <Layout flex={3} className={cl.video}>
        <CheckingConnection userId={userId} type={'screen'}/>
      </Layout>
      <Layout flex={2}>
        <Select
          size={'s'}
          label={'Номер экрана'}
          value={currentScreen}
          items={screenDevices}
          onChange={({value}) => updateCurrentScreen(value)}
        />
      </Layout>
      <Layout className={cl.resolution} flex={4.5}>
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
          type='number'
          step={'1'}
          min='5'
          max={'30'}
        />
      </Layout>
    </Layout>
  )
}

export default ScreenSettings
