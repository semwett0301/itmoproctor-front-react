import React, { FC, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import ModalSidebar, {
  ModalSidebarButton
} from '../../../shared/ModalView/ModalSidebar/ModalSidebar'
import { IconVideo } from '@consta/icons/IconVideo'
import { IconScreenFilled } from '@consta/icons/IconScreenFilled'
import { IconWorldFilled } from '@consta/icons/IconWorldFilled'
import { IconInfo } from '@consta/icons/IconInfo'
import VideoSettings from './ConnectionVideoSettings/VideoSettings/VideoSettings'

import cl from './SettingsView.module.scss'
import { Layout } from '@consta/uikit/Layout'
import ScreenSettings from './ConnectionVideoSettings/ScreenSettings/ScreenSettings'
import SystemSettings from './SystemSettings/SystemSettings'
import NetworkSettings from './NetworkSettings/NetworkSettings'
import { classJoiner } from '../../../../utils/styleClassesUtills'

interface SettingsConfigElement extends ModalSidebarButton {
  component?: JSX.Element
}

type SettingsConfig = {
  [key: string]: SettingsConfigElement
}

const SettingsView: FC = () => {
  const [chosenButton, setChosenButton] = useState<string>('video')

  const settingsConfig: SettingsConfig = useMemo<SettingsConfig>(() => {
    return {
      video: {
        title: 'Веб-камера',
        logo: <IconVideo size={'s'} view={chosenButton === 'video' ? 'brand' : 'secondary'} />,
        component: <VideoSettings />
      },
      screen: {
        title: 'Экран',
        logo: (
          <IconScreenFilled size={'s'} view={chosenButton === 'screen' ? 'brand' : 'secondary'} />
        ),
        component: <ScreenSettings />
      },
      network: {
        title: 'Сеть',
        logo: (
          <IconWorldFilled size={'s'} view={chosenButton === 'network' ? 'brand' : 'secondary'} />
        ),
        component: <NetworkSettings />
      },
      system: {
        title: 'Система',
        logo: <IconInfo size={'s'} view={chosenButton === 'system' ? 'brand' : 'secondary'} />,
        component: <SystemSettings />
      }
    }
  }, [chosenButton])

  return (
    <Layout className={cl.wrapper} direction={'column'}>
      <Layout>
        <div className={cl.header}>
          <ModalTitle title={'settings'} />
        </div>
      </Layout>
      <Layout className={cl.sidebarWrapper}>
        <Layout flex={1} className={cl.sidebar}>
          <ModalSidebar
            config={settingsConfig}
            chosenButton={chosenButton}
            setChosenButton={setChosenButton}
          />
        </Layout>
        <Layout flex={3}>
          <div className={cl.content}>
            <div>{settingsConfig[chosenButton]?.component}</div>
          </div>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default SettingsView
